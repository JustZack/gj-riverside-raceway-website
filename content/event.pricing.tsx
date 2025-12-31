export const eventPricing: Record<string, EventPricing> = {
    practice: {
        id: "practice",
        name: "Practice",
        entry: 5,
    },
    weeknights: {
        id: "weeknights",
        name: "Weeknights",
        entry: 20,
        additional: 5
    },
    weekends: {
        id: "weekends",
        name: "Weekends",
        entry: 25,
        additional: 5
    }
}

export interface EventPricing {
    id: string;
    name: string;
    entry: number;
    additional?: number;
}