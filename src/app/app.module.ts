import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { EventDashboardModule } from './event-dashboard/event-dashboard.module';

import { AppComponent } from './app.component';
import { EventComponent } from './event/event.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { FilterComponent } from './filter/filter.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { EventService } from './shared/services/event.service';
import { FilterService } from './shared/services/filter.service';

import { TruncatePipe } from './shared/pipes/truncate.pipe';

@NgModule({
    declarations: [
        AppComponent,
        EventComponent,
        EventDetailComponent,
        FilterComponent,
        SubscriptionComponent,
        PageNotFoundComponent,
        TruncatePipe
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule,
        LoginModule,
        EventDashboardModule
    ],
    providers: [EventService, FilterService],
    bootstrap: [AppComponent]
})
export class AppModule { }
