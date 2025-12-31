export const products: Record<string, Product> = {
    transponder: {
        name: "Transponders",
        icon: "fa-solid fa-hourglass",
        chipClass: "bg-red-500/70 text-white",
        brief: "Required for racing, available for purchase.",
        description: "",
        price: 40.00,
    }
}

export interface Product {
    name: string;
    icon: string;
    chipClass: string;
    brief: string;
    description: string;
    price: number;
}