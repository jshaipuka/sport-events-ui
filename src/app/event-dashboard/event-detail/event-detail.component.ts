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
        this.setup();
    }

    private setup() {
        this.route.paramMap
            .switchMap((params: ParamMap) => {
                const id = +params.get('id');
                return this.eventService.get(id);
            })
            .subscribe((event: Event) => {
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
            },
            error =>  this.errorMessage = <any>error
        );
    }

    onDetails(event: Event){
        const { id, transliteratedName } = event;
        this.router.navigate(['/event', id, transliteratedName ]);
    }

}
