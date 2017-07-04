import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventComponent } from './event/event.component';
import { EventDashboardComponent } from './event-dashboard/event-dashboard.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { CreateEventComponent } from './create-event/create-event.component';

const routes: Routes = [
    { path: '', component: EventDashboardComponent, pathMatch: 'full' },
    { path: 'event/:id/:transliteratedName', component: EventDetailComponent },
    { path: 'create', component: CreateEventComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EventDashboardRoutingModule { }
