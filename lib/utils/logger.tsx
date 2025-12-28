export default class Logger {
    private className: string;

    constructor(className: string) {
        this.className = className;
    }

    private format(level: string, message: string): string {
        const now = new Date();
        const timestamp = now.toISOString();
        return `[${timestamp}] [${level.toUpperCase()}] [${this.className}] - ${message}`;
    }

    info(message: string) {
        console.log(this.format('info', message));
    }

    warn(message: string) {
        console.warn(this.format('warn', message));
    }

    error(message: string) {
        console.error(this.format('error', message));
    }

    debug(message: string) {
        console.debug(this.format('debug', message));
    }
}