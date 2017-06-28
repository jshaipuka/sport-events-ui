import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { EventComponent } from './event/event.component';
import { TruncatePipe } from './shared/pipes/truncate.pipe';
import { EventService } from './shared/services/event.service';

const eventServiceStub = {};

describe('AppComponent XXX', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                AppComponent,
                EventComponent,
                TruncatePipe
            ],
            providers: [{ provide: EventService, useValue: { eventServiceStub } }]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

});
