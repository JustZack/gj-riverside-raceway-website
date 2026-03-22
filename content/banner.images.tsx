
export const bannerImages: BannerImage[] = [
    {
        src: "/images/indoor-track/dave-john-hackfab.jpg",
        objectPosition: "center 55%",
        objectFit: "cover",
        active: true
    }, {
        src: "/images/indoor-track/john-maddox-zack-hackfab.jpg",
        objectPosition: "center 82%",
        objectFit: "cover",
        active: true
    }, {
        src: "/images/indoor-track/zack-eric-rob-nascar.jpg",
        objectPosition: "center 20%",
        objectFit: "cover",
        active: true
    }, {
        src: "/images/indoor-track/losi-nascar-lineup.jpg",
        objectPosition: "center 80%",
        objectFit: "cover",
        active: true
    }, {
        src: "/images/fliers/february-freeze-2026.PNG",
        objectPosition: "center 10%",
        objectFit: "contain",
        link: "/february-freeze",
        active: false
    }
]

export interface BannerImage {
    src: string;
    objectPosition: string;
    objectFit?: string | any;
    link?: string;
    active?: boolean;
}