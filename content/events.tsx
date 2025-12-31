export const events: Record<string, Event> = {
    practice: {
        id: "practice",
        name: "Practice",
        icon: "fa-solid fa-road",
        chipClass: "bg-black/70 text-white",
        entry: 5,
    },
    weeknights: {
        id: "weeknights",
        name: "Weeknights",
        icon: "fa-solid fa-moon",
        chipClass: "bg-blue-900/70 text-white",
        entry: 20,
        additional: 10,
        qualifiers: 2,
        mains: 1,
        doorsOpen: "4:00pm",
        registrationClose: "6:00pm",
        racingStart: "6:30pm",
        
    },
    weekends: {
        id: "weekends",
        name: "Weekends",
        icon: "fa-solid fa-sun",
        chipClass: "bg-yellow-200/70 text-yellow-900",
        entry: 25,
        additional: 10,
        qualifiers: 3,
        mains: 1,
        doorsOpen: "9:30am",
        registrationClose: "10:30am",
        racingStart: "11:00am"
    }
}

export interface Event {
    id: string;
    name: string;
    entry: number;
    icon: string;
    chipClass: string;
    additional?: number;
    qualifiers?: number;
    mains?: number;
    doorsOpen?: string;
    registrationClose?: string;
    racingStart?: string;
}