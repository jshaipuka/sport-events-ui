import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Config } from '../../app.config';

@Component({
    selector: 'se-event-dashboard',
    templateUrl: './event-dashboard.component.html',
    styleUrls: ['./event-dashboard.component.scss']
})
export class EventDashboardComponent implements OnInit {
    heading: string;

    private headings = {
        past: 'Прошедшие события',
        upcoming: 'Предстоящие события'
    };

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.queryParams.subscribe(
             (queryParam: any) =>
                this.heading = this.headings[queryParam['dateInterval']] || this.headings[Config.DATE_INTERVAL]
         );
    }

}
