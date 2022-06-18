import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Catalog, CatalogGet } from '../interface/catalog';
import { CatalogService } from '../services/catalog.service';
import { TitleService } from '../services/title.service';

@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.css']
})
export class CatalogsComponent implements OnInit {

  catalogs: CatalogGet[];

  constructor(private router: Router,
    private titleService: TitleService,
    private catalogService: CatalogService) { 
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.titleService.setTitle('Katalog - Solido');
        }
      });
    }

  ngOnInit(): void {
    this.catalogService.getCatalog().subscribe(data => this.catalogs = data);
  }

}
