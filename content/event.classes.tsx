export const eventClasses: Record<string, EventClass> = {
    losiNascar: {
        id: "losiNascar",
        name: "Losi NASCAR",
        icon: "fa-solid fa-car-side",
        chipClass: "bg-red-600 text-white",
    },
    streetStock: {
        id: "streetStock",
        name: "Street Stock",
        icon: "fa-solid fa-car",
        chipClass: "bg-blue-600 text-white"
    },
    lateModelBuggy: {
        id: "lateModelBuggy",
        name: "Late Model Buggy",
        icon: "fa-solid fa-car",
        chipClass: "bg-green-600 text-white"
    },
    lateModelHackfab: {
        id: "lateModelHackfab",
        name: "Late Model Hackfab",
        icon: "fa-solid fa-car",
        chipClass: "bg-yellow-600 text-white"
    },
    winglessSprint: {
        id: "winglessSprint",
        name: "Wingless Sprint",
        icon: "fa-solid fa-rocket",
        chipClass: "bg-orange-600 text-white"
    },
    sprint410: {
        id: "sprint410",
        name: "410 Sprint",
        icon: "fa-solid fa-rocket",
        chipClass: "bg-purple-600 text-white",
        hidden: true,
    },
    sprint360: {
        id: "sprint360",
        name: "360 Sprint",
        icon: "fa-solid fa-rocket",
        chipClass: "bg-pink-600 text-white",
        hidden: true,
    }

}

export interface EventClass {
    id: string;
    name: string;
    icon: string;
    chipClass: string;
    image?: string;
    rules?: string[];
    hidden?: boolean;
}