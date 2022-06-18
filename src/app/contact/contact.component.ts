import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Contact } from '../interface/contact';
import { ContactService } from '../services/contact.service';
import { MailService } from '../services/mail.service';
import { TitleService } from '../services/title.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contact: Contact;
  closeResult: string;
  form: UntypedFormGroup;
  
  constructor(private router: Router,
    private titleService: TitleService,
    private contactService: ContactService,
    private formBuilder: UntypedFormBuilder,
    private mailSender: MailService,
    private modalService: NgbModal) { 
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.titleService.setTitle('Kontakt - Solido');
      }
    });
  }

  ngOnInit(): void {
    this.contactService.getContact().subscribe(data => this.contact = data, error => console.log(error));

    this.form = this.formBuilder.group({
      Name: ['', Validators.required],
      userPhone: ['', Validators.required],
      Subject: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      Body: ['', Validators.compose([Validators.required, Validators.minLength(20)])]
    });
  }

  submit(content: any) {
    this.mailSender.sendMail(this.form.value).subscribe(result => {
      console.log(result);
      this.modalService.open(content, { centered: true });
    }, error => console.log(error));
  }
}
