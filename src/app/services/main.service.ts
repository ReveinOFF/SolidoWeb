import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Main } from '../interface/main';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  apiUrl: string;

  constructor(private httpClient: HttpClient) { 
    this.apiUrl = "https://api.solido-online.click/api/" + "main/";
  }

  getMain(): Observable<Main> {
    return this.httpClient.get<Main>(this.apiUrl+"1");
  }

  createMain(main: any): Observable<Main> {
    return this.httpClient.post<Main>(this.apiUrl, main);
  }

  updateMain(main: any) {
    return this.httpClient.put<Main>(this.apiUrl, main, {observe: "response"});
  }

  deleteImg(name: string) {
    return this.httpClient.delete(this.apiUrl+name)
  }
}
