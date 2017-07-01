import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventComponent } from './event/event.component';
import { FilterComponent } from './filter/filter.component';

import { EventService } from './shared/services/event.service';
import { FilterService } from './shared/services/filter.service';

import { TruncatePipe } from './shared/pipes/truncate.pipe';

@NgModule({
    declarations: [
        AppComponent,
        EventComponent,
        FilterComponent,
        TruncatePipe
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule
    ],
    providers: [EventService, FilterService],
    bootstrap: [AppComponent]
})
export class AppModule { }
