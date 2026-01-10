export const eventAwards: EventAward[] = [
    {
        id: "16To20Entries",
        name: "16 - 20",
        icon: "fa-solid fa-gem",
        chipClass: "bg-blue-600 text-white",
        placementAwards: [40, 20, 10]
    }, {
        id: "11To15Entries",
        name: "11 - 15",
        icon: "fa-solid fa-crown",
        chipClass: "bg-green-600 text-white",
        placementAwards: [30, 15, 8]
    }, {
        id: "6To10Entries",
        name: "6 - 10",
        icon: "fa-solid fa-medal",
        chipClass: "bg-yellow-500 text-white",
        placementAwards: [20, 10, 5]
    }, {
        id: "3To5Entries",
        name: "3 - 5",
        icon: "fa-solid fa-trophy",
        chipClass: "bg-gray-400 text-white",
        placementAwards: [20, 10, 5]
    }
]

export interface EventAward {
    id: string;
    name: string;
    icon: string;
    chipClass: string;
    placementAwards: number[];
}