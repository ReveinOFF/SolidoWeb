import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

export interface HeaderBTN {
  isCatalog: boolean;
  isContact: boolean;
  isMain: boolean;
  isAdminPanel: boolean
}

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  selectedItem: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor() { }

  setStyleHome() {
    this.selectedItem.next("home");
  }
  setStyleCatalog() {
    this.selectedItem.next("catalog");
  }
  setStyleContact() {
    this.selectedItem.next("contact");
  }
  setStyleAdmin() {
    this.selectedItem.next("admin");
  }
}
