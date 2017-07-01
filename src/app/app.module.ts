import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { EventDashboardModule } from './event-dashboard/event-dashboard.module';

import { AppComponent } from './app.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        LoginModule,
        EventDashboardModule,
        AppRoutingModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
