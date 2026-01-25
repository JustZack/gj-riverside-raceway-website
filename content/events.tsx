export const events: Record<string, Event> = {
    practice: {
        id: "practice",
        name: "Practice",
        pluralizedName: "Practicing",
        icon: "fa-solid fa-road",
        chipClass: "bg-black/70 text-white",
        entry: 5,
    },
    tuesday: {
        id: "tuesday",
        name: "Tuesday",
        pluralizedName: "Tuesdays",
        icon: "fa-solid fa-moon",
        chipClass: "bg-blue-900/70 text-white",
        entry: 20,
        additional: 10,
        qualifiers: 2,
        mains: 1,
        doorsOpen: "16:00",
        registrationClose: "18:00",
        racingStart: "18:30",
        
    },
    saturday: {
        id: "saturday",
        name: "Saturday",
        pluralizedName: "Saturdays",
        icon: "fa-solid fa-sun",
        chipClass: "bg-yellow-200/70 text-black",
        entry: 25,
        additional: 10,
        qualifiers: 3,
        mains: 1,
        doorsOpen: "09:30",
        registrationClose: "10:30",
        racingStart: "11:00"
    },
    sunday: {
        id: "saturday",
        name: "Saturday",
        pluralizedName: "Saturdays",
        icon: "fa-solid fa-sun",
        chipClass: "bg-yellow-200/70 text-black",
        entry: 25,
        additional: 10,
        qualifiers: 3,
        mains: 1,
        doorsOpen: "09:30",
        registrationClose: "10:30",
        racingStart: "11:00"
    }
}

export interface Event {
    id: string;
    name: string;
    pluralizedName: string; 
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