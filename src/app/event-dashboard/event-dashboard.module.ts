import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDashboardRoutingModule } from './event-dashboard-routing.module';

import { EventDashboardComponent } from './event-dashboard/event-dashboard.component';
import { EventComponent } from './event/event.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { FilterComponent } from './filter/filter.component';

import { SubscriptionComponent } from '../subscription/subscription.component';

import { EventService } from './shared/services/event.service';
import { FilterService } from './shared/services/filter.service';

import { TruncatePipe } from './shared/pipes/truncate.pipe';
import { CreateEventComponent } from './create-event/create-event.component';

@NgModule({
    declarations: [
        EventDashboardComponent,
        EventComponent,
        EventDetailComponent,
        FilterComponent,
        TruncatePipe,
        SubscriptionComponent,
        CreateEventComponent,
    ],
    imports: [
        CommonModule,
        EventDashboardRoutingModule
    ],
    providers: [EventService, FilterService]
})
export class EventDashboardModule { }
