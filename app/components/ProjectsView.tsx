'use client';

import React, { useState, useEffect } from 'react';
import {
    Folder, Star, Clock, X, ChevronRight, ChevronLeft, LayoutGrid, PanelLeft,
    Video, GraduationCap, Bot, MapPin, Terminal, Database, Code2, Globe
} from 'lucide-react';

interface Project {
    id: string;
    name: string;
    description: string;
    longDescription: string;
    features: string[];
    icon: React.ElementType;
    images: string[];
}

const projects: Project[] = [
    {
        id: 'sila',
        name: 'SILA',
        description: 'Secure video communication platform for government correctional facilities (LAPAS).',
        longDescription: 'SILA is a high-security video call system engineered for Indonesian correctional facilities. It facilitates monitored, encrypted remote communication between inmates and families, ensuring strict compliance with government security protocols.',
        features: [
            'Node.js and PostgreSQL backend architecture',
            'Real-time facial verification workflows for visitor authentication',
            'End-to-end encrypted communication channels',
            'Strict server configurations for secure government infrastructure'
        ],
        icon: Video,
        images: ['/SILA_1.png', '/SILA_2.png', '/SILA_3.png']
    },
    {
        id: 'zyrex-rag',
        name: 'Zyrex Customer Service RAG',
        description: 'Sistem RAG untuk manual books dengan fitur otomatisasi tiket service.',
        longDescription: 'Solusi Retrieval-Augmented Generation (RAG) yang dirancang untuk mengotomatisasi dukungan teknis menggunakan manual books perangkat Zyrex. Dilengkapi dengan fitur pembuatan tiket service otomatis, arsitektur ColPali, dan sistem Guard Rail untuk keamanan respons.',
        features: [
            'RAG khusus untuk manual books perangkat Zyrex',
            'Fitur otomatis pembuatan tiket service',
            'Arsitektur pencarian visual berbasis ColPali',
            'Implementasi Guard Rail untuk keamanan respons'
        ],
        icon: Bot,
        images: ['/RAG_Zyrex.png']
    },
    {
        id: 'ailo-llm',
        name: 'AILO',
        description: 'Local multimodal AI interface running Qwen 3.5 for privacy-focused assistance.',
        longDescription: 'A private, "Local ChatGPT" alternative designed to run entirely on local hardware. It utilizes the Qwen 3.5 Multimodal model to handle both text and visual inputs without relying on external cloud APIs.',
        features: [
            'Local inference using Qwen 3.5 Multimodal model',
            'Privacy-first architecture with zero external data leakage',
            'Support for image-to-text and complex reasoning tasks',
            'Optimized for local GPU deployment (vLLM/Ollama)'
        ],
        icon: Bot,
        images: ['/AILO.png']
    },
    {
        id: 'vehicle-tracking',
        name: 'Real-Time Vehicle Tracking',
        description: 'A live tracking system for fleet management and vehicle monitoring.',
        longDescription: 'A robust tracking solution that provides real-time geographic data for vehicles. Designed for fleet efficiency, it monitors movement, history, and status updates through a centralized dashboard.',
        features: [
            'Real-time GPS data streaming and visualization',
            'Historical route playback and geofencing',
            'High-concurrency data handling for multiple assets',
            'Integrated map-based user interface'
        ],
        icon: MapPin,
        images: ['/HCML_Vehicle_Tracking.png']
    },
    {
        id: 'gitlab-cicd',
        name: 'GitLab CI/CD Infrastructure',
        description: 'Automated deployment pipelines and DevOps workflows for enterprise applications.',
        longDescription: 'Implementation of automated CI/CD pipelines using GitLab to streamline the development-to-production lifecycle. Focused on reducing manual overhead and ensuring code quality through automated testing and containerized deployments.',
        features: [
            'Automated build, test, and deployment stages',
            'Docker-based runner configurations',
            'Environment-specific deployment strategies',
            'Seamless integration with production server clusters'
        ],
        icon: Terminal,
        images: ['/CI_CD_Prod.png', '/CI_CD_Dev.png']
    }
];

export default function ProjectsView() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setCurrentImageIndex(0);
    }, [selectedProject]);

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedProject) {
            setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length);
        }
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedProject) {
            setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
        }
    };

    return (
        <div className="flex h-full w-full overflow-hidden bg-[#0d1117] font-mono select-none relative text-gray-300">

            {/* ADAPTIVE SIDEBAR */}
            <div className={`
                absolute md:relative z-40 h-full shrink-0 bg-[#0d1117] transition-all duration-300 ease-in-out border-[#30363d] overflow-hidden
                ${isSidebarOpen
                    ? 'w-64 md:w-48 border-r translate-x-0'
                    : 'w-64 md:w-0 border-r-0 -translate-x-full md:translate-x-0'
                }
            `}>
                <div className="w-64 md:w-48 flex flex-col h-full p-4 gap-2">
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest">Places</div>
                        <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-1 text-gray-500 hover:text-white">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <button
                        onClick={() => setSelectedProject(null)}
                        className={`flex items-center gap-2 text-xs p-2 rounded no-drag text-left transition-colors ${!selectedProject ? 'text-blue-400 font-bold bg-blue-500/10' : 'text-gray-500 hover:text-white'}`}
                    >
                        <Folder className="w-4 h-4 shrink-0" />
                        <span className="truncate">All Repos</span>
                    </button>
                    <button className="flex items-center gap-2 text-xs text-gray-500 hover:text-white p-2 transition-colors text-left">
                        <Star className="w-4 h-4 shrink-0" />
                        <span className="truncate">Starred</span>
                    </button>
                    <button className="flex items-center gap-2 text-xs text-gray-500 hover:text-white p-2 transition-colors text-left">
                        <Clock className="w-4 h-4 shrink-0" />
                        <span className="truncate">Recent</span>
                    </button>
                </div>
            </div>

            {/* Mobile Overlay */}
            <div
                className={`md:hidden absolute inset-0 bg-black/50 z-30 backdrop-blur-sm transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsSidebarOpen(false)}
            />

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 flex flex-col min-w-0 h-full relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-[#30363d] bg-[#161b22]/50 shrink-0">
                    <div className="flex items-center gap-2 overflow-hidden">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className={`p-1.5 rounded transition-colors mr-1 ${isSidebarOpen ? 'text-blue-400 bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                        >
                            <PanelLeft className="w-4 h-4" />
                        </button>
                        <button onClick={() => setSelectedProject(null)} className="bg-[#c9d1d9] text-black px-2 py-0.5 text-[10px] font-bold rounded-sm shrink-0">projects</button>
                        <ChevronRight className="w-3 h-3 text-gray-600 shrink-0" />
                        <span className="text-white text-[10px] font-semibold truncate">work</span>
                        {selectedProject && (
                            <>
                                <ChevronRight className="w-3 h-3 text-gray-600 shrink-0" />
                                <span className="text-white text-[10px] font-semibold truncate">{selectedProject.name.toLowerCase()}</span>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#0a0c10] relative">
                    {selectedProject ? (
                        /* DETAIL VIEW */
                        <div className="flex flex-col h-full animate-in fade-in duration-300">
                            <div className="sticky top-0 z-20 flex items-center px-6 py-3 bg-[#0a0c10]/95 backdrop-blur-md border-b border-[#30363d]">
                                <button onClick={() => setSelectedProject(null)} className="flex items-center gap-2 text-xs text-gray-400 hover:text-white group">
                                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                    Back to Grid
                                </button>
                            </div>

                            <div className="max-w-4xl mx-auto w-full p-6 sm:p-10 flex flex-col gap-8 pb-20">
                                {/* Image Display - Flexible height for portrait images */}
                                <div className="w-full min-h-[300px] max-h-[650px] bg-[#0d1117] border border-[#30363d] rounded-lg shadow-2xl flex flex-col overflow-hidden relative group">
                                    {/* App-like Header */}
                                    <div className="h-8 bg-[#161b22] border-b border-[#30363d] flex items-center px-4 gap-2 w-full z-10 shrink-0">
                                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                                        <div className="ml-4 flex-1 text-center text-[10px] text-gray-500 font-sans truncate px-4">
                                            {selectedProject.images[currentImageIndex].split('/').pop()}
                                        </div>
                                    </div>

                                    {/* Image Container - NO CROPPING */}
                                    <div className="flex-1 relative bg-black/40 flex items-center justify-center p-2 min-h-0">
                                        <img 
                                            src={selectedProject.images[currentImageIndex]} 
                                            alt={selectedProject.name}
                                            className="max-w-full max-h-[600px] object-contain block mx-auto"
                                        />

                                        {/* Carousel Controls */}
                                        {selectedProject.images.length > 1 && (
                                            <>
                                                <button onClick={prevImage} className="absolute left-4 p-2 bg-black/60 hover:bg-black/80 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <ChevronLeft className="w-5 h-5" />
                                                </button>
                                                <button onClick={nextImage} className="absolute right-4 p-2 bg-black/60 hover:bg-black/80 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <ChevronRight className="w-5 h-5" />
                                                </button>
                                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                                                    {selectedProject.images.map((_, i) => (
                                                        <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === currentImageIndex ? 'bg-blue-500' : 'bg-gray-600'}`}></div>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-6 text-gray-300 mt-4">
                                    <h1 className="text-3xl font-bold text-white tracking-wide">{selectedProject.name}</h1>
                                    <p className="leading-relaxed text-sm sm:text-base text-[#8b949e]">{selectedProject.longDescription}</p>
                                    <div>
                                        <h2 className="text-xl font-bold text-white mb-4">Features</h2>
                                        <ul className="flex flex-col gap-3">
                                            {selectedProject.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-[#8b949e]">
                                                    <ChevronRight className="w-4 h-4 text-blue-500 shrink-0 mt-1" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* GRID VIEW */
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 p-4 sm:p-6 animate-in fade-in duration-300">
                            {projects.map((project) => {
                                const Icon = project.icon;
                                return (
                                    <div
                                        key={project.id}
                                        onClick={() => setSelectedProject(project)}
                                        className="flex flex-col border border-[#30363d] bg-[#161b22] hover:border-gray-500 transition-all duration-200 cursor-pointer group h-64"
                                    >
                                        <div className="relative h-[55%] flex items-center justify-center bg-[#0d1117] border-b border-[#30363d] overflow-hidden p-4">
                                            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] transition-opacity duration-500">
                                                <Icon className="w-32 h-32 text-white" />
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#161b22]/90"></div>
                                            <h3 className="relative z-10 text-xl font-bold tracking-[0.10em] uppercase text-gray-400 transition-opacity duration-300 text-center px-2 group-hover:opacity-0">
                                                {project.name}
                                            </h3>
                                            {project.images.length > 0 && (
                                                <div
                                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-contain bg-center bg-no-repeat z-20"
                                                    style={{ backgroundImage: `url(${project.images[0]})` }}
                                                />
                                            )}
                                        </div>
                                        <div className="p-4 h-[45%] flex flex-col justify-start bg-[#161b22]">
                                            <p className="text-[#8b949e] text-[11px] sm:text-xs leading-relaxed line-clamp-4">{project.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}