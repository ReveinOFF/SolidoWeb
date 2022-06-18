import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Event, NavigationEnd, Router } from '@angular/router';
import { CatalogService } from 'src/app/services/catalog.service';
import {Location} from '@angular/common';
import { TitleService } from 'src/app/services/title.service';
import { debounceTime, Subject } from 'rxjs';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-catalog',
  templateUrl: './create-catalog.component.html',
  styleUrls: ['./create-catalog.component.css']
})
export class CreateCatalogComponent implements OnInit {

  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage = '';
  @ViewChild('staticAlert', {static: false}) staticAlert: NgbAlert;
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;

  file: File = null;
  form: UntypedFormGroup;

  constructor(private router: Router,
    public titleService: TitleService,
    private catalogService: CatalogService,
    private formBuilder: UntypedFormBuilder,
    private location: Location) { 
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.titleService.setTitle('Admin Create Katalog - Solido');
        }
      });

      this._success.subscribe(message => this.successMessage = message);
      this._success.pipe(debounceTime(5000)).subscribe(() => {
        if (this.selfClosingAlert) {
          this.selfClosingAlert.close();
        }
      });
    }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name : ['', Validators.required],
      description : ['', Validators.required],
      price : ['', Validators.required]
    });
  }

  submit() {
    let formDate = new FormData();
    formDate.append("name", this.form.get("name").value);
    formDate.append("description", this.form.get("description").value);
    formDate.append("price", this.form.get("price").value);
    formDate.append("image", <File>this.file);

    this.catalogService.createCatalog(formDate).subscribe(result => {
      console.log(result);
      this.location.back();
    },
    error => {
      console.log(error);
      this._success.error('Alle Artikel müssen ausgefüllt werden!');
    });
  }

  selectFile(event:any) {
    this.file = <File>event.target.files[0];
  }
}
