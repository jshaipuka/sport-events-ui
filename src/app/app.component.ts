import { Component } from '@angular/core';

@Component({
    selector: 'se-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    currentYear = new Date().getFullYear();
}