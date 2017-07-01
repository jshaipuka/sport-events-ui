import { Pipe, PipeTransform } from '@angular/core';

/*
 * Truncates long text. Takes length as parameter of type number. Default length is 140 characters.
 * Usage:
 *   value | truncate:length
 * Example:
 *   {{ "some really long text" |  truncate:10 }}
 *   formats to: some reall...
*/
@Pipe({
    name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

    transform(text: string, length: number = 140): string {
        return text.length <= length ? text : this.trimDots(text.slice(0, length)) + '...';
    }

    private trimDots(text: string): string {
        while (text.endsWith('.')) {
            return this.trimDots(text.slice(0, text.length - 1));
        }
        return text;
    }

}
