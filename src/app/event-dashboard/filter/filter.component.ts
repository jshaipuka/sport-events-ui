import { Component, OnInit } from '@angular/core';
import { FilterService } from '../shared/services/filter.service';
import { City } from '../shared/models/city';
import { Sport } from '../shared/models/sport';

@Component({
    selector: 'se-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
    cities: City[];
    sports: Sport[];

    constructor(private filterService: FilterService) { }

    ngOnInit() {
        this.filterService.listCities().then(cities => this.cities = cities);
        this.filterService.listSports().then(sports => this.sports = sports);
    }

}
