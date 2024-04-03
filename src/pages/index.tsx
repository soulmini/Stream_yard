import Image from "next/image";
import { Inter } from "next/font/google";
import VideoScreen from './components/VideoScreen'
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const handleLogin = () => {
    window.location.href = '/login';
  };

  const handleSignup = () => {
    console.log('hello');
    window.location.href = '/signup';
  };

  return (
    <div>
    <div className="h-[47rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
          SteamYard Clone
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          StreamYard is a professional live streaming and recording studio in your browser. Record your content, or stream live to Facebook, YouTube, and other platforms. Get started - it's free! Tap for sound. I've been blown away by StreamYard's incredible software & technology.
        </p>
      </div>
      <div className="flex justify-center space-x-4 mt-4">
            <button onClick={handleLogin} className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
            <button onClick={handleSignup} className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Signup</button>
      </div>
    </div>

    <VideoScreen/>
      
    </div>
  );
}
