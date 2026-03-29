
export const bannerImages: BannerImage[] = [
    {
        src: "/images/outdoor-track/3.28.2026/410-sprint-lineup.jpg",
        objectPosition: "center 10%",
        objectFit: "cover",
        active: true
    }, {
        src: "/images/outdoor-track/3.28.2026/pro-truck.jpg",
        objectPosition: "center 80%",
        objectFit: "cover",
        active: true
    }, {
        src: "/images/outdoor-track/3.28.2026/side-by-side-truck.jpg",
        objectPosition: "center 65%",
        objectFit: "cover",
        active: true
    }, {
        src: "/images/outdoor-track/3.28.2026/360-sprint.jpg",
        objectPosition: "center 80%",
        objectFit: "cover",
        active: true
    }, {
        src: "/images/outdoor-track/3.28.2026/truck-rollover.jpg",
        objectPosition: "center 50%",
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
    }
]

export interface BannerImage {
    src: string;
    objectPosition: string;
    objectFit?: string | any;
    link?: string;
    active?: boolean;
}