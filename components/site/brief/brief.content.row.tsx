'use client'
import { InfoWithSubtext, ContentWithIcon, Row, Chip } from '@/components/ui/ui'

type BriefContentRowProps = {
    icon: string,
    chipClass: string,
    name: string,
    mainText: string,
    subtext?: string
}

export default function BriefContentRow({icon, chipClass, name, mainText, subtext = ""}: BriefContentRowProps) {
    function renderBriefContentRow(icon: string, chipClass: string, name: string, mainText: string, subtext: string = "") {
        return (
            <ContentWithIcon icon={icon}>
                <InfoWithSubtext className="flex flex-col min-w-0" style={{width: 'auto'}} subText={subtext}>
                    <Chip className={chipClass} width="95px">{name}</Chip>
                    <span className="font-semibold truncate">{mainText}</span>
                </InfoWithSubtext>
            </ContentWithIcon>
        )
    }

    return (renderBriefContentRow(icon, chipClass, name, mainText, subtext))
}
