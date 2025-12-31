import { about } from '@/content/about';

export const footer = [
    {
        items: [
            { icon: 'fas fa-map-marker-alt', content: about.getAddressAnchorTag() }, 
            { icon: 'fas fa-phone', content: about.getPhoneAnchorTag() }
        ]
    }, {
        items: [
            { icon: 'fas fa-copyright', content: `${new Date().getFullYear()} ${about.name}` }, 
            { icon: 'fas fa-desktop', content: `Website by ${about.websiteBy}` }
        ]
    }
]