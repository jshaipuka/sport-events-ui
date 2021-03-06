import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { EventDashboardModule } from './event-dashboard/event-dashboard.module';

import { AppComponent } from './app.component';
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
        ReactiveFormsModule,
        EventDashboardModule,
        AppRoutingModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
