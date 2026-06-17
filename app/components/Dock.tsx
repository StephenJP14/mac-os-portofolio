'use client';

import React, { useState } from 'react';
// 1. ADD User and Briefcase icons here
import { Terminal, Mail, FileText, GitCompareArrows, SquareUserRound, Gamepad2, Trash2, Layout, User, Briefcase } from 'lucide-react';
import { useDesktopStore } from '@/app/store/useDesktopStore';

type DockApp = {
    id: string;
    name: string;
    icon: React.ReactNode;
    action: () => void;
    bg: string;
    isDivider: false;
};

type DockDivider = {
    id: string;
    isDivider: true;
};

type DockItem = DockApp | DockDivider;

export default function Dock() {
    const { windows, openWindow, focusWindow } = useDesktopStore();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const pinnedApps = [
        {
            id: 'terminal',
            name: 'Terminal',
            icon: <Terminal className="w-7 h-7 text-[#7ee787]" strokeWidth={1.5} />,
            action: () => openWindow('main-terminal', 'terminal', 'stephen@Stephens-MacBook-Air: ~'),
            bg: 'bg-gradient-to-b from-[#3a4049] to-[#1e2227]',
        },
        // 2. ADD ABOUT APP
        {
            id: 'about',
            name: 'About Me',
            icon: <User className="w-7 h-7 text-white" strokeWidth={1.5} />,
            action: () => openWindow('about-window', 'about', 'About Me'),
            bg: 'bg-gradient-to-b from-[#d2a8ff] to-[#a371f7]', // Purple gradient
        },
        // 3. ADD PROJECTS APP
        {
            id: 'projects',
            name: 'Projects',
            icon: <Briefcase className="w-7 h-7 text-white" strokeWidth={1.5} />,
            action: () => openWindow('projects-window', 'projects', 'My Projects'),
            bg: 'bg-gradient-to-b from-[#f69d50] to-[#e36209]', // Orange gradient
        },
        {
            id: 'space-invaders',
            name: 'Space Invaders',
            icon: <Gamepad2 className="w-7 h-7 text-white" strokeWidth={1.5} />,
            // UPDATE THIS LINE:
            action: () => openWindow('space-invaders', 'space-invaders', 'Space Invaders'),
            bg: 'bg-gradient-to-b from-[#ff7b72] to-[#d73a49]',
        },
        {
            id: 'cv',
            name: 'Resume',
            icon: <FileText className="w-7 h-7 text-white" strokeWidth={1.5} />,
            action: () => openWindow('cv-preview', 'preview', 'CV_Stephen_Jonathan_Pratama.pdf'),
            bg: 'bg-gradient-to-b from-[#79c0ff] to-[#0366d6]',
        },
        {
            id: 'mail',
            name: 'Mail',
            icon: <Mail className="w-7 h-7 text-white" strokeWidth={1.5} />,
            action: () => window.location.href = 'mailto:stephen.j.pratama@gmail.com',
            bg: 'bg-gradient-to-b from-[#58a6ff] to-[#1f6feb]',
        },
        {
            id: 'github',
            name: 'GitHub',
            icon: <GitCompareArrows className="w-7 h-7 text-white" strokeWidth={1.5} />,
            action: () => window.open('https://github.com/StephenJP14', '_blank'),
            bg: 'bg-gradient-to-b from-[#484f58] to-[#21262d]',
        },
        {
            id: 'linkedin',
            name: 'LinkedIn',
            icon: <SquareUserRound className="w-7 h-7 text-white" strokeWidth={1.5} />,
            action: () => window.open('https://www.linkedin.com/in/stephen-jonathan-pratama-260365245', '_blank'),
            bg: 'bg-gradient-to-b from-[#0077b5] to-[#004471]',
        }
    ];

    const pinnedAppIds = pinnedApps.map(app => app.id);

    const getDynamicIcon = (componentType: string) => {
        switch (componentType) {
            case 'preview': return <FileText className="w-7 h-7 text-white" strokeWidth={1.5} />;
            case 'terminal': return <Terminal className="w-7 h-7 text-white" strokeWidth={1.5} />;
            // 4. Handle dynamic icons for new window types
            case 'about': return <User className="w-7 h-7 text-white" strokeWidth={1.5} />;
            case 'projects': return <Briefcase className="w-7 h-7 text-white" strokeWidth={1.5} />;
            default: return <Layout className="w-7 h-7 text-white" strokeWidth={1.5} />;
        }
    };

    const unpinnedOpenWindows = windows
        .filter(w => !pinnedAppIds.includes(w.component))
        .map(w => ({
            id: w.id,
            name: w.title,
            icon: getDynamicIcon(w.component),
            action: () => focusWindow(w.id),
            bg: 'bg-gradient-to-b from-gray-500 to-gray-700',
        }));

    const rightSideApps = [
        ...unpinnedOpenWindows,
        {
            id: 'trash',
            name: 'Trash',
            icon: <Trash2 className="w-7 h-7 text-white/60" strokeWidth={1.5} />,
            action: () => alert("Maybe we make this close all windows later? 🗑️"),
            bg: 'bg-gradient-to-b from-[#30363d] to-[#161b22]',
        }
    ];

    const allDockItems: DockItem[] = [
        ...pinnedApps.map(app => ({ ...app, isDivider: false as const })),
        { id: 'divider', isDivider: true as const },
        ...rightSideApps.map(app => ({ ...app, isDivider: false as const }))
    ];

    return (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 mb-2">
            <div className="flex items-end gap-2 px-3 pb-2 pt-2 bg-[#161b22]/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
                {allDockItems.map((item, index) => {
                    if (item.isDivider) {
                        return <div key={item.id} className="w-[1px] h-10 bg-white/10 mx-1 mb-1 rounded-full" />;
                    }

                    const isHovered = hoveredIndex === index;
                    const isNeighbor = hoveredIndex !== null && Math.abs(hoveredIndex - index) === 1;
                    const isRunning = windows.some(w => w.component === item.id) || item.id === 'trash';

                    return (
                        <div
                            key={item.id}
                            className="relative group flex flex-col items-center justify-end"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="absolute -top-12 px-3 py-1.5 bg-[#161b22] text-[#c9d1d9] text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white/10 shadow-xl">
                                {item.name}
                            </div>

                            <button
                                onClick={item.action}
                                className={`
                                    relative flex items-center justify-center rounded-[14px] shadow-lg
                                    transition-all duration-200 ease-out origin-bottom
                                    ${item.bg}
                                    ${isHovered ? 'w-16 h-16 -translate-y-2' : isNeighbor ? 'w-14 h-14 -translate-y-1' : 'w-12 h-12'}
                                `}
                            >
                                <div className="absolute inset-0 rounded-[14px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] pointer-events-none" />
                                {item.icon}
                            </button>

                            <div className={`absolute -bottom-1.5 w-1 h-1 rounded-full transition-colors duration-300 ${isRunning ? 'bg-white/70' : 'bg-transparent'}`} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}