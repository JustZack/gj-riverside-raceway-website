'use client'
import React from 'react'
import { ContentWithIcon } from '@/components/ui/ui'
import { about } from '@/content/content'

type SiteAddressDisplayProps = {
    contentBeforeAddress?: string | React.JSX.Element;
    contentAfterAddress?: string | React.JSX.Element;
}
export default function SiteAddressDisplay({contentBeforeAddress, contentAfterAddress}: SiteAddressDisplayProps) {
    return (
        <ContentWithIcon icon="fas fa-map-marker-alt">{contentBeforeAddress}{about.getAddressAnchorTag()}{contentAfterAddress}</ContentWithIcon>
    )
}