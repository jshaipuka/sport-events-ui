import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Event } from '../models/event';
import { Config } from '../../../app.config';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class EventService {
    private sportFiltersIds = '18,19,3';
    private cityFiltersIds = '2';
    private dateInterval = 'past';

    constructor(private http: Http) { }

    list(bottomEventId?: number, queryParams: any = {}, limit: number = 9): Promise<{ events: Event[], conditionToEventsNumber: any, willBeMoreEvents: boolean }> {
        const { sportFiltersIds, cityFiltersIds, dateInterval } = queryParams;

        let url = `${Config.API_URL}/events?limit=${limit}`;
        url += `&sportFiltersIds=${sportFiltersIds || this.sportFiltersIds}`;
        url += `&cityFiltersIds=${cityFiltersIds || this.cityFiltersIds}`;
        url += `&dateInterval=${dateInterval || this.dateInterval}`;
        url = bottomEventId ? `${url}&bottomEventId=${bottomEventId}` : url;

        return this.http.get(url).toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    get(id: number): Promise<Event> {
        return this.http.get(`${Config.API_URL}/events/${id}`).toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

}

