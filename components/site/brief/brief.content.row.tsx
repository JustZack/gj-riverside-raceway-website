'use client'
import { InfoWithSubtext, ContentWithIcon, Row, Chip } from '@/components/ui/ui'

type BriefContentRowProps = {
    icon: string,
    chipClass: string,
    chipWidth?: string,
    name: string,
    subtext?: string
    children?: React.ReactNode,
}

export default function BriefContentRow({icon, chipClass, chipWidth = "95px", name, subtext = "", children}: BriefContentRowProps) {
    function renderBriefContentRow(icon: string, chipClass: string, chipWidth: string, name: string, subtext: string = "") {
        return (
            <ContentWithIcon icon={icon}>
                <InfoWithSubtext className="flex flex-col min-w-0" style={{width: 'auto'}} subText={subtext}>
                    <Chip className={chipClass} width={chipWidth}>{name}</Chip>
                    <span className="font-semibold truncate">{children}</span>
                </InfoWithSubtext>
            </ContentWithIcon>
        )
    }

    return (renderBriefContentRow(icon, chipClass, chipWidth, name, subtext))
}
