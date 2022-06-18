import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public showOverlay: boolean = false;

  constructor(private router: Router) { 

    this.showOverlay = false;

    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationStart) {
        this.showOverlay = true;
      }
      if (ev instanceof NavigationEnd || ev instanceof NavigationCancel || ev instanceof NavigationError) {
        setTimeout(() => this.showOverlay = false, 1000);
      }
    });
  }
}
