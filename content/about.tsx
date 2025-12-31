export const about = {
    name: "GJ Riverside Raceway",
    phoneUrl: "tel:+19702432505",
    phone: "(970) 243-2305",
    address: "801 Kimball Ave, Grand Junction, CO 81501",
    websiteBy: "Zack Jones",
    getPhoneAnchorTag: () => {
        return (
            <a href={about.phoneUrl} className="text-blue-600 hover:underline">{about.phone}</a>
        )
    },
    getAddressAnchorTag: () => {
        return (
            <a href={`https://www.google.com/maps/place/${about.address}`} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">
                {about.address}
            </a>
        )
    }
}