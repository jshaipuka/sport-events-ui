import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from '../../app.config';
import { City } from '../models/city';
import { Sport } from '../models/sport';

@Injectable()
export class FilterService {

    constructor(private htpp: Http) { }

    listCities(): Promise<City[]> {
        return this.htpp.get(`${Config.API_URL}/cities`).toPromise()
            .then(data => data.json() as City[])
            .catch(this.handleError);
    }

    listSports(): Promise<Sport[]> {
        return this.htpp.get(`${Config.API_URL}/sports`).toPromise()
            .then(data => data.json() as Sport[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

}
