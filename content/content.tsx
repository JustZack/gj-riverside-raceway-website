import { header } from '@/content/header'
import { footer } from '@/content/footer'
import { socials } from '@/content/socials'
import { navigation } from '@/content/navigation'
import { rules } from '@/content/rules'
import { facebook } from '@/content/facebook'
import { youtube } from '@/content/youtube'
import { livetime } from '@/content/livetime'
import { about } from '@/content/about';
import { events, Event } from '@/content/events';
import { products, Product } from '@/content/products';
import { eventClasses, EventClass } from './event.classes'
import { bannerImages, BannerImage } from './banner.images'

export { 
    header, footer, 
    socials, 
    navigation, 
    rules, 
    facebook, youtube, livetime, 
    about, 
    events,
    products,
    eventClasses,
    bannerImages
}

export type { Event, Product, EventClass, BannerImage }