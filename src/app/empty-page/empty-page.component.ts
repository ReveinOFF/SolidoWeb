import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { TitleService } from '../services/title.service';

@Component({
  selector: 'app-empty-page',
  templateUrl: './empty-page.component.html',
  styleUrls: ['./empty-page.component.css']
})
export class EmptyPageComponent implements OnInit {

  constructor(private router: Router,
    private titleService: TitleService) {
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.titleService.setTitle('Seite nicht gefunden - Solido');
        }
    });
  }

  ngOnInit(): void {
  }

}
