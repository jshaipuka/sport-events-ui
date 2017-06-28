import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
    let pipe: TruncatePipe;

    beforeEach(() => {
        pipe = new TruncatePipe();
    });

    it('Should truncate text by default with no explicit limit provided', () => {
        const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum rutrum sodales. Nullam mattis fermentum libero, non volutpat Lorem ipsum dolor sit amet.';
        expect(pipe.transform(text)).toEqual('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum rutrum sodales. Nullam mattis fermentum libero, non volutpat ...');
    });

    it('Should truncate text with limit provided', () => {
        const text = 'Lorem ipsum dolor';
        expect(pipe.transform(text, text.length - 1)).toEqual('Lorem ipsum dolo...');
    });

    it('Should not truncate text that is shorter than the limit set', () => {
        const text = 'Lorem ipsum dolor';
        expect(pipe.transform(text, text.length + 1)).toEqual(text);
    });

    it('Should not truncate text that is equal to the limit set', () => {
        const text = 'Lorem ipsum dolor';
        expect(pipe.transform(text, text.length)).toEqual(text);
    });

    it('Should truncate text ending with dots with leaving only three dots', () => {
        let text = 'Lorem ipsum dolor.';
        expect(pipe.transform(text, text.length - 1)).toEqual('Lorem ipsum dolor...');
        text = 'Lorem ipsum dolor..';
        expect(pipe.transform(text, text.length - 1)).toEqual('Lorem ipsum dolor...');
        text = 'Lorem ipsum dolor......';
        expect(pipe.transform(text, text.length - 1)).toEqual('Lorem ipsum dolor...');
    });

});
