import { browser, by, element } from 'protractor';

export class SportEventsPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('se-root h1')).getText();
  }
}
