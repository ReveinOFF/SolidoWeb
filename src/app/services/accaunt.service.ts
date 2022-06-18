import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILoginResponse, IUserCredentials, IUserCredentialsChange } from '../interface/accaunt';

@Injectable({
  providedIn: 'root'
})
export class AccauntService {

  apiUrl: string;
  tokenKey: string;

  constructor(private httpClient: HttpClient) { 
    this.apiUrl = "https://api.solido-online.click/api/" + "admin/";
    this.tokenKey = "token";
  }

  isAuthentication(): boolean {
    let token : string = localStorage.getItem("token");
    if(!token) {
      return false;
    }
    return true
  }

  login(credentials: IUserCredentials) : Observable<ILoginResponse> {
    return this.httpClient.post<ILoginResponse>(this.apiUrl + "login", credentials);
  }

  saveToken(token: string) {
    return localStorage.setItem(this.tokenKey, token);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  registration(credentials: IUserCredentials) {
    return this.httpClient.post(this.apiUrl + "registration", credentials, {observe: "response"});
  }

  changeProfile(credentials: IUserCredentialsChange) {
    return this.httpClient.post<IUserCredentialsChange>(this.apiUrl + "change", credentials, {observe: "response"});
  }

  logOut() {
    localStorage.removeItem(this.tokenKey);
  }
}
