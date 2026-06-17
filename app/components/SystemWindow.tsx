'use client';

import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
// IMPORT ChevronLeft for the Android Back Button
import { X, Minus, Maximize2, Folder, ChevronLeft } from 'lucide-react';
import { useDesktopStore } from '@/app/store/useDesktopStore';

interface SystemWindowProps {
    id: string;
    title: string;
    children: React.ReactNode;
}

export default function SystemWindow({ id, title, children }: SystemWindowProps) {
    const { windows, focusWindow, closeWindow, updateWindowProps } = useDesktopStore();
    const [isMobile, setIsMobile] = useState(false);

    const windowState = windows.find((w) => w.id === id);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);

        if (windowState && windowState.position.x === 50 && windowState.position.y === 50 && window.innerWidth >= 768) {
            const centerX = (window.innerWidth - windowState.size.width) / 2;
            const centerY = (window.innerHeight - windowState.size.height) / 2;
            updateWindowProps(id, { position: { x: centerX, y: centerY } });
        }

        return () => window.removeEventListener('resize', handleResize);
    }, [id, windowState?.size.width, windowState?.size.height, updateWindowProps]);

    if (!windowState || !windowState.isOpen) return null;

    if (isMobile) {
        return (
            <div className="fixed inset-0 z-[100] flex flex-col bg-[#0d1117]" style={{ zIndex: windowState.zIndex }}>

                {/* ANDROID STYLE APP HEADER - Very touch friendly! */}
                <div className="flex h-[60px] shrink-0 items-center justify-between bg-[#161b22] px-2 border-b border-[#30363d]">
                    <button
                        onClick={() => closeWindow(id)}
                        className="flex items-center gap-1 px-2 py-2 text-[#8b949e] hover:text-white active:bg-white/10 rounded-lg transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6" />
                        <span className="text-[15px] font-sans">Home</span>
                    </button>

                    <div className="flex-1 text-center font-semibold text-[#c9d1d9] font-sans truncate pr-16 text-[14px]">
                        {title}
                    </div>
                </div>

                {/* App Content Area */}
                <div className="flex-1 w-full relative overflow-hidden bg-[#0d1117]">
                    {children}
                </div>
            </div>
        );
    }

    return (
        <Rnd
            size={{ width: windowState.size.width, height: windowState.size.height }}
            position={{ x: windowState.position.x, y: windowState.position.y }}
            onDragStart={() => focusWindow(id)}
            onResizeStart={() => focusWindow(id)}
            onDragStop={(e, d) => updateWindowProps(id, { position: { x: d.x, y: d.y } })}
            onResizeStop={(e, direction, ref, delta, position) => {
                updateWindowProps(id, {
                    size: { width: ref.offsetWidth, height: ref.offsetHeight },
                    position,
                });
            }}
            minWidth={450}
            minHeight={300}
            bounds="parent"
            dragHandleClassName="window-handle"
            // 1. ADD THIS: Tells the window NOT to drag if the user touches a .no-drag element
            cancel=".no-drag"
            style={{ zIndex: windowState.zIndex }}
            className="absolute !flex flex-col rounded-xl border border-[#333] bg-[#1e1e1e] shadow-2xl overflow-hidden ring-1 ring-white/10"
            resizeHandleStyles={{
                bottom: { height: '4px', bottom: '0px' },
                bottomRight: { width: '12px', height: '12px', right: '0px', bottom: '0px' },
                bottomLeft: { width: '12px', height: '12px', left: '0px', bottom: '0px' }
            }}
        >
            <div
                className="window-handle flex h-[40px] shrink-0 w-full items-center justify-between bg-[#2b2d30] px-4 cursor-grab active:cursor-grabbing border-b border-[#111]"
                onPointerDown={() => focusWindow(id)}
            >
                {/* 2. ADD CLASS 'no-drag' AND 'e.stopPropagation()' */}
                <div
                    className="flex w-24 pl-1 no-drag"
                    onPointerDown={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button onClick={() => closeWindow(id)} className="p-2 -ml-2 group/btn focus:outline-none">
                        <div className="h-[14px] w-[14px] rounded-full bg-[#ff5f56] flex items-center justify-center border border-black/10 transition-transform duration-200 group-hover/btn:scale-110 group-active/btn:scale-150">
                            <X className="w-[8px] h-[8px] text-black opacity-0 group-hover/btn:opacity-100 transition-opacity" strokeWidth={3} />
                        </div>
                    </button>
                    {/* Minimize Button */}
                    <button className="p-2 -ml-1 group/btn focus:outline-none">
                        <div className="h-[14px] w-[14px] rounded-full bg-[#ffbd2e] flex items-center justify-center border border-black/10 transition-transform duration-200 group-hover/btn:scale-110 group-active/btn:scale-150">
                            <Minus className="w-[8px] h-[8px] text-black opacity-0 group-hover/btn:opacity-100 transition-opacity" strokeWidth={3} />
                        </div>
                    </button>
                    {/* Maximize Button */}
                    <button className="p-2 -ml-1 group/btn focus:outline-none">
                        <div className="h-[14px] w-[14px] rounded-full bg-[#27c93f] flex items-center justify-center border border-black/10 transition-transform duration-200 group-hover/btn:scale-110 group-active/btn:scale-150">
                            <Maximize2 className="w-[8px] h-[8px] text-black opacity-0 group-hover/btn:opacity-100 transition-opacity" strokeWidth={3} />
                        </div>
                    </button>
                </div>

                {/* Title with Folder Icon */}
                <div className="flex flex-1 items-center justify-center gap-2 text-[13px] font-semibold text-[#8b949e] font-sans select-none">
                    <Folder className="w-4 h-4 text-[#4ba0e3] fill-[#4ba0e3]" />
                    <span>{title}</span>
                </div>

                <div className="w-24" />
            </div>

            <div className="flex-1 min-h-0 w-full flex flex-col overflow-hidden bg-[#1e1e1e] mb-0" onClick={() => focusWindow(id)}>
                {children}
            </div>
        </Rnd>
    );
}