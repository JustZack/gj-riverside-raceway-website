'use client'
import { Row } from '@/components/ui/ui'


type BriefContentHeaderProps = {
    icon: string,
    children?: React.ReactNode,
}
export default function BriefContentHeader({icon, children}: BriefContentHeaderProps) {
    return (
        <Row className="flex items-center justify-between gap-2 w-full" gap={1}>
            <h1 className="text-2xl font-bold text-center underline">
                <i className={`${icon} mr-4`}></i>{children}
            </h1>
        </Row>
    )
}
