export const insertMedia = (editor, url, type) => {
  if (!editor) return;

  if (type === "image") {
    editor.chain().focus().setImage({ src: url }).run();
  } else if (type === "video") {
    const videoHTML = `<video src="${url}" controls class="w-full rounded"></video>`;
    editor.chain().focus().insertContent(videoHTML).run();
  }
};
