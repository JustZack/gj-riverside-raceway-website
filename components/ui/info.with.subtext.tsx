import React from 'react';

interface InfoWithSubtextProps {
    children: React.ReactNode;
    subText?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

/**
 * Displays main content with optional subtext below.
 */
export default function InfoWithSubtext({ children, subText, className = '', style }: InfoWithSubtextProps) {
    return (
        <div className={`flex flex-col min-w-0 ${className}`} style={style}>
            <div className="flex items-center flex-wrap min-w-0">
                {children}
            </div>
            <div className="flex items-center text-sm text-gray-500">
                <span>{subText}</span>
            </div>
        </div>
    );
}
