// Menubar.jsx
import React from "react";
import { Button, Upload, Select, Tooltip, ColorPicker } from "antd";
import {
  PictureOutlined,
  BoldOutlined,
  ItalicOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  BgColorsOutlined,
  FontColorsOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
} from "@ant-design/icons";

// 사용 가능한 폰트 목록
const FONTS = [
  { label: "기본", value: "Nanum Gothic" },
  { label: "Do Hyeon", value: "Do Hyeon" },
  { label: "Parisienne", value: "Parisienne" },
];

const HEADING_OPTIONS = [
  { label: "본문", value: "paragraph" },
  { label: "제목 1", value: "h1" },
  { label: "제목 2", value: "h2" },
  { label: "제목 3", value: "h3" },
];

// 각 폰트의 스타일 미리보기를 위한 컴포넌트
const FontOption = ({ value, label }) => (
  <div style={{ fontFamily: value }}>{label}</div>
);

const StyleButton = ({ type, icon, tooltip, editor }) => {
  if (!editor) return null;

  const isActive = editor.isActive(type);

  const handleToggle = () => {
    if (!editor) return;

    switch (type) {
      case "bold":
        editor.chain().focus().toggleBold().run();
        break;
      case "italic":
        editor.chain().focus().toggleItalic().run();
        break;
      case "bulletList":
        editor.chain().focus().toggleBulletList().run();
        break;
      case "orderedList":
        editor.chain().focus().toggleOrderedList().run();
        break;
      case "alignLeft":
        editor.chain().focus().setTextAlign("left").run();
        break;
      case "alignCenter":
        editor.chain().focus().setTextAlign("center").run();
        break;
      case "alignRight":
        editor.chain().focus().setTextAlign("right").run();
        break;
      default:
        break;
    }
  };

  return (
    <Tooltip title={tooltip} placement="bottom">
      <Button
        type={isActive ? "primary" : "default"}
        onClick={handleToggle}
        onMouseDown={(e) => e.preventDefault()}
        icon={icon}
        className={`flex items-center justify-center w-8 h-8 ${
          isActive ? "bg-blue-500 text-white" : "bg-white text-gray-700"
        } hover:bg-blue-100 transition-colors`}
      />
    </Tooltip>
  );
};

const Menubar = ({ editor, isPreview, setIsPreview }) => {
  if (!editor) return null;

  const handleFontChange = (value) => {
    editor.chain().focus().setFontFamily(value).run();
  };

  const handleHeadingChange = (value) => {
    if (value === "paragraph") {
      editor.chain().focus().setParagraph().run();
    } else {
      editor
        .chain()
        .focus()
        .toggleHeading({ level: parseInt(value.replace("h", "")) })
        .run();
    }
  };

  const handleTextColor = (color) => {
    editor.chain().focus().setColor(color.toHexString()).run();
  };

  const handleBgColor = (color) => {
    editor.chain().focus().setHighlight({ color: color.toHexString() }).run();
  };

  const handleImageUpload = async (files) => {
    if (!files || !editor) return false;

    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length > 1) {
      try {
        const imageUrls = await Promise.all(
          imageFiles.map(
            (file) =>
              new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target?.result);
                reader.readAsDataURL(file);
              })
          )
        );
        editor.commands.setImageGrid({ images: imageUrls });
      } catch (error) {
        console.error("Error processing images:", error);
      }
    } else if (imageFiles.length === 1) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          editor.commands.setImage({ src: result });
        }
      };
      reader.readAsDataURL(imageFiles[0]);
    }

    return false;
  };

  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1 md:gap-2 p-2 border rounded-lg bg-white shadow-sm mb-4">
      <Select
        defaultValue="paragraph"
        style={{ width: 120 }}
        onChange={handleHeadingChange}
        options={HEADING_OPTIONS}
        className="mr-2"
      />

      <Select
        defaultValue="Nanum Gothic"
        style={{ width: 150 }}
        onChange={handleFontChange}
        className="mr-2"
        options={FONTS.map((font) => ({
          label: <FontOption value={font.value} label={font.label} />,
          value: font.value,
        }))}
      />

      <div className="h-4 w-px bg-gray-200 mx-2" />

      <StyleButton
        type="bold"
        icon={<BoldOutlined />}
        tooltip="굵게"
        editor={editor}
      />
      <StyleButton
        type="italic"
        icon={<ItalicOutlined />}
        tooltip="기울임"
        editor={editor}
      />

      <div className="h-4 w-px bg-gray-200 mx-2" />

      <StyleButton
        type="alignLeft"
        icon={<AlignLeftOutlined />}
        tooltip="왼쪽 정렬"
        editor={editor}
      />
      <StyleButton
        type="alignCenter"
        icon={<AlignCenterOutlined />}
        tooltip="가운데 정렬"
        editor={editor}
      />
      <StyleButton
        type="alignRight"
        icon={<AlignRightOutlined />}
        tooltip="오른쪽 정렬"
        editor={editor}
      />

      <div className="h-4 w-px bg-gray-200 mx-2" />

      <StyleButton
        type="bulletList"
        icon={<UnorderedListOutlined />}
        tooltip="글머리 기호"
        editor={editor}
      />
      <StyleButton
        type="orderedList"
        icon={<OrderedListOutlined />}
        tooltip="번호 매기기"
        editor={editor}
      />

      <div className="h-4 w-px bg-gray-200 mx-2" />

      <Tooltip title="글자 색상">
        <ColorPicker onChange={handleTextColor} trigger="hover">
          <Button
            icon={<FontColorsOutlined />}
            className="flex items-center justify-center w-8 h-8"
          />
        </ColorPicker>
      </Tooltip>

      <Tooltip title="배경 색상">
        <ColorPicker onChange={handleBgColor} trigger="hover">
          <Button
            icon={<BgColorsOutlined />}
            className="flex items-center justify-center w-8 h-8"
          />
        </ColorPicker>
      </Tooltip>

      <div className="h-4 w-px bg-gray-200 mx-2" />

      <Upload
        accept="image/*"
        multiple={true}
        showUploadList={false}
        fileList={[]}
        customRequest={({ file, onSuccess }) => {
          setTimeout(() => {
            onSuccess("ok");
          }, 0);
        }}
        onChange={(info) => {
          if (info.fileList.length > 0) {
            handleImageUpload(info.fileList.map((f) => f.originFileObj));
            info.fileList = [];
          }
        }}
      >
        <Tooltip title="이미지 업로드 (여러장 선택 가능)">
          <Button
            icon={<PictureOutlined />}
            className="flex items-center justify-center w-8 h-8"
          />
        </Tooltip>
      </Upload>

      <Button
        onClick={() => setIsPreview(!isPreview)}
        className="ml-auto h-8 bg-white hover:bg-blue-100"
      >
        {isPreview ? "편집" : "미리보기"}
      </Button>
    </div>
  );
};

export default Menubar;
