'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import AboutView from '@/app/components/AboutView';
import ProjectsView from '@/app/components/ProjectsView';
import SayHelloView from '@/app/components/SayHelloView';

// 1. ADD PROPS INTERFACE
interface TerminalAppProps {
    initialTab?: string;
    isStandalone?: boolean;
}

export default function TerminalApp({ initialTab, isStandalone = false }: TerminalAppProps) {
    const pathname = usePathname();
    const router = useRouter();

    const tabs = ['home', 'about', 'projects', 'sayHello'];

    // 2. ONLY READ URL IF IT'S NOT A STANDALONE WINDOW
    const currentPath = (!isStandalone && pathname) ? pathname.replace('/', '') : '';
    const startingTab = isStandalone ? (initialTab || 'home') : (tabs.includes(currentPath) ? currentPath : 'home');

    const [activeTab, setActiveTab] = useState(startingTab);
    const [history, setHistory] = useState([
        { type: 'system', content: 'Last login: Sun Apr 12 13:36:56 on ttys001' },
    ]);
    const [input, setInput] = useState('');
    const endOfTerminalRef = useRef<HTMLDivElement>(null);

    const promptText = "(base) stephen@Stephens-MacBook-Air ~ %";

    // Watch the URL for changes
    useEffect(() => {
        // 3. SKIP URL SYNC IF IT'S A STANDALONE WINDOW
        if (isStandalone) return;

        const path = pathname ? pathname.replace('/', '') : '';
        const newTab = tabs.includes(path) ? path : 'home';
        if (newTab !== activeTab) {
            setActiveTab(newTab);
        }
    }, [pathname, activeTab, tabs, isStandalone]);

    // Generate the date
    useEffect(() => {
        const dateTime = new Date().toLocaleString('en-US', {
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit',
        });
        setHistory(prev => {
            const newHistory = [...prev];
            newHistory[0] = { type: 'system', content: `Last login: ${dateTime}` };
            return newHistory;
        });
    }, []);

    // Auto-scroll
    useEffect(() => {
        if (activeTab === 'home') {
            endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [history, activeTab]);

    const handleTabChange = (tabName: string) => {
        setActiveTab(tabName);
        // 4. ONLY UPDATE NEXT.JS ROUTER IF NOT STANDALONE
        if (!isStandalone) {
            const newPath = tabName === 'home' ? '/' : `/${tabName}`;
            router.push(newPath, { scroll: false });
        }
    };

    const runCommand = (cmdToRun: string) => {
        const command = cmdToRun.trim().toLowerCase();
        if (!command) return;

        const matchingTab = tabs.find(t => t.toLowerCase() === command);
        if (matchingTab) {
            handleTabChange(matchingTab);
            setInput('');
            return;
        }

        handleTabChange('home');
        const newHistory = [...history, { type: 'input', content: `${promptText} ${cmdToRun}` }];

        let output = '';
        switch (command) {
            case 'help': output = 'Available commands: home, about, projects, sayhello, clear'; break;
            case 'clear': setHistory([]); setInput(''); return;
            default: output = `zsh: command not found: ${command}`;
        }

        setHistory([...newHistory, { type: 'output', content: output }]);
        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') runCommand(input);
    };

    return (
        <div className="relative flex-1 h-full w-full bg-transparent font-mono text-[13px] sm:text-[14px]">
            <div
                className="absolute inset-0 bottom-8 overflow-y-auto bg-[#0d1117]"
                onClick={() => activeTab === 'home' && document.getElementById('terminal-input')?.focus()}
            >
                {activeTab === 'home' && (
                    <div className="p-2 sm:p-4 cursor-text h-full">
                        <div className="flex flex-col mb-1">
                            {history.map((line, i) => (
                                <div key={i} className={`${line.type === 'input' ? 'text-white' : 'text-[#c9d1d9]'} whitespace-pre-wrap break-words mt-1`}>
                                    {line.content}
                                </div>
                            ))}
                        </div>

                        <div className="flex items-start text-white flex-wrap mt-1">
                            <span className="mr-2 shrink-0">{promptText}</span>
                            <input
                                id="terminal-input"
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="flex-1 min-w-[150px] bg-transparent outline-none border-none text-white caret-white"
                                autoComplete="off" spellCheck="false" autoFocus
                            />
                        </div>
                        <div ref={endOfTerminalRef} className="h-4" />
                    </div>
                )}

                {activeTab === 'about' && <AboutView />}
                {activeTab === 'projects' && <ProjectsView />}
                {activeTab === 'sayHello' && <SayHelloView />}
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#161b22] text-[#8b949e] text-xs px-2 sm:px-4 flex items-center justify-between select-none border-t border-[#30363d] overflow-x-auto whitespace-nowrap scrollbar-hide">
                <div className="flex items-center gap-3 sm:gap-6">
                    <span className="bg-[#7ee787] text-black px-2 py-0.5 font-bold rounded-sm">tmux</span>
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => handleTabChange(tab)}
                            className={`transition-colors focus:outline-none px-2 py-1 ${activeTab === tab ? 'bg-[#30363d] text-white font-semibold' : 'hover:text-white'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="hidden sm:block opacity-60">
                    -- Stephen Pratama --
                </div>
            </div>
        </div>
    );
}