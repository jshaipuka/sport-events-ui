import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EventComponent } from './event.component';
import { EventService } from '../shared/services/event.service';
import { TruncatePipe } from '../shared/pipes/truncate.pipe';

const eventServiceStub = {
    list: (): Promise<object[]> => {
        return Promise.resolve([
            {
                id: 1,
                name: 'Sport Event Name',
                transliteratedName: 'sport-event-name',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum rutrum sodales. Nullam mattis fermentum libero, non volutpat Lorem ipsum dolor sit amet.', // tslint:disable-line:max-line-length
                startingDateUTC: 1445148000000,
                sport: {
                    id: 1,
                    name: 'Sport Name'
                },
                city: {
                    id: 1,
                    name: 'City Name'
                },
                webLink: 'testLink',
                imageWebLink: 'testImageLink',
                announcementWebLink: 'rulesLink',
                price: 'fee'
            },
            {
                id: 2,
                name: 'Sport Event Name 2',
                transliteratedName: 'sport-event-name2',
                description: 'Lorem ipsum dolor sit amet',
                startingDateUTC: 1445148000000,
                sport: {
                    id: 1,
                    name: 'Sport Name'
                },
                city: {
                    id: 1,
                    name: 'City Name'
                },
                webLink: null,
                imageWebLink: null,
                announcementWebLink: null,
                price: null
            }
        ]);
    }
};

describe('EventComponent', () => {
    let component: EventComponent;
    let fixture: ComponentFixture<EventComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let eventService: EventService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                EventComponent,
                TruncatePipe
            ],
            providers: [{ provide: EventService, useValue: eventServiceStub }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EventComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        eventService = TestBed.get(EventService);

        de = fixture.debugElement.query(By.css('div'));
        el = de.nativeElement;
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    describe('listing events', () => {
        it('should load events', () => {});
        it('should load more events', () => {});
        it('should not display load more events if all loaded', () => {});
        it('should not display load more events if none loaded', () => {});
        it('should handle situation when no events to display', () => {});
        it('should handle situation when an error occured', () => {});
    });

    describe('display an event', () => {
        it('should set background image', () => {});
        it('should format dates', () => {});
        it('should truncate description', () => {});
        it('should set default price if not provided', () => {});
        it('should set price when provided', () => {});

        it('should set sport name', () => {});
        it('should set event name', () => {});
        it('should set city name', () => {});

        it('should support cyrillic', () => {});
    });

});
