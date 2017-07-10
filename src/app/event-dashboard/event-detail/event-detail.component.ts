import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { EventService } from '../shared/services/event.service';
import { Event } from '../shared/models/event';

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'se-event-detail',
    templateUrl: './event-detail.component.html',
    styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
    event: Event;
    relatedEvents: Event[] = [];
    errorMessage: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private eventService: EventService
    ) { }

    ngOnInit() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.eventService.get(id).then(
            (event: Event) => {
                this.event = event;
                const queryParams = {
                    cityFiltersIds: event.city.id,
                    sportFiltersIds: event.sport.id
                };
                this.eventService.list(event.id, queryParams, 4)
                    .subscribe(
                        data => this.relatedEvents =  data.events,
                        error =>  this.errorMessage = <any>error
                    );
            }
        );
    }

}
