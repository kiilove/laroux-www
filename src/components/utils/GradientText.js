import React from "react";

const GradientText = ({ text }) => {
  const gradientStyle = {
    background: `
      linear-gradient(
        90deg,
        #f58529 0%,
        #dd2a7b 25%,
        #8134af 50%,
        #515bd4 75%,
        #f58529 100%
      )
    `,
    backgroundSize: "200% 200%",
    animation: "gradientShift 5s infinite",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: "6rem", // 원하는 글자 크기로 조정
    fontWeight: "bold",
    textAlign: "center",
    margin: "20px 0",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
  };

  return <h1 style={gradientStyle}>{text}</h1>;
};

export default GradientText;
