import { useState, useEffect, useMemo } from "react";
import laroux01 from "../assets/videos/laroux_01.mp4";
import laroux02 from "../assets/videos/laroux_02.mp4";
import laroux03 from "../assets/videos/laroux_03.mp4";
import laroux04 from "../assets/videos/laroux_04.mp4";

const BackgroundVideo = () => {
  // useMemo를 사용하여 videos 배열이 리렌더링마다 재생성되는 것을 방지
  const videos = useMemo(() => [laroux01, laroux02, laroux03, laroux04], []);

  const [currentVideo, setCurrentVideo] = useState(() => {
    const randomIndex = Math.floor(Math.random() * videos.length);
    return videos[randomIndex];
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = videos.indexOf(currentVideo);
      let newIndex;

      // 현재 재생 중인 비디오와 다른 비디오 선택
      do {
        newIndex = Math.floor(Math.random() * videos.length);
      } while (newIndex === currentIndex);

      setCurrentVideo(videos[newIndex]);
    }, 5000);

    return () => clearInterval(interval);
  }, [videos, currentVideo]); // dependency 추가

  return (
    <div className="absolute top-0 left-0 w-full h-screen overflow-hidden z-0">
      <video
        key={currentVideo} // key 추가하여 비디오 변경 시 강제로 리렌더링
        autoPlay
        loop
        muted
        playsInline
        className="object-cover w-full h-full"
      >
        <source src={currentVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
};

export default BackgroundVideo;
