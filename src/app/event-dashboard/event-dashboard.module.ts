import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule }   from '@angular/forms';
import { EventDashboardRoutingModule } from './event-dashboard-routing.module';
import { SubscriptionModule } from '../subscription/subscription.module';
import { DateTimePickerModule } from 'ng-pick-datetime';

import { EventDashboardComponent } from './event-dashboard/event-dashboard.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { FilterComponent } from './filter/filter.component';
import { CreateEventComponent } from './create-event/create-event.component';

import { EventService } from './shared/services/event.service';
import { FilterService } from './shared/services/filter.service';

import { TruncatePipe } from './shared/pipes/truncate.pipe';
import { TimezoneDatePipe } from './shared/pipes/timezone-date.pipe';

@NgModule({
    declarations: [
        EventDashboardComponent,
        EventListComponent,
        EventDetailComponent,
        FilterComponent,
        CreateEventComponent,
        TruncatePipe,
        TimezoneDatePipe,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        EventDashboardRoutingModule,
        SubscriptionModule,
        DateTimePickerModule
    ],
    providers: [EventService, FilterService]
})
export class EventDashboardModule { }
