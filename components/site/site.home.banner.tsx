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
        const randomIndex = Math.floor(Math.random() * bannerImages.length);
        return bannerImages[randomIndex];
    }

    let img: BannerImage = getRandomBannerImage();

    return (
        <Banner 
            style={{height: "20vw", maxHeight: "500px", minHeight: "100px"}}
            media={<img src={img.src} />}
            mediaStyle={{ objectPosition: img.objectPosition, objectFit: img.objectFit, width: "100%", height: "100%", }}>
        </Banner>
    )
}