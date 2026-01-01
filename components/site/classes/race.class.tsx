'use client'
import { EventClass } from '@/content/content';
import { ContentWithIcon } from '@/components/ui/ui';

export default function RaceClass({eventClass}: {eventClass: EventClass}) {

    function openRulesDialog(eventClass: EventClass) {
        window.dispatchEvent(new CustomEvent('open-rules-dialog', {detail: {eventClass: eventClass}}));
    }

    return (
        <ContentWithIcon icon="fa-regular fa-file-lines">
            {eventClass.name} - <span className="cursor-pointer text-blue-500 hover:underline" onClick={() => openRulesDialog(eventClass)}>View Rules</span>
        </ContentWithIcon>
    )
}
