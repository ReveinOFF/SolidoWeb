import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { TitleService } from '../services/title.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { MainService } from '../services/main.service';
import { Main } from '../interface/main';
import { ContactService } from '../services/contact.service';
import { Contact } from '../interface/contact';
import { HeaderService } from '../services/header.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  main: Main;
  images: any = null;
  contact: Contact;

  constructor(config: NgbCarouselConfig, 
    private router: Router,
    private titleService: TitleService,
    private mainService: MainService,
    private contactService: ContactService,
    private headerService: HeaderService) {

    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;

    this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.titleService.setTitle('Online-Shop für Dach - Solido');
        }
    });
   }

  ngOnInit(): void {
    this.contactService.getContact().subscribe(data => this.contact = data, error => console.log(error));

    this.mainService.getMain().subscribe((data) => {
      this.main = data;
      this.images = this.main.images.map((n) =>`https://api.solido-online.click/Image/${n}`)
    }
    , error => console.log(error));
  }
}
