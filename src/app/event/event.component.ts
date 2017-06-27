import { Component, OnInit } from '@angular/core';
import { Event } from '../shared/models/event';
import { EventService } from '../shared/services/event.service';

@Component({
    selector: 'se-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
    events: Event[];

    constructor(private eventService: EventService) { }

    ngOnInit() {
        this.eventService.list().then(events => this.events = events);
    }

}
