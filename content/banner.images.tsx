export const bannerImages: BannerImage[] = [
    {
        src: "/images/indoor-track/losi-nascar-lineup.jpg",
        objectPosition: "center 80%",
        objectFit: "cover"
    }
]

export interface BannerImage {
    src: string;
    objectPosition: string;
    objectFit?: string | any;
}