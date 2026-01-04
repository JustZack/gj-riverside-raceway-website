import { format } from 'date-fns'

export type TimeFormat = 'hh:mm:ss' | 'mm:ss' | 'ss' | 'h:mma' | string;
export type DateFormat = 'MM/dd/yyyy' | 'dd/MM/yyyy' | 'yyyy-MM-dd' | 'MMM dd, yyyy' | 'MMM do, yyyy' | string;

//Houses common time and date utility functions
export default class TimeUtils {
    static getDayOfTheWeek(date: Date, abbreviation: boolean): string {
        return format(date, abbreviation ? 'EEE' : 'EEEE');
    }

    static formatDate(date: Date, formatStr: DateFormat = 'MM/dd/yyyy'): string {
        return format(date, formatStr);
    }

    static formatTime(date: Date, formatStr: TimeFormat = 'hh:mm:ss'): string {
        return format(date, formatStr);
    }

    static formatDateTime(date: Date, dateFormat: DateFormat = 'MM/do/yyyy', timeFormat: TimeFormat = 'hh:mm:ss'): string {
        return `${this.formatDate(date, dateFormat)} ${this.formatTime(date, timeFormat)}`;
    }

    static getShortDateString(date: Date, abbreviateDay: boolean = true, abbreviateMonth: boolean = true): string {
        let dayOfTheWeek = this.getDayOfTheWeek(date, abbreviateDay);
        let dateStr = this.formatDate(date, abbreviateMonth ? 'MMM do, yyyy' : 'MMMM do, yyyy');
        return `${dayOfTheWeek}, ${dateStr}`;
    }

    static getShortTimeString(date: Date): string {
        return this.formatTime(date, 'h:mma').toLocaleLowerCase();
    }

    static getShortDateTimeString(date: Date, textBetweenDateAndTime: string = " ", abbreviateDay: boolean = true, abbreviateMonth: boolean = true): string {
        let sds = this.getShortDateString(date, abbreviateDay, abbreviateMonth);
        let sts = this.getShortTimeString(date);
        return `${sds}${textBetweenDateAndTime}${sts}`;
    }
}
