import React, { useState } from "react";
import {
  useEditor,
  EditorContent,
  ReactNodeViewRenderer,
  Node,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { Button, Modal, Progress } from "antd";
import Menubar from "./Menubar";
import ImageGrid from "./extensions/ImageGrid";
import { useStorageUpload } from "../../hooks/useStorage/index";

// 단일 이미지 확장
const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
    };
  },
});

// 이미지 그리드 확장
const ImageGridExtension = Node.create({
  name: "imageGrid",
  group: "block",
  draggable: true,
  selectable: true,
  atom: true,

  addAttributes() {
    return {
      images: {
        default: [],
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="image-grid"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { images } = HTMLAttributes;
    const imageElements = images
      ? images.map((src, index) => ["img", { src, alt: `grid-${index}` }])
      : [];

    return [
      "div",
      { "data-type": "image-grid", class: "image-grid" },
      ["div", { class: "image-grid-container" }, ...imageElements],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageGrid);
  },

  addCommands() {
    return {
      setImageGrid:
        (attributes) =>
        ({ chain }) => {
          return chain()
            .insertContent({
              type: this.name,
              attrs: attributes,
            })
            .run();
        },
    };
  },
});

const BlogEditor = () => {
  const [title, setTitle] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { uploadFile } = useStorageUpload();

  const controller = new AbortController();
  const signal = controller.signal;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      TextStyle,
      CustomImage,
      ImageGridExtension,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "<p>여기에 내용을 입력하세요...</p>",
    editorProps: {
      attributes: {
        className:
          "prose prose-sm sm:prose lg:prose-lg max-w-none outline-none min-h-[300px] focus:outline-none p-4",
      },
    },
  });

  const handleSave = async () => {
    if (!editor) return;

    const content = editor.getHTML();
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const imgTags = Array.from(doc.querySelectorAll("img"));

    setIsUploading(true);
    let completedUploads = 0;

    for (const img of imgTags) {
      const src = img.getAttribute("src");

      if (/^data:image\/[a-z]+;base64,/.test(src)) {
        try {
          const blob = await fetch(src).then((res) => res.blob());
          const path = `blog/images/${Date.now()}-${Math.random()
            .toString(36)
            .substring(2)}`;

          const { url } = await uploadFile(path, blob, {
            onProgress: (progress) => {
              const totalProgress = Math.round(
                ((completedUploads + progress / 100) / imgTags.length) * 100
              );
              setUploadProgress(totalProgress);
            },
            signal,
          });

          img.setAttribute("src", url);
          completedUploads++;
        } catch (error) {
          if (error.name === "AbortError") {
            console.log("업로드 중단됨");
          } else {
            console.error("이미지 업로드 실패:", error);
          }
        }
      }
    }

    setIsUploading(false);
    setUploadProgress(0);

    const updatedContent = doc.body.innerHTML;

    console.log({
      title,
      content: updatedContent,
    });
  };

  const handleAbortUpload = () => {
    controller.abort();
    setIsUploading(false);
    setUploadProgress(0);
  };

  const renderPreview = () => {
    if (!editor) return "";

    const html = editor.getHTML();
    const processedHtml = html.replace(
      /<div data-type="image-grid"[^>]*>(.*?)<\/div>/g,
      (match) => {
        try {
          const urls =
            match
              .match(/src="([^"]+)"/g)
              ?.map((src) => src.replace('src="', "").replace('"', "")) || [];
          const gridClass =
            urls.length <= 2
              ? "grid-cols-2"
              : urls.length <= 3
              ? "grid-cols-3"
              : "grid-cols-2 md:grid-cols-4";

          return `
            <div class="relative w-full my-4 grid ${gridClass} gap-2">
              ${urls
                .map(
                  (url, index) =>
                    `<div class="relative group ${
                      urls.length === 3 && index === 2
                        ? "col-span-3 md:col-span-1"
                        : ""
                    } overflow-hidden rounded-lg shadow-sm">
                      <img 
                        src="${url}" 
                        alt="preview-${index}"
                        class="w-full h-full object-cover aspect-square"
                      />
                    </div>`
                )
                .join("")}
            </div>
          `;
        } catch (error) {
          console.error("Error processing image grid:", error);
          return match;
        }
      }
    );

    return processedHtml;
  };

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{ maxHeight: "100vh", overflow: "hidden" }}
    >
      <div
        className="max-w-4xl mx-auto p-3 md:p-6 bg-white shadow-sm"
        style={{
          maxHeight: "95vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          className="w-full mb-4 p-2 text-xl md:text-2xl font-bold border-b focus:outline-none bg-white"
        />
        <Menubar
          editor={editor}
          isPreview={isPreview}
          setIsPreview={setIsPreview}
        />

        <div
          className="border rounded-lg bg-white flex-grow overflow-y-auto h-full"
          style={{
            padding: "10px",
            minHeight: "calc(100vh - 2rem)",
            maxHeight: "calc(100vh - 1rem)",
            overflow: "hidden",
          }}
        >
          {isPreview ? (
            <div
              className="prose prose-sm sm:prose lg:prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: renderPreview() }}
            />
          ) : (
            <EditorContent editor={editor} />
          )}
        </div>

        <div className="flex justify-end mt-4">
          <Button
            type="primary"
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 h-9"
          >
            저장하기
          </Button>
        </div>
      </div>

      <Modal
        open={isUploading}
        footer={null}
        closable={false}
        centered
        title="이미지 업로드 중"
      >
        <p>이미지를 업로드하고 있습니다. 완료될 때까지 기다려주세요.</p>
        <Progress percent={uploadProgress} status="active" />
        <div className="flex justify-end mt-4">
          <Button onClick={handleAbortUpload} danger>
            강제 닫기
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default BlogEditor;
