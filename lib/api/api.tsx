import HTTP from "@/lib/api/http";
import Logger from "@/lib/utils/logger";

export default class API {
    static logger: Logger = new Logger('API');

    static BASE_URL = '/api/'

    static route(route: string) {
        return `${API.BASE_URL}${route}`
    }

    static async getSchedule() {
        const route = API.route('schedule')
        API.logger.info(`Fetching schedule from API... ${route}`);
        return await HTTP.GET(route)
    }
}