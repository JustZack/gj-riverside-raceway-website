export const eventClasses: Record<string, EventClass> = {
    losiNascar: {
        id: "losiNascar",
        name: "Losi NASCAR",
        icon: "fa-solid fa-car-side",
        chipClass: "bg-red-600 text-white",
        rules: [ 
            {
                type: "chassis",
                description: "Chassis must be in stock configuration. Battery must be in stock location. Switch may be moved. All components on car must be uised and un-modified including wiring, plugs, bodies, etc. No lightening of any parts."
            }, {
                type: "electronics",
                description: "Stock electronics only. Including radio, servo, speed control & receiver."
            }, {
                type: "gearing",
                description: "Stock gears only (59/19)"
            }, {
                type: "suspension",
                description: "Any shock oil may be used. Shocks move freely (I.E. not locked). Must use stock springs."
            }, {
                type: "differential",
                description: "Any differential fluid may be used. Must use stock differential, Part #ARA31177V2. Differential must move freely (I.E. not locked). No spools or locked differentials."
            }, {
                type: "heat-sink",
                description: "Motor heat sink is allowed for longevity. Must use Part #LOS-1920."
            }, {
                type: "tires",
                description: "Soft or medium compound rubber slicks allowed. Rain tires, dirt tires, or foam tires are not allowed. May glue of tape the right front tire. Traction compound is allowed per track compound rules."
            }, {
                type: "bodies",
                description: "Any losi brand NASCAR car or truck body manufactured for the loLosi NASCAR chassis may be used. Bodies may not be modified or trimmed. Bodies must be realistically painted, no clear bodies."
            }, {
                type: "battery",
                description: "Stock 1400mah 30c battery charged to 8.44v max. Must be charged with Specktrum Smart charger or equivalent. Must have stock plug and wire length."
            }, {
                type: "servo-horn",
                description: "Fixed, solid, or glued servo horn is allowed."
            }, {
                type: "bearing",
                description: "Stock bearings preferred. Will not disqualify for ceramic bearings to due difficulting of teching."
            }, {
                type: "disclaimer",
                description: "Rules are subject to change at any time to cover grey areas of part availabilities."
            }
        ]
    },
    streetStock: {
        id: "streetStock",
        name: "Street Stock",
        icon: "fa-solid fa-car",
        chipClass: "bg-blue-600 text-white",
        rules: [
            {
                type: "chassis",
                description: "Must be a buggy chassis. No trucks or truggies allowed. Offset chassis allowed."
            }, {
                type: "electronics",
                description: "13.5 or equivalent motor only. "
            }, {
                type: "disclaimer",
                description: "Rules are subject to change at any time to cover grey areas of part availabilities."
            }
        ]
    },
    lateModelBuggy: {
        id: "lateModelBuggy",
        name: "Late Model Buggy",
        icon: "fa-solid fa-car",
        chipClass: "bg-green-600 text-white",
        rules: [
            {
                type: "disclaimer",
                description: "Rules are subject to change at any time to cover grey areas of part availabilities."
            }
        ]
    },
    lateModelHackfab: {
        id: "lateModelHackfab",
        name: "Late Model Hackfab",
        icon: "fa-solid fa-car",
        chipClass: "bg-yellow-600 text-white",
        rules: [
            {
                type: "disclaimer",
                description: "Rules are subject to change at any time to cover grey areas of part availabilities."
            }
        ]
    },
    winglessSprint: {
        id: "winglessSprint",
        name: "Wingless Sprint",
        icon: "fa-solid fa-rocket",
        chipClass: "bg-orange-600 text-white",
        rules: [
            {
                type: "disclaimer",
                description: "Rules are subject to change at any time to cover grey areas of part availabilities."
            }
        ]
    },
    sprint410: {
        id: "sprint410",
        name: "410 Sprint",
        icon: "fa-solid fa-rocket",
        chipClass: "bg-purple-600 text-white",
        rules: [
            {
                type: "disclaimer",
                description: "Rules are subject to change at any time to cover grey areas of part availabilities."
            }
        ],
        hidden: true,
    },
    sprint360: {
        id: "sprint360",
        name: "360 Sprint",
        icon: "fa-solid fa-rocket",
        chipClass: "bg-pink-600 text-white",
        rules: [
            {
                type: "disclaimer",
                description: "Rules are subject to change at any time to cover grey areas of part availabilities."
            }
        ],
        hidden: true,
    }

}

export interface EventClass {
    id: string;
    name: string;
    rules?: EventClassRule[];
    icon: string;
    chipClass: string;
    image?: string;
    hidden?: boolean;
}

export interface EventClassRule {
    type: string;
    description: string;
}