import { Component, OnInit } from '@angular/core';
import { FilterService } from '../shared/services/filter.service';
import { City } from '../shared/models/city';
import { Sport } from '../shared/models/sport';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'se-create-event',
    templateUrl: './create-event.component.html',
    styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
    cities: City[];
    sports: Sport[];
    submitted = false;
    eventForm: FormGroup;

    constructor(
        private filterService: FilterService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.setup();
    }

    private setup2() {
        this.filterService.listCities().then(cities => this.cities = cities);
        this.filterService.listSports().then(sports => this.sports = sports);

        this.eventForm = this.formBuilder.group({
            name: '',
            description: '',
            date: '',
            time: '',
            sport: '',
            city: '',
            webLink: '',
            imageWebLink: '',
            announcementWebLink: '',
            price: ''
        });
    }


    private setup() {
        this.filterService.listCities().then(cities => this.cities = cities);
        this.filterService.listSports().then(sports => this.sports = sports);

        this.eventForm = this.formBuilder.group({
            name: ['',
                Validators.required
            ],
            description: ['',
                Validators.required
            ],
            date: ['',
                Validators.required
            ],
            time: '',
            sport: ['',
                Validators.required
            ],
            city: ['',
                Validators.required
            ],
            webLink: '',
            imageWebLink: '',
            announcementWebLink: '',
            price: ['',
                Validators.required
            ]
        });

        this.eventForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged();
    }

    createEvent() {
        this.submitted = true;
    }

    onValueChanged(data?: any) {
        if (!this.eventForm) { return; }
        const form = this.eventForm;

        for (const field in this.formErrors) {
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    formErrors = {
        'name': '',
        'description': '',
        'date': '',
        'sport': '',
        'city': '',
        'price': ''
    };

    getErrors() {
        return Object.keys(this.formErrors);
    }

    validationMessages = {
        'name': {
            'required': 'Name is required.'
        },
        'description': {
            'required': 'Description is required.'
        },
        'date': {
            'required': 'Description is required.'
        },
        'sport': {
            'required': 'Sport is required.'
        },
        'city': {
            'required': 'City is required.'
        },
        'price': {
            'required': 'Price is required.'
        },
    };

}
