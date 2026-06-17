'use client';

export default function SayHelloView() {
    return (
        <div className="h-full w-full p-4 flex flex-col">
            <div className="flex justify-between items-center mb-6 border-b border-[#30363d] pb-2">
                <span className="text-[#8b949e] text-xs">Guestbook Log</span>
            </div>
            <div className="flex-1 overflow-y-auto text-[13px] font-mono flex flex-col gap-2 text-[#c9d1d9]">
                <div className="flex"><span className="text-[#7ee787] w-32 shrink-0">~/recruiters</span> <span>: Nice portfolio!</span></div>
                <div className="flex"><span className="text-[#7ee787] w-32 shrink-0">~/stephen</span> <span>: Hi there! 👋 Feel free to reach out via email.</span></div>
            </div>
        </div>
    );
}