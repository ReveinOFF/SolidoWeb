import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, Subject } from 'rxjs';
import { Catalog, CatalogGet } from 'src/app/interface/catalog';
import { CatalogService } from 'src/app/services/catalog.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-admin-catalogs',
  templateUrl: './admin-catalogs.component.html',
  styleUrls: ['./admin-catalogs.component.css']
})
export class AdminCatalogsComponent implements OnInit {

  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage = '';
  @ViewChild('staticAlert', {static: false}) staticAlert: NgbAlert;
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;

  @Input()
  catalogs: CatalogGet[];

  constructor(private router: Router,
    private titleService: TitleService,
    private catalogService: CatalogService) {
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.titleService.setTitle('Admin Katalog - Solido');
        }
      });
    }

  ngOnInit(): void {
    this.catalogService.getCatalog().subscribe((data) => {
      this.catalogs = data;
    }, error => console.log(error));

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }

  Delete(id: number): void {
    this.catalogService.deleteCatalog(id).subscribe(result => { 
      window.location.reload(); 
      console.log(result);
    }, error => {
      console.log(error);
      this._success.error('Fehler beim Löschen des Verzeichnisses!');
      });
  }
}
