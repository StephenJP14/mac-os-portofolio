'use client';

import React from 'react';

interface PreviewAppProps {
    fileUrl: string;
}

export default function PreviewApp({ fileUrl }: PreviewAppProps) {
    return (
        // The background color matches the dark gray of browser PDF viewers
        <div className="w-full h-full bg-[#323639] flex flex-col relative">

            {/* Optional: A fake macOS toolbar could go here if you wanted to hide the iframe toolbar, 
                but keeping it simple is usually better for functionality. */}

            <iframe
                // #view=FitH tells the PDF to fit to the width of the window automatically
                src={`${fileUrl}#view=FitH`}
                className="w-full h-full border-none"
                title="PDF Preview"
            />

            {/* Cover up any white loading flashes with a dark background */}
            <div className="absolute inset-0 -z-10 bg-[#323639]" />
        </div>
    );
}