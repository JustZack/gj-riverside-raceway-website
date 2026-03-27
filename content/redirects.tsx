import { livetime } from '@/content/livetime';

export const redirects: Record<string, string> = {
    "current-event": livetime.getLink("results"),
    "livetime": livetime.getLink("")
}