import ScheduledJobs from "./lib/jobs/scheduled.jobs";

export function register() {
    ScheduledJobs.startProgressiveJobRuns();
}