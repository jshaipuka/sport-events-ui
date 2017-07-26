import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventListComponent } from './event-list/event-list.component';
import { EventDashboardComponent } from './event-dashboard/event-dashboard.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { CreateEventComponent } from './create-event/create-event.component';

const routes: Routes = [
    {
        path: '',
        component: EventDashboardComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: EventListComponent
            },
            {
                path: 'event/:id/:transliteratedName',
                component: EventDetailComponent
            },
            {
                path: 'create',
                component: CreateEventComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EventDashboardRoutingModule { }
