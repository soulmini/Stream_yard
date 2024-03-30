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

        // const binayStream = {}
        // console.log(ev.data);
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
    <div>
      <h1>Dashboard</h1>
      <div>
        <video ref={userVideoRef} autoPlay muted />
        <button onClick={handleStartButtonClick}>Start</button>
      </div>
    </div>
  );
};

export default Dashboard;
