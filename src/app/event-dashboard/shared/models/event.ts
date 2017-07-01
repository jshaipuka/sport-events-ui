import { City } from './city';
import { Sport } from './sport';

export class Event {
    id: number;
    name: string;
    transliteratedName: string;
    description: string;
    startingDateUTC: number;
    sport: Sport;
    city: City;
    webLink?: string; // link to the event
    imageWebLink?: string; // link to the event image
    announcementWebLink?: string; // rules of the event
    price: string;
}
