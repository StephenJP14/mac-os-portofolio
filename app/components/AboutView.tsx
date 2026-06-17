'use client';

import React, { useState, useEffect } from 'react';
import { FileText, FileJson, FileCode2, Terminal, ChevronRight, ChevronDown, LayoutPanelLeft, X } from 'lucide-react';

// --- CONTENT COMPONENTS ---

const ReadmeContent = () => (
    <div className="text-[13px] leading-relaxed">
        <span className="text-blue-400 font-bold text-lg"># Stephen Jonathan Pratama</span>
        <br /><br />
        <span className="text-gray-500 italic">{'>'} Software Engineer | 8th Semester Student @ CIT</span>
        <br /><br />
        Hello world! I am a passionate software developer based in Jakarta, Indonesia.
        Currently pursuing my degree at Calvin Institute of Technology.
        <br /><br />
        I specialize in building robust backend systems, scalable infrastructure,
        and clean, interactive user interfaces. My current interests lie heavily in
        <span className="text-green-400"> AI & Big Data Analytics</span> and <span className="text-purple-400">System Architecture</span>.
        <br /><br />
        When I am not coding, you can usually find me analyzing data trends, exploring new frameworks, or drinking my 3rd cup of water.
    </div>
);

const SkillsContent = () => (
    <div className="text-[13px] font-mono leading-relaxed">
        <span className="text-yellow-300">{`{`}</span>
        <div className="pl-4">
            <span className="text-blue-400">"languages"</span>: <span className="text-yellow-300">{`[`}</span>
            <span className="text-green-400">"Python (FastAPI)"</span>, <span className="text-green-400">"Node.js"</span>, <span className="text-green-400">"PHP"</span>, <span className="text-green-400">"C++"</span>
            <span className="text-yellow-300">{`]`}</span>, [cite: 10]
            <br />
            <span className="text-blue-400">"ai_data"</span>: <span className="text-yellow-300">{`[`}</span>
            <span className="text-green-400">"LangGraph"</span>, <span className="text-green-400">"QdrantDB"</span>, <span className="text-green-400">"Gemini API"</span>, <span className="text-green-400">"RAG"</span>
            <span className="text-yellow-300">{`]`}</span>, [cite: 11, 33]
            <br />
            <span className="text-blue-400">"devops"</span>: <span className="text-yellow-300">{`[`}</span>
            <span className="text-green-400">"AWS (EC2)"</span>, <span className="text-green-400">"Docker"</span>, <span className="text-green-400">"GitLab CI/CD"</span>, <span className="text-green-400">"MinIO"</span>
            <span className="text-yellow-300">{`]`}</span>, [cite: 12]
            <br />
            <span className="text-blue-400">"real_time"</span>: <span className="text-yellow-300">{`[`}</span>
            <span className="text-green-400">"Apache Kafka"</span>, <span className="text-green-400">"WebSockets"</span>, <span className="text-green-400">"FFmpeg"</span>
            <span className="text-yellow-300">{`]`}</span> [cite: 13, 24, 43]
        </div>
        <span className="text-yellow-300">{`}`}</span>
    </div>
);

const ExperienceContent = () => (
    <div className="text-[13px] font-mono leading-relaxed">
        <span className="text-purple-400">education:</span>
        <div className="pl-4 mb-4 border-l-2 border-gray-700 ml-2 mt-1">
            <span className="text-blue-400">institution:</span> <span className="text-green-400">"Calvin Institute of Technology"</span> [cite: 15]<br />
            <span className="text-blue-400">major:</span> <span className="text-green-400">"IT & Big Data Analytics"</span> <br />
            <span className="text-blue-400">status:</span> <span className="text-green-400">"8th Semester"</span> <br />
            <span className="text-blue-400">gpa:</span> <span className="text-orange-400">3.72</span> <br />
        </div>

        <span className="text-purple-400">key_projects:</span>
        <div className="pl-4 border-l-2 border-gray-700 ml-2 mt-1">
            <span className="text-gray-500"># Production-level implementations</span><br />
            <span className="text-gray-400">-</span> <span className="text-blue-400">name:</span> <span className="text-green-400">"Dering (Secure Gov Video Call)"</span> [cite: 38]<br />
            <span className="text-gray-400">-</span> <span className="text-blue-400">name:</span> <span className="text-green-400">"RAG Chatbot Service (Zyrex)"</span> [cite: 29, 33]<br />
            <span className="text-gray-400">-</span> <span className="text-blue-400">name:</span> <span className="text-green-400">"Real-time Vehicle Tracking"</span> [cite: 24]<br />
            <span className="text-gray-400">-</span> <span className="text-blue-400">name:</span> <span className="text-green-400">"Enterprise GitLab CI/CD"</span> [cite: 44]<br />
        </div>
    </div>
);

const EnvContent = () => (
    <div className="text-[13px] font-mono leading-relaxed text-gray-300">
        <span className="text-gray-500"># Environment Variables</span><br />
        <span className="text-blue-400">FULL_NAME</span>=<span className="text-green-400">"Stephen Jonathan Pratama"</span> [cite: 1]<br />
        <span className="text-blue-400">LOCATION</span>=<span className="text-green-400">"Jakarta Utara, Indonesia"</span> [cite: 3]<br />
        <span className="text-blue-400">CURRENT_ROLE</span>=<span className="text-green-400">"Junior Full-Stack Developer"</span> [cite: 18]<br />
        <span className="text-blue-400">HIRE_AVAILABILITY</span>=<span className="text-orange-400">true</span><br />
        <br />
        <span className="text-gray-500"># Technical Health Check</span><br />
        <span className="text-blue-400">BACKEND_EFFICIENCY</span>=<span className="text-orange-400">+30%</span> [cite: 23]<br />
        <span className="text-blue-400">DEPLOY_TIME_REDUCTION</span>=<span className="text-orange-400">80%</span> [cite: 47]<br />
    </div>
);

// --- MAIN COMPONENT ---

const files = [
    { id: 'readme.md', name: 'readme.md', icon: FileText, color: 'text-blue-400', content: <ReadmeContent /> },
    { id: 'skills.json', name: 'skills.json', icon: FileJson, color: 'text-yellow-400', content: <SkillsContent /> },
    { id: 'experience.yml', name: 'experience.yml', icon: FileCode2, color: 'text-purple-400', content: <ExperienceContent /> },
    { id: '.env.local', name: '.env.local', icon: Terminal, color: 'text-gray-400', content: <EnvContent /> },
];

export default function AboutView() {
    const [activeFileId, setActiveFileId] = useState('readme.md');
    // FIX 1: Default to false so it loads closed
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isFolderOpen, setIsFolderOpen] = useState(true);

    const activeFile = files.find(f => f.id === activeFileId);

    // Generate line numbers (1 to 30)
    const lineNumbers = Array.from({ length: 30 }, (_, i) => i + 1);

    // FIX 2: Only auto-close on mobile screens. We removed the "else { setIsSidebarOpen(true) }" 
    // so it doesn't fight the user's manual toggle on desktop.
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="flex h-full w-full overflow-hidden bg-[#0d1117] font-mono select-none relative text-gray-300">

            {/* FIX 3: Added 'overflow-hidden' to the main sidebar wrapper. 
                This prevents the w-56 child from bleeding its text out when this parent shrinks to w-0. */}
            <div className={`
                absolute md:relative z-40 h-full shrink-0 bg-[#0d1117] transition-all duration-300 ease-in-out border-[#30363d] overflow-hidden
                ${isSidebarOpen
                    ? 'w-64 md:w-56 border-r translate-x-0'
                    : 'w-64 md:w-0 border-r-0 -translate-x-full md:translate-x-0'
                }
            `}>
                <div className="w-64 md:w-56 flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-[#30363d] shrink-0">
                        <div className="text-[11px] text-gray-400 font-bold tracking-widest uppercase">Explorer</div>
                        <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-1 text-gray-500 hover:text-white">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Folder Structure */}
                    <div className="py-2 overflow-y-auto">
                        <div
                            className="flex items-center gap-1 px-2 py-1 cursor-pointer hover:bg-white/5 text-gray-300 group"
                            onClick={() => setIsFolderOpen(!isFolderOpen)}
                        >
                            {isFolderOpen ? <ChevronDown className="w-4 h-4 shrink-0" /> : <ChevronRight className="w-4 h-4 shrink-0" />}
                            <span className="text-xs font-bold uppercase tracking-wider truncate">ABOUT_STEPHEN</span>
                        </div>

                        {isFolderOpen && (
                            <div className="mt-1 flex flex-col">
                                {files.map(file => (
                                    <div
                                        key={file.id}
                                        onClick={() => setActiveFileId(file.id)}
                                        className={`
                                            flex items-center gap-2 px-8 py-1.5 cursor-pointer text-[13px] transition-colors
                                            ${activeFileId === file.id ? 'bg-[#161b22] text-white border-l-2 border-blue-500' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200 border-l-2 border-transparent'}
                                        `}
                                    >
                                        <file.icon className={`w-4 h-4 shrink-0 ${file.color}`} />
                                        <span className="truncate">{file.name}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Overlay */}
            <div
                className={`md:hidden absolute inset-0 bg-black/50 z-30 backdrop-blur-sm transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsSidebarOpen(false)}
            />

            {/* 2. EDITOR AREA */}
            <div className="flex-1 flex flex-col min-w-0 h-full relative z-10 bg-[#0d1117]">

                {/* Editor Tabs - Added No-Wrap & Auto-Scroll Logic */}
                <div className="flex bg-[#0d1117] border-b border-[#30363d] overflow-x-auto scrollbar-hide shrink-0">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className={`px-3 py-2 border-r border-[#30363d] flex items-center justify-center shrink-0 transition-colors ${isSidebarOpen ? 'text-blue-400 bg-white/5' : 'text-gray-500 hover:text-white'}`}
                    >
                        <LayoutPanelLeft className="w-4 h-4" />
                    </button>

                    <div className="flex flex-nowrap">
                        {files.map(file => (
                            <div
                                key={`tab-${file.id}`}
                                onClick={() => setActiveFileId(file.id)}
                                className={`
                                    flex items-center gap-2 px-3 sm:px-4 py-2 border-r border-[#30363d] cursor-pointer min-w-max text-[12px] sm:text-[13px] transition-colors
                                    ${activeFileId === file.id ? 'bg-[#161b22] text-white border-t-2 border-t-blue-500' : 'bg-[#0d1117] text-gray-500 hover:bg-[#161b22]/50 border-t-2 border-t-transparent'}
                                `}
                            >
                                <file.icon className={`w-3.5 h-3.5 shrink-0 ${file.color}`} />
                                {file.name}
                                {activeFileId === file.id && (
                                    <button className="ml-1 sm:ml-2 p-0.5 rounded-sm hover:bg-white/10 text-gray-400 hover:text-white">
                                        <X className="w-3 h-3" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Breadcrumbs */}
                <div className="flex items-center gap-1 px-4 py-1.5 bg-[#161b22] border-b border-[#30363d] text-[11px] text-gray-500 shrink-0 overflow-hidden whitespace-nowrap">
                    <span className="truncate">about_stephen</span>
                    <ChevronRight className="w-3 h-3 shrink-0" />
                    <span className="shrink-0">src</span>
                    <ChevronRight className="w-3 h-3 shrink-0" />
                    <span className="text-gray-300 shrink-0">{activeFile?.name}</span>
                </div>

                {/* Editor Content Area */}
                <div className="flex-1 flex overflow-y-auto bg-[#0d1117] relative">
                    {/* Line Numbers - Narrower on mobile to save reading space */}
                    <div className="w-8 sm:w-12 py-4 flex flex-col items-end pr-2 sm:pr-4 text-[12px] sm:text-[13px] font-mono text-gray-600 bg-[#0d1117] border-r border-gray-800 shrink-0 select-none">
                        {lineNumbers.map(num => (
                            <div key={num} className="leading-relaxed opacity-50">{num}</div>
                        ))}
                    </div>

                    {/* Actual Content Area */}
                    <div className="flex-1 p-4 overflow-x-auto text-gray-300 relative">
                        <div key={activeFileId} className="animate-pulse w-1.5 h-4 absolute left-4 top-4 pointer-events-none" />

                        <div key={`content-${activeFileId}`} className="transition-opacity duration-300">
                            {activeFile?.content}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}