import Logger from "@/lib/utils/logger";
import { parse, HTMLElement } from 'node-html-parser';

export class ScraperUtils {
    static logger: Logger = new Logger('ScraperUtils');

    static scrape(url: string): Promise<string> {
        return new Promise((resolve, reject) => {
            fetch(url).then(response => {
                if (!response.ok) {
                    let msg = `Failed to fetch ${url}: ${response.statusText}`;
                    ScraperUtils.logger.warn(msg); reject(msg);
                } else {
                    ScraperUtils.logger.info(`Successfully fetched ${url}`);
                }
                return response.text();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
        });
    }

    static scrapeAsHTML(url: string): Promise<HTMLElement> {
        return new Promise((resolve, reject) => {
            ScraperUtils.scrape(url).then(html => {
                const root = parse(html);
                resolve(root);
            }).catch(error => reject(error));
        });
    }
}