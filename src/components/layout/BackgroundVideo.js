import React from "react";

const BackgroundVideo = ({ videoSrc }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-screen overflow-hidden z-0">
      <video
        key={videoSrc} // 비디오 소스 변경 시 강제로 리렌더링
        autoPlay
        loop
        muted
        playsInline
        className="object-cover w-full h-full transition-opacity duration-1000"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
};

export default BackgroundVideo;
