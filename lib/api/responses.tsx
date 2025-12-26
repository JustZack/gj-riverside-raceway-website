import { NextResponse } from 'next/server'

export default class Responses {

    private static respond(data: any, status: number, message: string | null = null) {
        return NextResponse.json(
            message ? { data, message } : data,
            { status }
        )
    }

    private static respondNoContent(satus: number) {
        return new NextResponse(null, { status: 204 });
    }

    // 200 OK - Success with data
    static ok(data: any, message?: string) {
        return this.respond(data, 200, message);
    }

    // 201 Created - Resource created successfully
    static created(data: any, message: string = 'Resource created successfully') {
        return this.respond(data, 201, message);
    }

    // 204 No Content - Success with no response body
    static noContent() {
        return this.respondNoContent(204);
    }

    // 400 Bad Request - Invalid input
    static badRequest(message: string = 'Bad request', errors?: any) {
        return this.respond({ error: message, ...(errors && { errors }) }, 400);
    }

    // 401 Unauthorized - Authentication required
    static unauthorized(message: string = 'Unauthorized') {
        return this.respond({ error: message }, 401);
    }

    // 403 Forbidden - Authenticated but not authorized
    static forbidden(message: string = 'Forbidden') {
        return this.respond({ error: message }, 403);
    }

    // 404 Not Found - Resource not found
    static notFound(message: string = 'Resource not found') {
        return this.respond({ error: message }, 404);
    }

    // 409 Conflict - Resource already exists or conflict
    static conflict(message: string = 'Resource already exists') {
        return this.respond({ error: message }, 409);
    }

    // 422 Unprocessable Entity - Validation errors
    static unprocessable(message: string = 'Validation failed', errors?: any) {
        return this.respond({ error: message, ...(errors && { errors }) }, 422);
    }

    // 500 Internal Server Error - Server error
    static serverError(message: string = 'Internal server error', error?: any) {
        console.error('Server Error:', error)
        return this.respond({ error: message }, 500);
    }

    // 503 Service Unavailable - Service temporarily unavailable
    static serviceUnavailable(message: string = 'Service temporarily unavailable') {
        return this.respond({ error: message }, 503);
    }
}