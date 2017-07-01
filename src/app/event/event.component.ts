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
    loadMore: boolean;

    constructor(private eventService: EventService) { }

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

}
