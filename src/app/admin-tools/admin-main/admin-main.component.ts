import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Event, NavigationEnd, Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, Subject } from 'rxjs';
import { Main } from 'src/app/interface/main';
import { MainService } from 'src/app/services/main.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {

  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage = '';
  @ViewChild('staticAlert', {static: false}) staticAlert: NgbAlert;
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;

  main: Main;
  form: UntypedFormGroup;
  file: File[] = new Array<File>();

  constructor(private formBuilder: UntypedFormBuilder,
    private router: Router,
    private titleService: TitleService,
    private mainService: MainService) {
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.titleService.setTitle('Admin Main - Solido');
        }
      });
      this.getMain();
    }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: ['', Validators.compose([Validators.required, Validators.pattern('[1]')])],
      company: ['', Validators.required],
      orderOne: ['', Validators.required],
      orderTwo: ['', Validators.required],
      orderThree: ['', Validators.required],
      images: [],
      pathImage: []
    });

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }

  submit() {
    if(this.main == null) {
      this.mainService.createMain(this.form.value).subscribe(result => {
        console.log(result);
        window.location.reload();
      }, error => {
        console.log(error);
      });
    }
    else {
      let formDate = new FormData();
      formDate.append("id", this.form.get("id").value);
      formDate.append("company", this.form.get("company").value);
      formDate.append("orderOne", this.form.get("orderOne").value);
      formDate.append("orderTwo", this.form.get("orderTwo").value);
      formDate.append("orderThree", this.form.get("orderThree").value);
      for (let i = 0; i < this.file.length; i++) {
        formDate.append("images", this.file[i]);
      }

      this.mainService.updateMain(formDate).subscribe(result => {
        console.log(result);
        this._success.next('Sie haben Kontakte erfolgreich aktualisiert');
        }, error => {
        console.log(error);
        this._success.error('Fehler beim Aktualisieren von Kontakten!');
      });;
    }
  }

  selectFile(event:any) {
    for (let file of event.target.files) {
      this.file.push(<File>file);
    }
  }

  getMain() {
    this.mainService.getMain().subscribe((data) => {
      this.main = data;
      this.form.setValue(this.main);
    }
    , error => console.log(error));
  }

  Delete(name: string): void {
    this.mainService.deleteImg(name).subscribe(result => { 
      window.location.reload(); 
      console.log(result);
    }, error => {
      console.log(error);
      this._success.error('Fehler beim Löschen eines Fotos!');
      });
  }
}
