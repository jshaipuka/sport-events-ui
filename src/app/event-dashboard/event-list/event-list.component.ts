import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Event } from '../shared/models/event';
import { EventService } from '../shared/services/event.service';
import { Config } from '../../app.config';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'se-event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
    heading: string;
    events: Event[];
    loadMore: boolean;
    errorMessage: string;
    stats: any;

    private queryParams: any;
    private headings = {
        past: 'Прошедшие события',
        upcoming: 'Предстоящие события'
    };

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private eventService: EventService
    ) { }

    ngOnInit() {
        this.setup();
    }

    private setup() {
        this.route.queryParamMap
            .switchMap((params: ParamMap) => {
                this.queryParams = {
                    sportFiltersIds: params.get('sportFiltersIds'),
                    cityFiltersIds: params.get('cityFiltersIds'),
                    dateInterval: params.get('dateInterval') || undefined
                };
                this.heading = this.headings[this.queryParams.dateInterval] || this.headings[Config.DATE_INTERVAL];
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

    getImage(event){
        if(event && event.imageWebLink){
            return `url(${event.imageWebLink})`;
        } else {
            return `url(assets/images/sports/${event.sport.image}160x160.png)`;
        }
    }

}
