'use client'
import React from 'react'
import { ContentWithIcon } from '@/components/ui/ui'
import { about } from '@/content/content'

type SitePhoneDisplayProps = {
    contentBeforePhone?: string | React.JSX.Element;
    contentAfterPhone?: string | React.JSX.Element;
    style?: React.CSSProperties;
    className?: string;
}
export default function SitePhoneDisplay({contentBeforePhone, contentAfterPhone, style, className}: SitePhoneDisplayProps) {
    return (
        <ContentWithIcon icon="fas fa-phone" style={style} className={className}>{contentBeforePhone}{about.getPhoneAnchorTag()}{contentAfterPhone}</ContentWithIcon>
    )
}

type SitePhoneTemplateProps = {
    style?: React.CSSProperties;
    className?: string;
}

export function SitePhoneDisplayForPractice({style, className}: SitePhoneTemplateProps) {
    return (
        <SitePhoneDisplay contentBeforePhone={"Call "} contentAfterPhone={" for practice."} style={style} className={className} />
    )
}