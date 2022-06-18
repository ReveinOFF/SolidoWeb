import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from '../../interface/contact';
import { Event, NavigationEnd, Router } from '@angular/router';
import { TitleService } from 'src/app/services/title.service';
import {Subject} from 'rxjs';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-admin-contact',
  templateUrl: './admin-contact.component.html',
  styleUrls: ['./admin-contact.component.css']
})
export class AdminContactComponent implements OnInit {
  
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage = '';
  @ViewChild('staticAlert', {static: false}) staticAlert: NgbAlert;
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;

  contact: Contact;
  form: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder, 
    private contactService: ContactService,
    private router: Router,
    private titleService: TitleService) {
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.titleService.setTitle('Admin Kontakt - Solido');
        }
      });
      this.getContact();
   }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: ['', Validators.compose([Validators.required, Validators.pattern('[1]')])],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      dateOne: ['', Validators.required],
      dateTwo: ['', Validators.required],
      addressOne: ['', Validators.required],
      addressTwo: ['', Validators.required],
    });

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }

  submit() {
    if(this.contact == null) {
      this.contactService.createContact(this.form.value).subscribe(result => {
        console.log(result);
        window.location.reload();
      }, error => {
        console.log(error);
      });
    }
    else {
      this.contactService.updateContact(this.form.value).subscribe(result => {
        console.log(result);
        this._success.next('Sie haben Kontakte erfolgreich aktualisiert');
        }, error => {
        console.log(error);
        this._success.error('Fehler beim Aktualisieren von Kontakten!');
      });
    }
  }

  getContact() {
    this.contactService.getContact().subscribe((data) => {
      this.contact = data;
      this.form.setValue(this.contact);
    }
    , error => console.log(error));
  }
}
