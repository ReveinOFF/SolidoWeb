import { Component, OnInit } from '@angular/core';
import { Contact } from '../interface/contact';
import { AccauntService } from '../services/accaunt.service';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  contact: Contact;

  constructor(public account: AccauntService,
    private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.getContact().subscribe(data => this.contact = data, error => console.log(error));
  }

}
