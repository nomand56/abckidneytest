import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoUrl }) => {
  const [played, setPlayed] = useState(0);

  const handleProgress = (progress) => {
    setPlayed(progress.played);
  };

  return (
    <ReactPlayer
      url={videoUrl}
      controls
      width="100%"
      height="100%"
      className="rounded-md"
      onProgress={handleProgress}
    />
  );
};

export default VideoPlayer;
