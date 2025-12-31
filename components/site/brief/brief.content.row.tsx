'use client'
import { InfoWithSubtext, Row, Chip } from '@/components/ui/ui'

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
            <Row className="flex items-center justify-between gap-2 w-full" gap={1}>
                <span className="flex items-center justify-center w-6 h-6"><i className={icon}/></span>
                <InfoWithSubtext className="flex flex-col min-w-0" style={{width: 'auto'}} subText={subtext}>
                    <Chip className={chipClass} width="95px">{name}</Chip>
                    <span className="font-semibold truncate">{mainText}</span>
                </InfoWithSubtext>
            </Row>
        )
    }

    return (renderBriefContentRow(icon, chipClass, name, mainText, subtext))
}
