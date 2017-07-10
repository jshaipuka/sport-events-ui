import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule }   from '@angular/forms';

import { SubscriptionComponent } from './subscription/subscription.component';

import { SubscriptionService } from './services/subscription.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule
  ],
  declarations: [ SubscriptionComponent ],
  exports: [ SubscriptionComponent ],
  providers: [ SubscriptionService ]
})
export class SubscriptionModule { }
