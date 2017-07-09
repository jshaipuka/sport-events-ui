import { Component, OnInit, Input } from '@angular/core';
import { FilterService } from '../shared/services/filter.service';
import { City } from '../shared/models/city';
import { Sport } from '../shared/models/sport';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'se-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
    cities: City[];
    sports: Sport[];
    @Input() stats: any;

    private selectedSportIds: number[];
    private selectedCityIds: number[];
    private selectedDateInterval: string;
    private queryParams: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private filterService: FilterService
    ) { }

    ngOnInit() {
        this.setup();
    }

    private setup() {
        this.filterService.listCities().then(cities => this.cities = cities);
        this.filterService.listSports().then(sports => this.sports = sports);
        this.route.queryParams
            .forEach((params: ParamMap) => {
                this.queryParams = {
                    sportFiltersIds: params['sportFiltersIds'],
                    cityFiltersIds: params['cityFiltersIds'],
                    dateInterval: params['dateInterval'] || undefined
                };
                this.selectedSportIds = this.queryParams.sportFiltersIds && this.queryParams.sportFiltersIds.split(",").map( id => Number(id) ) || [];
                this.selectedCityIds = this.queryParams.cityFiltersIds && this.queryParams.cityFiltersIds.split(",").map( id => Number(id) ) || [];
                this.selectedDateInterval = this.queryParams.dateInterval;
            });
    }

    selectDateInterval(dateInterval: string) {
        if (this.selectedDateInterval !== dateInterval) {
            this.selectedDateInterval = dateInterval;
            this.queryParams.dateInterval = this.selectedDateInterval;
            this.navigate();
        }
    }

    selectSport(sportId: number) {
        const index = this.selectedSportIds.indexOf(sportId);
        if (index === -1) {
            this.selectedSportIds.push(sportId);
        } else {
            this.selectedSportIds.splice(index, 1);
        }

        this.queryParams.sportFiltersIds = this.selectedSportIds.toString();
        this.navigate();
    }

    selectCity(cityId: number) {
        const index = this.selectedCityIds.indexOf(cityId);
        if (index === -1) {
            this.selectedCityIds.push(cityId);
        } else {
            this.selectedCityIds.splice(index, 1);
        }

        this.queryParams.cityFiltersIds = this.selectedCityIds.toString();
        this.navigate();
    }

    deselectAll() {
        this.queryParams = {
            cityFiltersIds: undefined,
            sportFiltersIds: undefined
        };
        this.navigate();
    }

    isDeselected() {
        return !this.queryParams.cityFiltersIds && !this.queryParams.sportFiltersIds;
    }

    isSportSelected(sportId: number){
        const index = this.selectedSportIds && this.selectedSportIds.indexOf(sportId);
        return index !== -1;
    }

    isCitySelected(cityId: number){
        const index = this.selectedCityIds && this.selectedCityIds.indexOf(cityId);
        return index !== -1;
    }

    isDateSelected(dateInterval: string){
        return this.selectedDateInterval === dateInterval;
    }

    private navigate(){
        this.router.navigate([''], { queryParams: this.queryParams, relativeTo: this.route });
    }

}
