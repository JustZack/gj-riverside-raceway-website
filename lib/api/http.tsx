`use client`

export default class HTTP {
    // Helper to create content-type headers
    static ContentTypeHeaders(type: string = 'application/json') {
        return { 'Content-Type': type }
    }
    // Helper to create JSON content-type headers
    static JSONContentTypeHeaders() {
        return HTTP.ContentTypeHeaders("application/json")
    }
    // Helper to stringify data
    static stringify(data: any) {
        return data ? JSON.stringify(data) : undefined
    }

    //Throw an error for a response
    static handleFailure(route: string, method: string, statusText: string) {
        throw new Error(`${method} ${route} failed: ${statusText}`)
    }
    // Throw if response not ok
    static throwIfNotOkay(route: string, method: string, response: Response) {
        if (!response || !response.ok) {
            HTTP.handleFailure(route, method, response.statusText)
        }
    }
    // Handle successful response
    static async handleSuccess(route: string, method: string, response: Response) {
        //Handle no content responses
        if (response.status === 204) return null;
        return await response.json()
    }
    // Handle responses
    static async handleResponse(route: string, method: string, response: Response) {
        HTTP.throwIfNotOkay(route, method, response)
        return await HTTP.handleSuccess(route, method, response)
    }

    // Core fetch method
    static async doFetch(route: string, options: RequestInit) {
        return await fetch(route, options)
    }

    //GET route
    static async GET(route: string) {
        const response = await HTTP.doFetch(route, { method: 'GET' })
        return await HTTP.handleResponse(route, 'GET', response)
    }

    //POST route (data)
    static async POST(route: string, data?: any) {
        const response = await HTTP.doFetch(route, {
            method: 'POST', headers: HTTP.JSONContentTypeHeaders(), body: HTTP.stringify(data),
        })
        return await HTTP.handleResponse(route, 'POST', response)
    }

    //PUT route (data)
    static async PUT(route: string, data?: any) {
        const response = await HTTP.doFetch(route, {
            method: 'PUT', headers: HTTP.JSONContentTypeHeaders(), body: HTTP.stringify(data),
        })
        return await HTTP.handleResponse(route, 'PUT', response)
    }

    //PATCH route (data)
    static async PATCH(route: string, data?: any) {
        const response = await HTTP.doFetch(route, {
            method: 'PATCH', headers: HTTP.JSONContentTypeHeaders(), body: HTTP.stringify(data),
        })
        return await HTTP.handleResponse(route, 'PATCH', response)
    }

    //DELETE route
    static async DELETE(route: string) {
        const response = await HTTP.doFetch(route, {method: 'DELETE'})
        return await HTTP.handleResponse(route, 'DELETE', response)
    }
}
