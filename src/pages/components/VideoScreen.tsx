import React from 'react';
//import Webcam from 'react-webcam';

const VideoScreen = () => {
  const webcamRef = React.useRef(null);

  return (
    <div className="flex justify-center">
     <video  id="user-video" muted></video>
      <button id="start-btn">Start</button>
    </div>
  );
};

export default VideoScreen;
