import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ImageGrid from "./ImageGrid";

const ImageGridExtension = Node.create({
  name: "imageGrid",
  group: "block",
  draggable: true,
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
      .map((src, index) => `<img src="${src}" alt="grid-${index}" />`)
      .join("");

    return [
      "div",
      { "data-type": "image-grid", class: "image-grid" },
      ["div", { class: "image-grid-container" }, imageElements],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageGrid);
  },

  addCommands() {
    return {
      setImageGrid:
        (newImages) =>
        ({ chain }) => {
          return chain()
            .insertContent({
              type: this.name,
              attrs: { images: newImages },
            })
            .run();
        },
    };
  },
});

export default ImageGridExtension;
