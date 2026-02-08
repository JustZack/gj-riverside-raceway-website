
export const bannerImages: BannerImage[] = [
    {
        src: "/images/fliers/february-freeze-2026.PNG",
        objectPosition: "center 10%",
        objectFit: "contain",
        link: "/february-freeze"
    }, {
        src: "/images/indoor-track/losi-nascar-lineup.jpg",
        objectPosition: "center 80%",
        objectFit: "cover",
    }
]

export interface BannerImage {
    src: string;
    objectPosition: string;
    objectFit?: string | any;
    link?: string;
}