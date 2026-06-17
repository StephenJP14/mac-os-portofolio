'use client';

import { useEffect, useState } from 'react';
import { Terminal, Gamepad2, User, Maximize2 } from 'lucide-react';
import { useDesktopStore } from '@/app/store/useDesktopStore';

import PreviewApp from '@/app/components/PreviewApp';
import SystemWindow from '@/app/components/SystemWindow';
import TerminalApp from '@/app/components/TerminalApp';
import Dock from '@/app/components/Dock';
import MobileHome from '@/app/components/MobileHome';
// 1. IMPORT THE NEW GAME COMPONENT
import DinoGame from '@/app/components/SpaceInvaders'; 

export default function Desktop() {
  const { windows, openWindow } = useDesktopStore();
  const [time, setTime] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false); 

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); 
    window.addEventListener('resize', handleResize);

    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#0a0a0a] text-white selection:bg-[#7ee787] selection:text-black font-mono">
      {!isMobile && (
        <div className="hidden portrait:flex fixed inset-0 z-[9999] bg-[#0a0a0a] text-white flex-col items-center justify-center text-center p-6">
          <Maximize2 className="w-12 h-12 mb-6 text-[#8b949e] animate-pulse rotate-90" />
          <h2 className="text-2xl font-bold mb-3">Please rotate your device</h2>
          <p className="text-[#8b949e] max-w-sm">
            Stephen's OS is optimized for a landscape desktop experience on tablets.
          </p>
        </div>
      )}

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#30363d_1px,transparent_1px),linear-gradient(to_bottom,#30363d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] opacity-30 pointer-events-none"></div>

      {isMobile ? (
        <MobileHome />
      ) : (
        <>
          <div className="absolute top-8 left-8 flex flex-col gap-6 z-10">

            <button
              onClick={() => openWindow('main-terminal', 'terminal', 'stephen@macbook-air: ~')}
              className="group flex flex-col items-center gap-2 w-24 rounded-lg p-2 hover:bg-white/5 transition-all focus:bg-white/10 outline-none"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-b from-[#2d333b] to-[#22272e] shadow-lg border border-[#444c56] group-hover:border-[#7ee787] transition-colors">
                <Terminal className="h-7 w-7 text-[#7ee787]" />
              </div>
              <span className="text-xs text-[#c9d1d9] drop-shadow-md bg-black/40 px-2 py-1 rounded">Terminal</span>
            </button>

            {/* 2. UPDATE DESKTOP ICON TO OPEN THE GAME */}
            <button 
              onClick={() => openWindow('space-invaders', 'space-invaders', 'Space Invaders')}
              className="group flex flex-col items-center gap-2 w-24 rounded-lg p-2 hover:bg-white/5 transition-all focus:bg-white/10 outline-none"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-b from-[#2d333b] to-[#22272e] shadow-lg border border-[#444c56] group-hover:border-[#ff7b72] transition-colors">
                <Gamepad2 className="h-7 w-7 text-[#ff7b72]" />
              </div>
              <span className="text-xs text-[#c9d1d9] drop-shadow-md bg-black/40 px-2 py-1 rounded">Space Invaders</span>
            </button>
          </div>

          <Dock />

          <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#161b22]/90 backdrop-blur-sm border-t border-[#30363d] flex items-center justify-between px-4 z-50 text-xs text-[#8b949e]">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 font-bold text-[#c9d1d9]">
                <User className="h-3 w-3" />
                <span>Stephen's OS</span>
              </div>
              <span className="hidden sm:inline opacity-60">v1.0.0</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="hidden sm:inline">Jakarta, ID</span>
              <span className="font-medium text-[#c9d1d9]">{time}</span>
            </div>
          </div>
        </>
      )}

      {/* 3. ADD THE DINOSAUR COMPONENT TO THE WINDOW MANAGER */}
      {windows.map((window) => {
        if (window.component === 'terminal') {
          return <SystemWindow key={window.id} id={window.id} title={window.title}><TerminalApp /></SystemWindow>;
        }
        if (window.component === 'preview') {
          return <SystemWindow key={window.id} id={window.id} title={window.title}><PreviewApp fileUrl="/CV_Stephen_Jonathan_Pratama_Apple_DEV.pdf" /></SystemWindow>;
        }
        if (window.component === 'about') {
          return <SystemWindow key={window.id} id={window.id} title={window.title}><TerminalApp initialTab="about" isStandalone={true} /></SystemWindow>;
        }
        if (window.component === 'projects') {
          return <SystemWindow key={window.id} id={window.id} title={window.title}><TerminalApp initialTab="projects" isStandalone={true} /></SystemWindow>;
        }
        if (window.component === 'space-invaders') {
          return <SystemWindow key={window.id} id={window.id} title={window.title}><DinoGame /></SystemWindow>;
        }
        return null;
      })}
    </main>
  );
}