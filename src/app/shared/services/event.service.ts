import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Event } from '../models/event';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class EventService {
    private URL = 'http://localhost:9000/api/events?sportFiltersIds=18,19,3&cityFiltersIds=2&dateInterval=past';

    constructor(private http: Http) { }

    list(): Promise<Event[]> {
        return this.http.get(this.URL).toPromise()
            .then(response => response.json()['events'])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

}

