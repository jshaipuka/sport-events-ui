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

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private eventService: EventService
    ) { }

    ngOnInit() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.eventService.get(id).then((d: Event) => this.event = d);
    }

}
