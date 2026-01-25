
export const bannerImages: BannerImage[] = [
    {
        src: "/images/fliers/february-freeze-2026.PNG",
        objectPosition: "center 10%",
        objectFit: "contain",
        displayMode: "contain",
    }, {
        src: "/images/indoor-track/losi-nascar-lineup.jpg",
        objectPosition: "center 80%",
        objectFit: "cover",
        displayMode: "fill"
    }
]

export interface BannerImage {
    src: string;
    objectPosition: string;
    objectFit?: string | any;
    displayMode?: "fill" | "contain";
}