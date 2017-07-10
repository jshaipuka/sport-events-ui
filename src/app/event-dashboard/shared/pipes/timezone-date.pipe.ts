import { Pipe, PipeTransform } from '@angular/core';
import * as momentTimezone from 'moment-timezone';
import 'moment/locale/ru';
momentTimezone.locale('ru');
momentTimezone.updateLocale('ru', {
    months: [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря'
    ]
});

/*
 * Uses MomentTimezone to create a date with a specified timezone.
 * Takes timezone as parameter of type number.
 * And a second parameter (args) either as a date format string or a boolean.
 * Specifying format will return a formatted date.
 * Specifying boolean will check whether this date has time set at 0 hour.
 * Usage:
 *   value | timezoneDate:length
 * Example:
 *   {{ 1471755600000 |  timezoneDate: "Europe/Moscow" "HH:MM" }}
 *   formats to: "08:00"
 *   {{ 1471755600000 |  timezoneDate: "Europe/Moscow" true }}
 *   formats to: true
*/
@Pipe({
    name: 'timezoneDate'
})
export class TimezoneDatePipe implements PipeTransform {

    transform(milliseconds: number, timezone: string, args: string | boolean): any {
        return typeof args === 'boolean' ?
            this.isTimeValid(milliseconds, timezone) : this.formatDate(milliseconds, timezone, args);
    }

    private formatDate(date, timezone, format) {
        return momentTimezone(date).tz(timezone).format(format);
    }

    private isTimeValid(date, timezone) {
        return momentTimezone(date).tz(timezone).hour();
    }
}
