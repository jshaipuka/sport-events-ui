import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Event } from '../models/event';
import { Config } from '../../app.config';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class EventService {
    constructor(private http: Http) { }

    list(bottomEventId?: number): Promise<{ events: Event[], conditionToEventsNumber: any, willBeMoreEvents: boolean }> {
        const base_url = `${Config.API_URL}/events?sportFiltersIds=18,19,3&cityFiltersIds=2&dateInterval=past`;
        const url = bottomEventId ? `${base_url}&bottomEventId=${bottomEventId}` : base_url;
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

