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

    function onBannerClick(img: BannerImage) {
        if (img.link) window.location.href = img.link;
    }

    //The standard banner image style, based on the image's properties
    function bannerStyle(img: BannerImage): React.CSSProperties {
        return {
            width: "100%",
            height: "100%",
            objectFit: img.objectFit,
            objectPosition: img.objectPosition,
            display: "block",
            cursor: img.link ? "pointer" : "default",
            position: "relative",
            zIndex: 1
        }
    }

    //Only used for blurred/contain images
    function blurredBannerStyle(img: BannerImage): React.CSSProperties {
        return {
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
        }
    }

    //Standard banner image display, with click handling if a link is provided
    function BannerImageDisplay({ img }: { img: BannerImage }) {
        return (
            <img src={img.src} style={bannerStyle(img)} 
                onClick={() => onBannerClick(img)}
            />
        );
    }


    function BannerImageWithOptionalBlur({ img }: { img: BannerImage }, key: string) {
        const isContain = img.objectFit === "contain";
        if (isContain) {
            return (
                <div style={{ position: "relative", width: "100%", height: "100%" }}>
                    {/* Blurred background */}
                    <img src={img.src} style={blurredBannerStyle(img)} />
                    {/* Main image, clickable if link exists */}
                    <BannerImageDisplay img={img} />
                </div>
            );
        } else {
            return <BannerImageDisplay img={img} />;
        }
    }

    return (
        <Banner
            style={{ height: "68vw", maxHeight: "600px", minHeight: "100px", position: "relative", overflow: "hidden" }}
            media={
                <Carousel interval={15000} transitionDuration={1500}>
                    {bannerImages.map((img, i) => 
                        <BannerImageWithOptionalBlur img={img} key={String(i)} />
                    )}
                </Carousel>
            }
            mediaStyle={{ width: "100%", height: "100%" }}
        >
        </Banner>
    )
}