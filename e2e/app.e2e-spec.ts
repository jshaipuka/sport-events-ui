import { SportEventsPage } from './app.po';

describe('sport-events App', () => {
  let page: SportEventsPage;

  beforeEach(() => {
    page = new SportEventsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to se!!');
  });
});
