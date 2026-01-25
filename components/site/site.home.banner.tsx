'use client'

import { Banner } from '@/components/ui/ui'
import { Carousel } from '@/components/ui/carousel'
import { bannerImages, BannerImage } from '@/content/content';

export default function SiteHomeBanner() {
    const sideContent = {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: 'rgba(0, 0, 0, 1)',
        textColor: 'white'
    }

    function getRandomBannerImage(): BannerImage {
        //const randomIndex = Math.floor(Math.random() * bannerImages.length);
        //return bannerImages[randomIndex];
        return bannerImages[1];
    }


    function BlurredBackgroundBanner({ img }: { img: BannerImage }) {
        return (
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
                {/* Blurred background */}
                <img
                    src={img.src}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: img.objectPosition,
                        filter: "blur(2px) brightness(0.6)",
                        zIndex: 0,
                        pointerEvents: "none",
                        userSelect: "none"
                    }}
                    aria-hidden="true"
                />
                {/* Main image, always fully visible, downloadable on hold click */}
                <a href={img.src} download style={{ position: "relative", display: "block", width: "100%", height: "100%", zIndex: 1 }}>
                    <img
                        src={img.src}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            objectPosition: img.objectPosition,
                            display: "block"
                        }}
                    />
                </a>
            </div>
        );
    }

    function FullWidthBackgroundBanner({ img }: { img: BannerImage }) {
        return (
            <a href={img.src} download style={{ display: "block", width: "100%", height: "100%" }}>
                <img
                    src={img.src}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: img.objectPosition,
                        display: "block"
                    }}
                />
            </a>
        );
    }

    // Render a banner image with the correct style
    function renderBanner(img: BannerImage, key: string) {
        return img.displayMode === "contain"
            ? <BlurredBackgroundBanner img={img} key={key} />
            : <FullWidthBackgroundBanner img={img} key={key} />;
    }

    let img: BannerImage = getRandomBannerImage();

    return (
        <Banner
            style={{ height: "68vw", maxHeight: "600px", minHeight: "100px", position: "relative", overflow: "hidden" }}
            media={
                <Carousel interval={15000} transitionDuration={1500}>
                    {bannerImages.map((img, i) => renderBanner(img, String(i)))}
                </Carousel>
            }
            mediaStyle={{ width: "100%", height: "100%" }}
        >
        </Banner>
    )
}