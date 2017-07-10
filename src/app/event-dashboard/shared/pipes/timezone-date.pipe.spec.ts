import { TimezoneDatePipe } from './timezone-date.pipe';

describe('TimezoneDatePipe', () => {
    it('create an instance', () => {
        const pipe = new TimezoneDatePipe();
        expect(pipe).toBeTruthy();
    });
});
