import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Event } from '../models/event';
import { Config } from '../../../app.config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EventService {
    private base_url = `${Config.API_URL}/events`;

    constructor(private http: Http) { }

    list(bottomEventId?: number, queryParams: any = {}, limit: number = Config.EVENT_LIMIT): Observable<{ events: Event[], conditionToEventsNumber: any, willBeMoreEvents: boolean }> {
        const { sportFiltersIds, cityFiltersIds, dateInterval = Config.DATE_INTERVAL } = queryParams;

        const myParams = new URLSearchParams();
        myParams.append('limit', limit.toString());
        myParams.append('sportFiltersIds', sportFiltersIds);
        myParams.append('cityFiltersIds', cityFiltersIds);
        myParams.append('dateInterval', dateInterval);
        myParams.append('bottomEventId', bottomEventId && bottomEventId.toString());

        const options = new RequestOptions({ params: myParams });

        return this.http.get(this.base_url, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    get(id: number):  Observable<Event> {
        return this.http.get(`${Config.API_URL}/events/${id}`)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    create(event: any): Promise<any> {
        return this.http.post(`${Config.API_URL}/events`, event).toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    search(query: string, queryParams: any = {}, limit: number = Config.EVENT_LIMIT): Observable<any> {
        const { sportFiltersIds, cityFiltersIds, dateInterval } = queryParams;

        const myParams = new URLSearchParams();
        myParams.append('query', query);
        myParams.append('limit', limit.toString());
        myParams.append('sportFiltersIds', sportFiltersIds);
        myParams.append('cityFiltersIds', cityFiltersIds);
        myParams.append('dateInterval', dateInterval);

        const options = new RequestOptions({ params: myParams });
        const url = `${Config.API_URL}/search/events`;

        return this.http.get(url, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    private extractData(response: Response) {
        return response.json() || {};
    }

    private handleError(error: any): Promise<any> {
        const { status, statusText, message } = error;
        return Promise.reject({ status, statusText, message });
    }

    private handleErrorObservable (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }

}

