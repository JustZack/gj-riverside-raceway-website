'use client'
import { EventAward } from '@/content/content';

export default function RaceEventAwards({award}: {award: EventAward}) {
    function AwardValue({value}: {value: number}) {
        //Add extra space for single digit values for alignment
        return (
            <> 
                {value < 10 && (<span style={{ width: '0.5em' }}></span>)}
                <span style={{ marginLeft: '0.3em', whiteSpace: 'nowrap' }}>{value}</span>
            </>
        )
                    
    }
    return (
        <tr>
            <td style={{ padding: '0.1rem 0.25rem' }}>{award.name}</td>
            {award.placementAwards.map((award, i) => (
                <td key={i} style={{ padding: '0.1rem 0.25rem', textAlign: 'right', minWidth: '40px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
                        <span style={{ display: 'inline-flex', width: '1.2em', justifyContent: 'center' }}>
                            <i className="fa-solid fa-dollar-sign" style={{ color: 'green' }} />
                        </span>
                        <AwardValue value={award} />
                    </div>
                </td>
            ))}
        </tr>
    )
}
