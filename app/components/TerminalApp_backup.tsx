'use client';

import React, { useState, useRef, useEffect } from 'react';

// ==========================================
// MOCK VIEWS (You can move these to separate files later!)
// ==========================================

const AboutView = () => (
    <div className="h-full w-full p-4 text-[#c9d1d9]">
        <div className="flex gap-4 mb-4 border-b border-[#30363d] pb-2">
            <span className="text-white bg-[#30363d] px-2 py-1 text-xs">TS experiences.ts</span>
            <span className="text-[#8b949e] px-2 py-1 text-xs">TS skills.ts</span>
        </div>
        <div className="font-mono text-[13px]">
            <p><span className="text-[#ff7b72]">const</span> <span className="text-[#79c0ff]">NAME</span> = <span className="text-[#a5d6ff]">'Stephen Jonathan Pratama'</span>;</p>
            <p><span className="text-[#ff7b72]">let</span> <span className="text-[#79c0ff]">PROFESSION</span> = <span className="text-[#a5d6ff]">'Software Developer & AI Engineer'</span>;</p>
            <br />
            <p className="text-[#8b949e]">// Tech Stack</p>
            <p><span className="text-[#ff7b72]">const</span> <span className="text-[#79c0ff]">skills</span> = [<span className="text-[#a5d6ff]">'Next.js'</span>, <span className="text-[#a5d6ff]">'Python'</span>, <span className="text-[#a5d6ff]">'Go'</span>, <span className="text-[#a5d6ff]">'Agentic AI'</span>];</p>
        </div>
    </div>
);

const ProjectsView = () => (
    <div className="h-full w-full p-4">
        <div className="bg-[#c9d1d9] text-black inline-block px-2 py-0.5 mb-4 text-xs font-bold">all-projects</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Project Card 1 */}
            <div className="border border-[#30363d] bg-[#161b22] p-4 flex flex-col justify-between hover:border-[#8b949e] transition-colors cursor-pointer group">
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#7ee787]">SILA</h3>
                <p className="text-[#8b949e] text-xs">Sistem Informasi Layanan Video Call LAPAS. Built for government infrastructure.</p>
            </div>
            {/* Project Card 2 */}
            <div className="border border-[#30363d] bg-[#161b22] p-4 flex flex-col justify-between hover:border-[#8b949e] transition-colors cursor-pointer group">
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#7ee787]">Ailo</h3>
                <p className="text-[#8b949e] text-xs">Localized AI chatbot using RAG and MinIO for educational document management.</p>
            </div>
            {/* Project Card 3 */}
            <div className="border border-[#30363d] bg-[#161b22] p-4 flex flex-col justify-between hover:border-[#8b949e] transition-colors cursor-pointer group">
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#7ee787]">Server Bot</h3>
                <p className="text-[#8b949e] text-xs">Telegram bot for headless server management and GPU diagnostics.</p>
            </div>
        </div>
    </div>
);

const SayHelloView = () => (
    <div className="h-full w-full p-4 flex flex-col">
        <div className="flex justify-between items-center mb-6 border-b border-[#30363d] pb-2">
            <span className="text-[#8b949e] text-xs">Guestbook Log</span>
            <button className="bg-[#c9d1d9] text-black px-3 py-1 text-xs font-bold hover:bg-white transition-colors">
                Sign In with Google
            </button>
        </div>
        <div className="flex-1 overflow-y-auto text-[13px] font-mono flex flex-col gap-2 text-[#c9d1d9]">
            <div className="flex"><span className="text-[#7ee787] w-32 shrink-0">~/guest</span> <span>: Sign in to leave a message</span></div>
            <div className="flex"><span className="text-[#7ee787] w-32 shrink-0">~/recruiters</span> <span>: Nice portfolio!</span></div>
            <div className="flex"><span className="text-[#7ee787] w-32 shrink-0">~/stephen</span> <span>: Hi there! 👋 Leave a message.</span></div>
        </div>
    </div>
);


// ==========================================
// MAIN TERMINAL COMPONENT
// ==========================================

export default function TerminalApp() {
    // 1. ADD STATE FOR THE ACTIVE TAB
    const [activeTab, setActiveTab] = useState('home');

    const [history, setHistory] = useState([
        { type: 'system', content: 'Last login: Sun Apr 12 13:36:56 on ttys001' },
    ]);
    const [input, setInput] = useState('');
    const endOfTerminalRef = useRef<HTMLDivElement>(null);

    const promptText = "(base) stephen@Stephens-MacBook-Air ~ %";
    const tabs = ['home', 'about', 'projects', 'sayHello'];

    useEffect(() => {
        if (activeTab === 'home') {
            endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [history, activeTab]);

    const runCommand = (cmdToRun: string) => {
        const command = cmdToRun.trim().toLowerCase();
        if (!command) return;

        // If the command matches a tab name, switch to that tab!
        const matchingTab = tabs.find(t => t.toLowerCase() === command);
        if (matchingTab) {
            setActiveTab(matchingTab);
            setInput('');
            return;
        }

        // Otherwise, process normal terminal commands inside 'home'
        setActiveTab('home'); // Force back to home to see output
        const newHistory = [...history, { type: 'input', content: `${promptText} ${cmdToRun}` }];

        let output = '';
        switch (command) {
            case 'help':
                output = 'Available commands: home, about, projects, sayhello, clear';
                break;
            case 'clear':
                setHistory([]);
                setInput('');
                return;
            default:
                output = `zsh: command not found: ${command}`;
        }

        setHistory([...newHistory, { type: 'output', content: output }]);
        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            runCommand(input);
        }
    };

    return (
        // 1. Added `relative` and swapped flex-col for a strict boundary
        <div className="relative flex-1 h-full w-full bg-transparent font-mono text-[13px] sm:text-[14px]">

            {/* 2. DYNAMIC CONTENT AREA - Pinned to all sides EXCEPT bottom (leaves 32px gap for the h-8 bar) */}
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

                        {/* Active Input Line */}
                        <div className="flex items-start text-white flex-wrap mt-1">
                            <span className="mr-2 shrink-0">{promptText}</span>
                            <input
                                id="terminal-input"
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="flex-1 min-w-[150px] bg-transparent outline-none border-none text-white caret-white"
                                autoComplete="off"
                                spellCheck="false"
                                autoFocus
                            />
                        </div>
                        <div ref={endOfTerminalRef} className="h-4" />
                    </div>
                )}

                {/* Render other views based on state */}
                {activeTab === 'about' && <AboutView />}
                {activeTab === 'projects' && <ProjectsView />}
                {activeTab === 'sayHello' && <SayHelloView />}
            </div>

            {/* 3. TMUX BOTTOM BAR - Absolutely pinned to the bottom 0 pixels */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#161b22] text-[#8b949e] text-xs px-2 sm:px-4 flex items-center justify-between select-none border-t border-[#30363d] overflow-x-auto whitespace-nowrap scrollbar-hide">
                <div className="flex items-center gap-3 sm:gap-6">
                    <span className="bg-[#7ee787] text-black px-2 py-0.5 font-bold rounded-sm">tmux</span>

                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`transition-colors focus:outline-none px-2 py-1 ${activeTab === tab
                                    ? 'bg-[#30363d] text-white font-semibold' // Active tab style
                                    : 'hover:text-white' // Inactive tab style
                                }`}
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