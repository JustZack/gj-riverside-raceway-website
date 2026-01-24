
export const bannerImages: BannerImage[] = [
    {
        src: "/images/indoor-track/losi-nascar-lineup.jpg",
        objectPosition: "center 80%",
        objectFit: "cover",
        displayMode: "fill"
    }, {
        src: "/images/indoor-track/february-freeze-2026.PNG",
        objectPosition: "center 30%",
        objectFit: "contain",
        displayMode: "contain",
    }
]

export interface BannerImage {
    src: string;
    objectPosition: string;
    objectFit?: string | any;
    displayMode?: "fill" | "contain";
}