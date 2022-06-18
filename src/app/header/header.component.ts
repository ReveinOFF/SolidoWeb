import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbAlert, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, Subject } from 'rxjs';
import { Contact } from '../interface/contact';
import { AccauntService } from '../services/accaunt.service';
import { ContactService } from '../services/contact.service';
import { HeaderService } from '../services/header.service';
import { MailService } from '../services/mail.service';
import { TitleService } from '../services/title.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage = '';
  @ViewChild('staticAlert', {static: false}) staticAlert: NgbAlert;
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;
  
  closeResult = '';
  selectedItem: string;
  form: UntypedFormGroup;
  contact: Contact;

  constructor(private headerService: HeaderService, 
    private offcanvasService: NgbOffcanvas,
    private formBuilder: UntypedFormBuilder, 
    private modalService: NgbModal, 
    public account: AccauntService,
    private router: Router,
    private mailSender: MailService,
    private contactService: ContactService) { 
  }

  ngOnInit(): void {
    this.headerService.selectedItem.subscribe(item => {
      this.selectedItem = item;
    });

    this.contactService.getContact().subscribe(data => this.contact = data, error => console.log(error));

    this.form = this.formBuilder.group({
      Name: ['', Validators.required],
      userPhone: ['', Validators.required],
      Subject: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      Body: ['', Validators.compose([Validators.required, Validators.minLength(20)])]
    });

    var URL = window.location.pathname;
    if(URL === "/catalog") {
      this.selectedItem = "catalog";
      this.setStyleCatalog();
    }
    if(URL === "/contacts") {
      this.selectedItem = "contact";
      this.setStyleContact();
    }
    if(URL === "/admin" 
    || URL === "/admin/main" 
    || URL === "/admin/contacts" 
    || URL === "/admin/catalog" 
    || URL === "/profile" 
    || URL === "/catalog/create") {
      this.selectedItem = "admin"; 
      this.setStyleAdmin();
    }
    if(URL === "/") {
      this.selectedItem = "home";
      this.setStyleHome();
    }

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }

  setStyleHome() {
    this.headerService.setStyleHome();
  }
  setStyleContact() {
    this.headerService.setStyleContact();
  }
  setStyleCatalog() {
    this.headerService.setStyleCatalog();
  }
  setStyleAdmin() {
    this.headerService.setStyleAdmin();
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  openCustomPanelClass(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { panelClass: 'bg-body', backdropClass: 'bg-secondary' });
  }

  logout() {
    this.account.logOut();
    this.router.navigate([""]);
  }

  submit() {
    this.mailSender.sendMail(this.form.value).subscribe(result => {
      console.log(result);
      this._success.next('Vielen Dank, dass Sie einen Anruf bestellt haben');
    }, error => {
      console.log(error);
      this._success.error('Beim Bestellen eines Anrufs ist ein Fehler aufgetreten!')
    });
  }
}