import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SubscriptionService } from './subscription.service';

@Component({
    selector: 'se-subscription',
    templateUrl: './subscription.component.html',
    styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
    submitted = false;
    subscriptionForm: FormGroup;
    email: string;

    constructor(private subscriptionService: SubscriptionService, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.subscriptionForm = this.formBuilder.group({
            'email': [this.email, [
                Validators.required,
                Validators.email
            ]
            ]
        });

        this.subscriptionForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged();
    }

    subscribe() {
        const unableToSubmit = this.subscriptionForm.invalid && this.subscriptionForm.value.email === null;
        if (!unableToSubmit) {
            this.submitted = true;
            this.subscriptionService.create(this.subscriptionForm.value.email);
        }
    }

    onValueChanged(data?: any) {
        if (!this.subscriptionForm) { return; }
        const form = this.subscriptionForm;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
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
        'email': ''
    };

    validationMessages = {
        'email': {
            'required': 'Email is required.',
            'email': 'Please provide a valid email.'
        }
    };

}
