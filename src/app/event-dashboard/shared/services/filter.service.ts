import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from '../../../app.config';
import { City } from '../models/city';
import { Sport } from '../models/sport';

@Injectable()
export class FilterService {

    constructor(private htpp: Http) { }

    listCities(withEventsOnly?: boolean): Promise<City[]> {
        const baseUrl = `${Config.API_URL}/cities`;
        const url = withEventsOnly ? `${baseUrl}?withEventsOnly=${withEventsOnly}` : baseUrl;

        return this.htpp.get(url).toPromise()
            .then(data => data.json() as City[])
            .catch(this.handleError);
    }

    listSports(withEventsOnly?: boolean): Promise<Sport[]> {
        const baseUrl = `${Config.API_URL}/sports`;
        const url = withEventsOnly ? `${baseUrl}?withEventsOnly=${withEventsOnly}` : baseUrl;

        return this.htpp.get(url).toPromise()
            .then(data => data.json() as Sport[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

}
