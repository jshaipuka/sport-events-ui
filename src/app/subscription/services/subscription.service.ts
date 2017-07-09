import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { Config } from '../../app.config';

@Injectable()
export class SubscriptionService {
    private base_url = `${Config.API_URL}/subscriptions`;

    constructor(private http: Http) { }

    create(email: string){
        return this.http.post(this.base_url, { email }).toPromise()
            .then( status => status )
            .catch( err => err);
    }
}
