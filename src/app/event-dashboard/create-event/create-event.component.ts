import { Component, OnInit } from '@angular/core';
import { FilterService } from '../shared/services/filter.service';
import { City } from '../shared/models/city';
import { Sport } from '../shared/models/sport';

@Component({
    selector: 'se-create-event',
    templateUrl: './create-event.component.html',
    styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
    cities: City[];
    sports: Sport[];

    constructor(private filterService: FilterService) { }

    ngOnInit() {
        this.setup();
    }

    private setup() {
        this.filterService.listCities().then(cities => this.cities = cities);
        this.filterService.listSports().then(sports => this.sports = sports);
    }

}
