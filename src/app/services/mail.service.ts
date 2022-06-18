import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mail } from '../interface/mail';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  apiUrl: string;

  constructor(private httpClient: HttpClient) { 
    this.apiUrl = "https://api.solido-online.click/api/" + "email/send";
  }

  sendMail(mail: any) : Observable<Mail> {
    return this.httpClient.post<Mail>(this.apiUrl, mail);
  }
}
