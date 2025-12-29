'use client'

import { Row, Column } from '@/components/ui/ui'
import { rules } from '@/content/content'

export default function RacingRules() {
    return (
        <Row fullWidth shadowTop justify="center" align="center" className="py-8" style={{ backgroundColor: "#ffffff" }}>
            {rules.map((rule, index) => (
                <Row key={index}>
                    <span>{index + 1}:</span>
                    &nbsp;
                    <span>{rule}</span>
                </Row>
            ))}
        </Row>
    )
}