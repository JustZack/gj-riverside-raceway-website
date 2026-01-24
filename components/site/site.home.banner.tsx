'use client'

import { Banner } from '@/components/ui/ui'
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
                        filter: "blur(16px) brightness(0.7)",
                        zIndex: 0,
                        pointerEvents: "none",
                        userSelect: "none"
                    }}
                    aria-hidden="true"
                />
                {/* Main image, always fully visible */}
                <img
                    src={img.src}
                    style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        objectPosition: img.objectPosition,
                        zIndex: 1
                    }}
                />
            </div>
        );
    }

    function FullWidthBackgroundBanner({ img }: { img: BannerImage }) {
        return (
            <img
                src={img.src}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: img.objectPosition
                }}
            />
        );
    }

    let img: BannerImage = getRandomBannerImage();

    return (
        <Banner
            style={{ height: "68vw", maxHeight: "400px", minHeight: "100px", position: "relative", overflow: "hidden" }}
            media={
                img.displayMode === "contain"
                    ? <BlurredBackgroundBanner img={img} />
                    : <FullWidthBackgroundBanner img={img} />
            }
            mediaStyle={{ width: "100%", height: "100%" }}
        >
        </Banner>
    )
}