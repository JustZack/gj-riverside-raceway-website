
export class RunnableJob {
    name: string;
    jobFunction: Function;

    constructor(name: string, jobFunction: Function) {
        this.name = name;
        this.jobFunction = jobFunction;
    }

    async run(...args: any[]) {
        return await this.jobFunction(...args);
    }
}