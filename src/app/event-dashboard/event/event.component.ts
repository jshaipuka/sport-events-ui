import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Event } from '../shared/models/event';
import { EventService } from '../shared/services/event.service';
import * as momentTimezone from 'moment-timezone';
import 'moment/locale/ru';
momentTimezone.locale('ru');
momentTimezone.updateLocale('ru', {
    months : [
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

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'se-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
    events: Event[];
    loadMore: boolean;
    errorMessage: string;
    stats: any;

    private queryParams: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private eventService: EventService
    ) { }

    ngOnInit() {
        this.listEvents();
    }

    private listEvents() {
        this.route.queryParamMap
            .switchMap((params: ParamMap) => {
                this.queryParams = {
                    sportFiltersIds: params.get('sportFiltersIds'),
                    cityFiltersIds: params.get('cityFiltersIds'),
                    dateInterval: params.get('dateInterval') || undefined
                };
                return this.eventService.list(null, this.queryParams);
            })
            .subscribe(
                data => {
                    this.events = data.events;
                    this.loadMore = data.willBeMoreEvents;
                    this.stats = data.conditionToEventsNumber;
                },
                error =>  this.errorMessage = <any>error
            );
    }

    onLoadMore() {
        const nextId = this.events[this.events.length - 1].id;
        this.eventService
            .list(nextId, this.queryParams)
            .subscribe(
                data => {
                    this.events = this.events.concat(data.events);
                    this.loadMore = data.willBeMoreEvents;
                },
                error =>  this.errorMessage = <any>error
            );
    }

    onDetails(event: Event){
        const { id, transliteratedName } = event;
        this.router.navigate(['/event', id, transliteratedName ]);
    }

    formatDate(date, timezone, format){
        return momentTimezone(date).tz(timezone).format(format);
    }
}
