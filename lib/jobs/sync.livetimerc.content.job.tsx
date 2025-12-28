import Events from "@/lib/db/events";
import LiveTimeEvents from "@/lib/db/livetime";
import * as cheerio from 'cheerio';
import { DateTime } from "luxon";
import { Prisma }  from "@prisma/client";


export default async function SyncLiveTimeContentJob() {
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

    function parseHTML(html: string): cheerio.Root {
        return cheerio.load(html);
    }

    async function upsertTrackEvent(event: ScrapedLiveTimeEvent): Promise<void> {
        await Events.upsertByLiveTimeId(event.event_id, event.toTrackEvent());
    }

    async function upsertLiveTimeEvent(event: ScrapedLiveTimeEvent): Promise<void> {
        await LiveTimeEvents.upsert(event.event_id, event.toLiveTimeEvent());
    }

    //Extracts events from the livetime page
    function extractEventsFromPage(html: string): ScrapedLiveTimeEvent[] {
        console.log(`Scraping LiveTimeRC events page...`);
        let events: ScrapedLiveTimeEvent[] = [];
        const $ = parseHTML(html);
        const events_table = $('table#events');
        const event_rows = events_table.find('tbody tr');
        event_rows.each((index: number, element: cheerio.Element) => {
            const event = new ScrapedLiveTimeEvent($(element));
            console.log(`Scraped ${event.name} (LiveTime ID: ${event.event_id})`);
            events.push(event);
        });
        console.log(`Scraped ${events.length} events from ${LIVE_TIME_BASE_URL}`);
        return events;
    }

    //Upserts all scraped events into the database
    async function upsertEvents(events: ScrapedLiveTimeEvent[]): Promise<void> {
        console.log(`Upserting events into database...`);
        for (const event of events) {
            await upsertLiveTimeEvent(event);
            await upsertTrackEvent(event);
            console.log(`Upserted ${event.name} (LiveTime ID: ${event.event_id})`);
        }
        console.log(`Upserted ${events.length} events into database`);
    }

    //Perform the scrape and upsert for events on livetime
    async function scrapeAndUpsertEvents(): Promise<void> {
        await scrapeLiveTimeUrl('events/').then(async (html) => {
            //1. Extract events from the html
            const events: ScrapedLiveTimeEvent[] = extractEventsFromPage(html);
            //2. Upsert each event into the relevant tables
            await upsertEvents(events);
        });
    }

    let startedAt = Date.now();
    console.log(`Starting SyncLiveTimeContentJob...`);
    await scrapeAndUpsertEvents();
    let endedAt = Date.now();
    console.log(`Completed SyncLiveTimeContentJob in ${(endedAt - startedAt) / 1000} seconds.`);
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
        const date_mst = DateTime.fromFormat(date_str, 'yyyy-MM-dd HH:mm:ss', { zone: 'America/Denver' });
        const date_utc = date_mst.setZone('utc');
        this.date = date_utc.toISO({ suppressMilliseconds: false, includeOffset: false });

        // These values are just numeric in the table
        this.entries = parseInt(cols.eq(2).text().trim(), 10);
        this.drivers = parseInt(cols.eq(3).text().trim(), 10);

        this.livetime_path = `/results/?p=view_event&id=${this.event_id}`;
        this.laps = 0;
    }

    toTrackEvent(): Prisma.TrackEventCreateInput {
        return {
            name: this.name,
            start: new Date(this.date),
            end: new Date(this.date),
            livetimeID: this.event_id,
        }
    }

    toLiveTimeEvent(): Prisma.LiveTimeEventCreateInput {
        return {
            id: this.event_id,
            name: this.name,
            entries: this.entries,
            drivers: this.drivers,
            laps: this.laps,
            startedAt: new Date(this.date),
            trackEvent: undefined
        }
    }

    toString(): string {
        return `ScrapedLiveTimeEvent { event_id: ${this.event_id}, name: ${this.name}, date: ${this.date}, entries: ${this.entries}, drivers: ${this.drivers}, livetime_path: ${this.livetime_path}, laps: ${this.laps} }`;
    }
}