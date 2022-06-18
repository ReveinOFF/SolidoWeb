import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from '../interface/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  apiUrl: string;

  constructor(private httpClient: HttpClient) { 
    this.apiUrl = "https://api.solido-online.click/api/" + "contact/";
  }

  getContact(): Observable<Contact> {
    return this.httpClient.get<Contact>(this.apiUrl+"1");
  }

  createContact(contact: Contact) {
    return this.httpClient.post(this.apiUrl, contact, {observe: "response"});
  }

  updateContact(contact: Contact) {
    return this.httpClient.put<Contact>(this.apiUrl, contact, {observe: "response"});
  }
}
