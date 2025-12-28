import Events from "@/lib/db/events";
import LiveTimeEvents from "@/lib/db/livetime";
const cheerio = require('cheerio');
import { DateTime } from "luxon";


export default async function ScrapeLiveTimeRCContentJob() {
    const LIVE_TIME_BASE_URL = "https://jjsraceway.liverc.com/"
    function getLivetimeUrl(path: string): string { return `${LIVE_TIME_BASE_URL}${path}` }

    function scrapeUrl(url: string): Promise<string> {
        return new Promise((resolve, reject) => {
            fetch(url).then(response => {
                if (!response.ok) {
                    reject(`Failed to fetch ${url}: ${response.statusText}`);
                }
                return response.text();
            }).then(data => resolve(data)).catch(error => reject(error));
        });
    }

    function scrapeLiveTimeUrl(path: string): Promise<string> {
        return scrapeUrl(getLivetimeUrl(path));
    }

    function parseHTML(html: string): cheerio.CheerioAPI {
        return cheerio.load(html);
    }

    async function upsertLiveTimeEvent(event: ScrapedLiveTimeEvent): Promise<void> {
        await LiveTimeEvents.upsert(event.event_id, {
            id: event.event_id,
            name: event.name,
            entries: event.entries,
            drivers: event.drivers,
            laps: event.laps,
            startedAt: new Date(event.date),
        });
    }

    async function upsertTrackEvent(event: ScrapedLiveTimeEvent): Promise<void> {
        await Events.upsertByLiveTimeId(event.event_id, {
            name: event.name,
            start: new Date(event.date),
            end: new Date(event.date),
        });
    }

    //Perform the scrape and upsert for events on livetime
    async function scrapeAndUpsertEvents(): Promise<void> {
        const events: ScrapedLiveTimeEvent[] = [];
        await scrapeLiveTimeUrl('events/').then(async (html) => {
            const $ = parseHTML(html);
            const events_table = $('table#events');
            const event_rows = events_table.find('tbody tr');
            event_rows.each((index: number, element: cheerio.Element) => {
                const event = new ScrapedLiveTimeEvent($(element));
                console.log(event.toString());
                events.push(event);
            });
            console.log(`Scraped ${events.length} events from LiveTimeRC`);

            //Upsert each event into the database
            for (const event of events) {
                await upsertLiveTimeEvent(event);
                await upsertTrackEvent(event);
            }
        });
    }

    await scrapeAndUpsertEvents();
}

class ScrapedLiveTimeEvent {
    event_id: number;
    name: string;
    date: string;
    entries: number;
    drivers: number;
    livetime_path: string;
    laps: number;

    constructor(row: cheerio.Cheerio) {
        const cols = row.find('td');
        const first = cols.eq(0);

        // The ID is in a url like this: /results/?p=view_event&id=488422
        const href = first.find('a').attr('href') || '';
        this.event_id = parseInt(href.split('&id=').pop() || '0', 10);
        this.name = first.text().trim();

        // the date is formatted like: <span class="hidden">2025-12-02 00:00:00</span>Dec 2, 2025
        const date_str = cols.eq(1).find('span').text().trim();

        // Convert MST to UTC and format as ISO 8601: "2024-07-15T18:00:00.000Z"
        // Use luxon for timezone handling in Node.js
        // npm install luxon
        const date_mst = DateTime.fromFormat(date_str, 'yyyy-MM-dd HH:mm:ss', { zone: 'America/Denver' });
        const date_utc = date_mst.setZone('utc');
        this.date = date_utc.toISO({ suppressMilliseconds: false, includeOffset: false });

        // These values are just numeric in the table
        this.entries = parseInt(cols.eq(2).text().trim(), 10);
        this.drivers = parseInt(cols.eq(3).text().trim(), 10);

        this.livetime_path = `/results/?p=view_event&id=${this.event_id}`;
        this.laps = 0;
    }

    toString(): string {
        return `ScrapedLiveTimeEvent { event_id: ${this.event_id}, name: ${this.name}, date: ${this.date}, entries: ${this.entries}, drivers: ${this.drivers}, livetime_path: ${this.livetime_path}, laps: ${this.laps} }`;
    }
}