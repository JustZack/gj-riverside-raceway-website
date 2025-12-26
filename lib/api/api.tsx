import HTTP from "./http";

export default class API {
    static BASE_URL = '/api/'  // Remove getter, make it a static property

    static route(route: string) {
        return `${API.BASE_URL}${route}`
    }

    static async getSchedule() {
        const route = API.route('schedules')
        console.log(`Fetching schedule from API... ${route}`);
        return await HTTP.GET(route)
    }
}