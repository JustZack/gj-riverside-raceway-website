export const livetime = {
    baseUrl: 'https://jjsraceway.liverc.com/',
    eventsPath: 'events/',
    resultsPath: 'results/?p=view_event&id=',
    getLink: (path: string) => `${livetime.baseUrl}${path}`,
    getResultLink: (eventId: number) => `${livetime.baseUrl}${livetime.resultsPath}${eventId}`,
}