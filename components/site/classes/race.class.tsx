'use client'

import React, { useRef, useEffect, useState } from 'react';
import { EventClass } from '@/content/content';
import { Button, ContentWithIcon } from '@/components/ui/ui';

let openRulesId: string | null = null;
export default function RaceClass({eventClass}: {eventClass: EventClass}) {
    // Use a custom event to coordinate which rule set is open globally
    const rulesButtonRef = useRef<HTMLSpanElement>(null);
    const isOpen = openRulesId === eventClass.id;
    const [showContent, setShowContent] = useState(isOpen);

    // Animate close: keep content mounted until transition ends
    useEffect(() => {
        if (isOpen) {
            setShowContent(true);
        } else if (showContent) {
            const timeout = setTimeout(() => setShowContent(false), 300); // match duration-300
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    function handleToggleRules() {
        if (openRulesId === eventClass.id) {
            openRulesId = null;
        } else {
            openRulesId = eventClass.id;
        }
        window.dispatchEvent(new CustomEvent('rules-toggle'));
    }

    // Listen for global rules-toggle events to force re-render
    const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
    React.useEffect(() => {
        function onToggle() { forceUpdate(); }
        window.addEventListener('rules-toggle', onToggle);
        return () => window.removeEventListener('rules-toggle', onToggle);
    }, []);

    function getIconFromType(type: string): string {
        switch (type) {
            case 'chassis': return 'fa-solid fa-cube';
            case 'electronics': return 'fa-solid fa-bolt';
            case 'gearing': return 'fa-solid fa-cogs';
            case 'suspension': return 'fa-solid fa-arrows-up-down-left-right';
            case 'differential': return 'fa-solid fa-gears';
            case 'heat-sink': return 'fa-solid fa-temperature-high';
            case 'tires': return 'fa-regular fa-circle';
            case 'bodies': return 'fa-solid fa-car-side';
            case 'battery': return 'fa-solid fa-battery-full';
            case 'servo-horn': return 'fa-solid fa-gear';
            case 'bearing': return 'fa-solid fa-circle-notch';
            default: return 'fa-solid fa-info-circle';
        }
    }

    function getRulesButtonIcon(): string {
        return isOpen ? 'fa-solid fa-close' : 'fa-regular fa-file-lines';
    }

    function getRulesButtonText(): string {
        return isOpen ? 'Hide Rules' : 'View Rules';
    }

    return (
        <>
            <ContentWithIcon icon={eventClass.icon}>
                <div className="flex w-full justify-between items-center">
                    <span className='text-left'>{eventClass.name}</span>
                    <Button className={"text-right text-sm"} onClick={handleToggleRules} 
                        icon={getRulesButtonIcon()} height={25}
                        backgroundColor='red' hoverBackgroundColor='white'
                        textColor='white' hoverTextColor='red'
                        borderColor='red' hoverBorderColor='red'>
                        {getRulesButtonText()}
                    </Button>
                </div>
            </ContentWithIcon>

            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen && eventClass.rules ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                {showContent && eventClass.rules && (
                    <div className="bg-white border border-gray-200 rounded shadow p-4 max-w-[96vw] min-w-[16rem] text-sm mx-auto">
                        {false && <div className="font-bold mb-2 text-left">Rules</div>}
                        {eventClass.rules.map((rule, idx) => (
                            <ContentWithIcon key={idx} icon={getIconFromType(rule.type)}>
                                <span className="font-semibold capitalize">{rule.type}:</span> {rule.description}
                            </ContentWithIcon>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}
