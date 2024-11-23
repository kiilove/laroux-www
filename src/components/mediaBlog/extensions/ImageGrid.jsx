import React from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";

const ImageGrid = ({ node }) => {
  const images = node.attrs.images || [];

  const gridClass =
    images.length <= 2
      ? "grid-cols-2"
      : images.length <= 3
      ? "grid-cols-3"
      : "grid-cols-2 md:grid-cols-4";

  return (
    <NodeViewWrapper className="image-grid">
      <div className={`relative w-full my-4 grid ${gridClass} gap-2`}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative group ${
              images.length === 3 && index === 2
                ? "col-span-3 md:col-span-1"
                : ""
            } overflow-hidden rounded-lg shadow-sm`}
          >
            <img
              src={image}
              alt={`grid-${index}`}
              className="w-full h-full object-cover aspect-square"
            />
          </div>
        ))}
      </div>
      <NodeViewContent className="hidden" />
    </NodeViewWrapper>
  );
};

export default ImageGrid;
