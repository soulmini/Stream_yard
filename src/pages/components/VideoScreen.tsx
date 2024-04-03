import React, { useEffect, useRef } from 'react';

const VideoScreen = () => {
  const displayVideoRef = useRef<HTMLVideoElement>(null);

  const startScreenSharing = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      displayVideoRef.current!.srcObject = screenStream;
    } catch (error) {
      console.error('Error accessing screen:', error);
    }
  };

  return (
    <div className='bg-black rounded-xl mx-auto w-90 h-90 flex flex-col justify-center items-center border border-white'>
      <h1 className='text-white mb-1'>Screen</h1>
      <div className='text-white flex flex-col justify-center items-center mb-1'>
        <video ref={displayVideoRef} muted autoPlay></video>
        <button className="bg-white text-black border border-white rounded px-5 py-2 mt-2" onClick={startScreenSharing}>
          Start Screen Sharing
        </button>
      </div>
    </div>

    
  );
};

export default VideoScreen;
