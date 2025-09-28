import React from 'react';

const VideoPlayer = ({ videoUrl, title }) => {
  return (
    <div className="ratio ratio-16x9">
      <iframe 
        src={videoUrl} 
        title={title}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;