'use client';

import React, { useState, useEffect } from 'react';
import { Terminal, Gamepad2, FileText, Mail, GitCompareArrows, User, FolderOpen } from 'lucide-react';
import { useDesktopStore } from '@/app/store/useDesktopStore';

export default function MobileHome() {
    const { openWindow } = useDesktopStore();
    const [time, setTime] = useState<Date | null>(null);

    // Prevent hydration mismatch on the clock
    useEffect(() => {
        setTime(new Date());
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const mobileApps = [
        // These first 4 will automatically become your Dock at the bottom
        { id: 'terminal', name: 'Terminal', icon: <Terminal className="w-8 h-8 text-[#7ee787]" strokeWidth={1.5} />, action: () => openWindow('main-terminal', 'terminal', 'stephen@Stephens-MacBook-Air: ~'), bg: 'bg-[#1e2227]' },
        { id: 'about', name: 'About', icon: <User className="w-8 h-8 text-white" strokeWidth={1.5} />, action: () => openWindow('about-window', 'about', 'About Stephen'), bg: 'bg-[#8957e5]' },
        { id: 'projects', name: 'Projects', icon: <FolderOpen className="w-8 h-8 text-white" strokeWidth={1.5} />, action: () => openWindow('projects-window', 'projects', 'My Projects'), bg: 'bg-[#e3b341]' },
        { id: 'cv', name: 'Resume', icon: <FileText className="w-8 h-8 text-white" strokeWidth={1.5} />, action: () => openWindow('cv-preview', 'preview', 'CV_Stephen_Jonathan_Pratama.pdf'), bg: 'bg-[#0366d6]' },

        // These will just sit on the home screen grid
        { id: 'mail', name: 'Mail', icon: <Mail className="w-8 h-8 text-white" strokeWidth={1.5} />, action: () => window.location.href = 'mailto:stephen.j.pratama@gmail.com', bg: 'bg-[#1f6feb]' },
        { id: 'github', name: 'GitHub', icon: <GitCompareArrows className="w-8 h-8 text-white" strokeWidth={1.5} />, action: () => window.open('https://github.com/yourusername', '_blank'), bg: 'bg-[#21262d]' },
        { id: 'space-invaders', name: 'Space Invaders', icon: <Gamepad2 className="w-8 h-8 text-white" strokeWidth={1.5} />, action: () => openWindow('space-invaders', 'space-invaders', 'Space Invaders'), bg: 'bg-[#d73a49]' },
    ];


    // The bottom 4 icons typical of an Android dock
    const dockApps = mobileApps.slice(0, 4);

    return (
        <div className="absolute inset-0 flex flex-col pt-12 pb-6 px-6">
            {/* Android Large Clock Area */}
            <div className="mt-8 mb-12 px-2 h-24">
                {time && (
                    <>
                        <div className="text-7xl font-light tracking-tighter text-white/90">
                            {time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div className="text-lg text-white/70 mt-2 font-sans">
                            {time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </div>
                    </>
                )}
            </div>

            {/* Android App Grid */}
            <div className="grid grid-cols-4 gap-y-8 gap-x-4">
                {mobileApps.map((app) => (
                    <div key={app.id} className="flex flex-col items-center gap-2">
                        <button
                            onClick={app.action}
                            className={`w-14 h-14 rounded-[1.2rem] flex items-center justify-center shadow-lg active:scale-95 transition-transform ${app.bg}`}
                        >
                            {app.icon}
                        </button>
                        <span className="text-[11px] text-white/90 font-sans tracking-wide truncate w-full text-center">
                            {app.name}
                        </span>
                    </div>
                ))}
            </div>

            {/* Android Bottom Dock */}
            <div className="mt-auto pt-8">
                <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[2rem] p-4 flex justify-between items-center shadow-2xl">
                    {dockApps.map((app) => (
                        <button
                            key={`dock-${app.id}`}
                            onClick={app.action}
                            className={`w-12 h-12 rounded-full flex items-center justify-center active:scale-90 transition-transform ${app.bg}`}
                        >
                            {app.icon}
                        </button>
                    ))}
                </div>
                {/* Android Bottom Navigation Pill */}
                <div className="w-1/3 h-1 bg-white/40 rounded-full mx-auto mt-6" />
            </div>
        </div>
    );
}