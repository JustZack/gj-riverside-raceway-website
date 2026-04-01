export const facebook = {
    baseUrl: 'https://www.facebook.com/',
    groupUrl: `https://www.facebook.com/share/g/1bRsCDdtpa/`,
    groupName: 'Grand Valley RC Racing',
    checkMeContent: ():  React.JSX.Element => (
        <a href={facebook.groupUrl} target="_blank" rel="noopener noreferrer" className='text-[#1877F2]'>
            Check facebook for more info!
        </a>
    )
}