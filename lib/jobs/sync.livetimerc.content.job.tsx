import Events from "@/lib/db/events";
import LiveTimeEvents from "@/lib/db/livetime";
import { Prisma }  from "@prisma/client";
import Logger from "@/lib/utils/logger";
import { livetime } from "@/content/content";
import { parse, HTMLElement } from 'node-html-parser';
import { ScrapedLiveTimeEvent } from "@/lib/jobs/models/scraped.livetime.event";

export default async function SyncLiveTimeContentJob() {
    const logger: Logger = new Logger('SyncLiveTimeContentJob');

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
        return scrapeUrl(livetime.getLink(path));
    }

    function parseHTML(html: string): HTMLElement {
        return parse(html);
    }

    async function upsertTrackEvent(event: ScrapedLiveTimeEvent): Promise<void> {
        await Events.upsertByLiveTimeId(event.event_id, event.toTrackEvent());
    }

    async function upsertLiveTimeEvent(event: ScrapedLiveTimeEvent): Promise<void> {
        await LiveTimeEvents.upsert(event.event_id, event.toLiveTimeEvent());
    }

    //Extracts events from the livetime page
    function extractEventsFromPage(html: string): ScrapedLiveTimeEvent[] {
        logger.info(`Scraping LiveTimeRC events page...`);
        let events: ScrapedLiveTimeEvent[] = [];
        const root = parseHTML(html);
        const events_table = root.querySelector('table#events');
        if (!events_table) {
            logger.info('No events table found.');
            return events;
        }
        const event_rows = events_table.querySelectorAll('tbody tr');
        event_rows.forEach((row) => {
            const event = new ScrapedLiveTimeEvent(row);
            logger.info(`Scraped ${event.name} (LiveTime ID: ${event.event_id})`);
            events.push(event);
        });
        logger.info(`Scraped ${events.length} events from ${livetime.baseUrl}`);
        return events;
    }

    //Upserts all scraped events into the database
    async function upsertEvents(events: ScrapedLiveTimeEvent[]): Promise<void> {
        logger.info(`Upserting events into database...`);
        for (const event of events) {
            await upsertLiveTimeEvent(event);
            await upsertTrackEvent(event);
            logger.info(`Upserted ${event.name} (LiveTime ID: ${event.event_id})`);
        }
        logger.info(`Upserted ${events.length} events into database`);
    }

    //Perform the scrape and upsert for events on livetime
    async function scrapeAndUpsertEvents(): Promise<void> {
        await scrapeLiveTimeUrl(livetime.eventsPath).then(async (html) => {
            //1. Extract events from the html
            const events: ScrapedLiveTimeEvent[] = extractEventsFromPage(html);
            //2. Upsert each event into the relevant tables
            await upsertEvents(events);
        });
    }

    await scrapeAndUpsertEvents();
}