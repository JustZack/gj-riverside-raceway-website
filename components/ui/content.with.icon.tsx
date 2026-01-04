import React from 'react';
import { Row } from '@/components/ui/ui';

interface ContentWithIconProps {
    children: React.ReactNode;
    icon: string;
    className?: string;
    style?: React.CSSProperties;
}

export default function ContentWithIcon({ children, icon, className = '', style }: ContentWithIconProps) {
    return (
        <Row className={`flex items-center justify-between gap-2 w-full ${className}`} gap={1} style={style}>
            <span className="flex items-center justify-center w-6 h-6">
                <i className={icon}/>
            </span>
            <span className="flex-1">{children}</span>
        </Row>
    );
}
