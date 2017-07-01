import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventComponent } from './event/event.component';
import { EventDashboardComponent } from './event-dashboard/event-dashboard.component';
import { EventDetailComponent } from './event-detail/event-detail.component';

const routes: Routes = [
    { path: 'events', component: EventDashboardComponent },
    { path: 'event/:id', component: EventDetailComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EventDashboardRoutingModule { }
