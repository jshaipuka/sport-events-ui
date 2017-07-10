import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SubscriptionService } from './services/subscription.service';

@Component({
    selector: 'se-subscription',
    templateUrl: './subscription.component.html',
    styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
    submitted = false;
    subscriptionForm: FormGroup;
    email: string;
    emailError = '';

    constructor(private subscriptionService: SubscriptionService, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.subscriptionForm = this.formBuilder.group({
            'email': [
                this.email,
                [ Validators.required, Validators.email ]
            ]
        });

        this.subscriptionForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged();
    }

    subscribe() {
        this.submitted = true;
        this.subscriptionService.create(this.subscriptionForm.value.email);
    }

    onValueChanged(data?: any) {
        if (!this.subscriptionForm) { return; }

        this.emailError = '';
        const control = this.subscriptionForm.get('email');

        if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages;
            this.emailError = control.errors.required ? messages.required : messages.pattern;
        }
    }

    private validationMessages = {
        'required': 'Требуется электронная почта.',
        'pattern': 'Пожалуйста, укажите действующий адрес электронной почты.'
    };

}
