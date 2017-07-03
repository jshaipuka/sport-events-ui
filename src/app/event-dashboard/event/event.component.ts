import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../shared/models/event';
import { EventService } from '../shared/services/event.service';
import * as momentTimezone from 'moment-timezone';

@Component({
    selector: 'se-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
    events: Event[];
    loadMore: boolean;

    constructor(private router: Router, private eventService: EventService) { }

    ngOnInit() {
        this.eventService.list().then(data => {
            this.events = data.events;
            this.loadMore = data.willBeMoreEvents;
        });
    }

    onLoadMore() {
        const nextId = this.events[this.events.length - 1].id;
        this.eventService.list(nextId).then(data => {
            this.events = this.events.concat(data.events)
            this.loadMore = data.willBeMoreEvents;
        });
    }

    onDetails(event: Event){
        this.router.navigate(['/event', event.id]);
    }

    formatDate(date, timezone, format){
        return momentTimezone(date).tz(timezone).format(format);
    }
}
