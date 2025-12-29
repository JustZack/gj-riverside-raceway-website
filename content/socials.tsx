import { facebook } from '@/content/facebook'
import { youtube } from '@/content/youtube'
import { livetime } from '@/content/livetime'

export const socials = [
    {
        name: "Facebook",
        url: facebook.groupUrl,
        urlText: "Visit our Facebook Page",
        hoverTextColor: "#ffffff",
        primaryColor: "#3b5998",
        hoverPrimaryColor: "rgba(255, 255, 255, 0.1)",
        backgroundColor: "#000000",
        imageSrc: "/images/facebook.png",
        buttonIcon: "fa-brands fa-facebook fa-xl",
        buttonText: facebook.groupName,
        description: "Join the conversation and stay updated with the latest news!",
        backgroundImage: "/images/gv-rc-oval.jpg",
    }, {
        name: "Youtube",
        url: youtube.getChannelLink(),
        urlText: "Visit our Youtube Channel",
        primaryColor: "#ff0000",
        backgroundColor: "#000000",
        imageSrc: "/images/youtube-white-text-logo.png",
        buttonIcon: "fa-brands fa-youtube fa-xl",
        buttonText: youtube.channelHandle,
        description: "See live & recorded racing action on our Youtube channel!",
        backgroundImage: "/images/youtube-card-bg.png",
    }, {
        name: "LiveTime RC",
        url: livetime.baseUrl,
        urlText: "Visit our LiveTime RC Page",
        primaryColor: "#ff0000",
        backgroundColor: "#000000",
        imageSrc: "/images/livetimerc.png",
        buttonIcon: "fa-solid fa-clock fa-xl",
        buttonText: "Visit LiveTime RC",
        description: "See live & recorded racing action on our LiveTime RC page!",
        backgroundImage: "/images/jjs-raceway.png",
    }
]