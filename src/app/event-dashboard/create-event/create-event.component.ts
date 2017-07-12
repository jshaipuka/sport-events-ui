import { Component, OnInit } from '@angular/core';
import { FilterService } from '../shared/services/filter.service';
import { City } from '../shared/models/city';
import { Sport } from '../shared/models/sport';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from '../shared/services/event.service';
import * as moment from 'moment';

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
    createError: any;

    constructor(
        private eventService: EventService,
        private filterService: FilterService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.setup();
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
        const {
            announcementWebLink,
            city,
            date,
            description,
            imageWebLink,
            name,
            price,
            sport,
            time,
            webLink
        } = this.eventForm.value;

        const startingDateUTC =  moment(date + " " + time, "DD-MM-YYYY HH:mm").valueOf();

        const event = {
            name,
            description,
            startingDateUTC,
            sport,
            city,
            price,
            imageWebLink,
            announcementWebLink,
            webLink
        };

        this.submitted = true;
        this.eventService.create(event).catch(err => this.createError = err);
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
            'required': 'Необхожимо указать "название"'
        },
        'description': {
            'required': 'Необхожимо указать "описание"'
        },
        'date': {
            'required': 'Необхожимо указать "дату"'
        },
        'sport': {
            'required': 'Необхожимо указать "вид спорта"'
        },
        'city': {
            'required': 'Необхожимо указать "город"'
        },
        'price': {
            'required': 'Необхожимо указать "цену"'
        },
    };

}
