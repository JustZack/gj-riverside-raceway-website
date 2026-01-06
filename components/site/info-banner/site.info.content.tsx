'use client'
import { ContentWithIcon } from '@/components/ui/ui'

type SiteInfoContentProps = {
    aIcon: string;
    a: React.JSX.Element | string;
    b?: React.JSX.Element | string;
    c?: React.JSX.Element | string;
    d?: React.JSX.Element | string;
}
export default function SiteInfoContent({aIcon, a, b, c, d}: SiteInfoContentProps) {

    return (
        <>
            <span className="font-bold text-xl">
                <ContentWithIcon icon={aIcon}>{a}</ContentWithIcon>
            </span>
            {b && (<span className="font-bold text-lg">{b}</span>)}
            {c && (<span className="text-md">{c}</span>)}
            {d && (<span className="text-sm">{d}</span>)}
        </>
    )
}