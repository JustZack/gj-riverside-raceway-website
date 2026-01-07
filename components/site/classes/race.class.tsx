'use client'

import React, { useRef, useEffect, useState } from 'react';
import { EventClass, EventClassRule } from '@/content/content';
import { Button, Card, ContentWithIcon } from '@/components/ui/ui';

let openRulesId: string | null = null;
export default function RaceClass({eventClass}: {eventClass: EventClass}) {
    // Use a custom event to coordinate which rule set is open globally
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
        if (openRulesId === eventClass.id) openRulesId = null;
        else openRulesId = eventClass.id;
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

    function ClassRuleSet(ruleSet: EventClassRule, idx: number) {
        if (ruleSet && ((ruleSet.rules && ruleSet.rules.length > 0) || ruleSet.rule)) {
            if (ruleSet.rule) {
                return (
                    <ContentWithIcon key={idx} icon={getIconFromType(ruleSet.type)}>
                        <span className="font-semibold capitalize">{ruleSet.type}:</span> {ruleSet.rule}
                    </ContentWithIcon>
                )
            } else if (ruleSet.rules) {
                return (
                    <ContentWithIcon key={idx} icon={getIconFromType(ruleSet.type)}>
                        <div className="mb-4">
                            <span className="font-semibold capitalize">{ruleSet.type}:</span>
                            <ul className="list-disc list-inside mt-1">
                                {ruleSet.rules!.map((r, idx) => (
                                    <li key={idx}>{r}</li>
                                ))}
                            </ul>
                        </div>
                    </ContentWithIcon>
                )
            } 
        } else {
            return (<i className="font-semibold capitalize">No rules defined for this class.</i>)
        }
    }

    return (
        <>
            <ContentWithIcon icon={eventClass.icon}>
                <div className="flex w-full justify-between items-center">
                    <span className='text-left'>{eventClass.name}</span>
                    <Button className={"text-right text-sm"} onClick={handleToggleRules} 
                        icon={isOpen ? 'fa-solid fa-close' : 'fa-regular fa-file-lines'} height={25}
                        backgroundColor='red' hoverBackgroundColor='white'
                        textColor='white' hoverTextColor='red'
                        borderColor='red' hoverBorderColor='red'>
                        {isOpen ? 'Close Rules' : 'Show Rules'}
                    </Button>
                </div>
            </ContentWithIcon>

            <div className={`transition-all duration-300 ease-in-out ${isOpen && eventClass.rules ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                {showContent && eventClass.rules && (
                    <Card shadow className="text-sm mx-auto">
                        {eventClass.rules.map((ruleSet, idx) => (
                            ClassRuleSet(ruleSet, idx)
                        ))}
                    </Card>
                )}
            </div>
        </>
    )
}
