// Client side - React component
import React, { useState, useEffect, useRef } from 'react';

const Dashboard = () => {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const userVideoRef = useRef<HTMLVideoElement>(null);
  const ws = useRef<WebSocket | null>(null);

  const handleStartButtonClick = () => {
    if (mediaStream && ws.current && ws.current.readyState === WebSocket.OPEN) {
      const mediaRecorder = new MediaRecorder(mediaStream, {
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 2500000,
        framerate: 25
      });

      mediaRecorder.ondataavailable = ev => {
        ws.current?.send(ev.data);
      };

      mediaRecorder.start(25);
    }
  };

  useEffect(() => {
    const initializeWebSocket = () => {
      ws.current = new WebSocket('ws://localhost:3000');
      // console.log(ws.current);

      ws.current.onopen = () => {
        console.log('Connected to WebSocket server');
      };

      ws.current.onclose = () => {
        console.log('Disconnected from WebSocket server');
      };

      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    };

    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true
        });
        setMediaStream(stream);
        userVideoRef.current!.srcObject = stream;
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    initializeWebSocket();
    getUserMedia();

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => {
          track.stop();
        });
      }
    };
  }, []);

  return (
    <div className='bg-black rounded-xl mx-auto w-90 h-90 flex flex-col justify-center items-center border border-white'>
      <h1 className='text-white mb-1'>WebCam</h1>
      <div className='text-white flex flex-col justify-center items-center mb-1'>
        <video ref={userVideoRef} autoPlay muted />
        <button className="bg-white text-black border border-white rounded px-5 py-2 mt-2" onClick={handleStartButtonClick}>
          Start
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
