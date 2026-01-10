'use client'
import { eventAwards } from '@/content/content';
import { Column, ContentWithIcon, InfoWithSubtext } from '@/components/ui/ui'
import BriefContentHeader from '@/components/site/brief/brief.content.header';
import RaceEventAwards from './race.award';

export default function RaceAwards({className, style, width = "350px"}: {className?: string, style?: React.CSSProperties, width?: string}) {
    // Find the maximum number of placement awards for column alignment
    const maxPlacements = Math.max(...eventAwards.map(a => a.placementAwards.length));
    
    function RaceAwardHeaderColumn(title: string, icon: string, color: string) {
        return (
            <th style={{ padding: '0.1rem 0.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end', width: '100%' }}>
                    <i className={icon} style={{ color, marginRight: '0.2em' }} />
                    <span style={{ marginLeft: 0 }}>{title}</span>
                </div>
            </th>
        );
    }

    function RaceAwardsHeaderRow() {
        return (
            <thead>
                <tr>
                    <th style={{ textAlign: 'left' }}>Entries</th>
                    {RaceAwardHeaderColumn("1st", "fa-solid fa-crown", "blue")}
                    {RaceAwardHeaderColumn("2nd", "fa-solid fa-award", "red")}
                    {RaceAwardHeaderColumn("3rd", "fa-solid fa-medal", "black")}
                </tr>
            </thead>
        )
    }
    return (
        <Column className={className} style={{ maxWidth: width, width, ...style}}>
            <BriefContentHeader icon="fa-solid fa-award">Awards</BriefContentHeader>
            <table style={{ width: '100%' }}>
                <RaceAwardsHeaderRow/>
                <tbody>
                    {eventAwards.map((award, idx) => (
                        <RaceEventAwards award={award}/>
                    ))}
                </tbody>
            </table>
            <ContentWithIcon icon="fa-solid fa-info-circle">
                <InfoWithSubtext subText="Smaller classes may race without awards.">
                    <span className='font-semibold truncate'>Three or more entries are required for awards.</span>
                </InfoWithSubtext>
            </ContentWithIcon>
        </Column>
    )
}
