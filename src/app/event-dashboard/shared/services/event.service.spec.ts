import { async, TestBed, inject } from '@angular/core/testing';
import {
    HttpModule,
    Http,
    XHRBackend,
    Response,
    ResponseOptions
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { EventService } from './event.service';
import { Event } from '../models/event';
import { Sport } from '../models/sport';
import { City } from '../models/city';

const sport: Sport = {
    id: 1,
    name: 'Rush-rush',
    image: 'rushing',
    hidden: true
};

const city: City = {
    id: 1,
    name: 'Awesomewille',
    hidden: false,
    timezoneName: 'Space/Time'
};

const event: Event = {
    id: 1, name: 'Deering',
    transliteratedName: 'bla',
    description: 'bla bla',
    startingDateUTC: 1,
    sport,
    city,
    price: null
};

describe('EventService', () => {
    let backend: MockBackend;
    let service: EventService;
    let testEvents: Event[];
    let testEvent: Event;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                EventService,
                { provide: XHRBackend, useClass: MockBackend }
            ]
        });
    });

    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
        backend = be;
        service = new EventService(http);
        testEvents = [event];
        testEvent = event;
    }));

    it('should be created', inject([EventService], (service: EventService, done) => {
        expect(service).toBeTruthy();
    }));

    it('should list all events', async(inject([], () => {
        const httpResponse = {
            status: 200,
            body: {
                events: testEvents,
                conditionToEventsNumber: {},
                willBeMoreEvents: true
            }
        };
        const options = new ResponseOptions(httpResponse);
        const response = new Response(options);

        backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

        service.list().then(data => {
            expect(data.events.length).toBe(testEvents.length, 'should return events');
            expect(data.willBeMoreEvents).toBe(true, 'should return willBeMoreEvents');
        });
    })));

    it('should return no events', async(inject([], () => {
        const httpResponse = { status: 200, body: { events: [], willBeMoreEvents: false } };
        const options = new ResponseOptions(httpResponse);
        const response = new Response(options);
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

        service.list()
            .then(data => {
                expect(data.events.length).toBe(0);
            });
    })));

    it('should get an event by id', async(inject([], () => {
        const httpResponse = { status: 200, body: testEvent };
        const options = new ResponseOptions(httpResponse);
        const response = new Response(options);
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

        service.get(1)
            .then(data => {
                expect(data).toBe(testEvent);
            });
    })));

    it('should handle an error when getting an event', inject([EventService], (service: EventService) => { }));
});
