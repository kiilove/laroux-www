import { message } from "antd";

export const copyToClipboard = (text) => {
  if (!navigator.clipboard) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed"; // Prevent scrolling to bottom
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      message.success("클립보드에 복사되었습니다!");
    } catch (err) {
      message.error("클립보드 복사를 실패했습니다.");
    } finally {
      document.body.removeChild(textArea);
    }
  } else {
    // Modern API
    navigator.clipboard
      .writeText(text)
      .then(() => message.success("클립보드에 복사되었습니다!"))
      .catch(() => message.error("클립보드 복사를 실패했습니다."));
  }
};
