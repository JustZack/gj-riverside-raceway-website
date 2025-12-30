import { about } from '@/content/about';

export const footer = [
    {
        items: [
            { icon: 'fas fa-map-marker-alt', text: about.address, link: `https://www.google.com/maps/place/${about.address}` }, 
            { icon: 'fas fa-phone', text: about.phone, link: about.phoneUrl }
        ]
    }, {
        items: [
            {
                icon: 'fas fa-copyright',
                text: `${new Date().getFullYear()} ${about.name}. All rights reserved.`
            }, {
                icon: 'fas fa-desktop',
                text: `Website by ${about.websiteBy}`
            }
        ]
    }
]