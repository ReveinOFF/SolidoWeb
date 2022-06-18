import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  constructor(
    public router: Router,
        private titleService: Title
  ) { }

  parentUrl() {
    return this.router.url.split('/')[1];
  }

  childUrl() {
      return this.router.url.split('/')[2];
  }

  setTitle(newTitle: string) {
      this.titleService.setTitle(newTitle);
  }

  getTitle() {
    this.titleService.getTitle();
  }

  Ucase(name: string) {
      return name.charAt(0).toUpperCase() + name.slice(1);
  }
}
