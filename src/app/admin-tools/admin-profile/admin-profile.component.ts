import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AccauntService } from 'src/app/services/accaunt.service';
import { Event, NavigationEnd, Router } from '@angular/router';
import { TitleService } from 'src/app/services/title.service';
import { debounceTime, Subject } from 'rxjs';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage = '';
  @ViewChild('staticAlert', {static: false}) staticAlert: NgbAlert;
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;

  form: UntypedFormGroup;

  constructor(private account: AccauntService, 
    private formBuilder: UntypedFormBuilder,  
    private router: Router,
    private titleService: TitleService) {

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.titleService.setTitle('Admin Profile - Solido');
      }
    });
   }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      login: ['', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])],
      curretPass: ['', Validators.required],
      newPass: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_.!#&-])[a-zA-Z0-9_.!#&-]+$'),
        Validators.minLength(8)
      ])],
      repeatNewPass: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_.!#&-])[a-zA-Z0-9_.!#&-]+$'),
        Validators.minLength(8)
      ])]
    });

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }

  submit() {
    var NewPass = this.form.value.newPass;
    var RepeatNewPass = this.form.value.repeatNewPass;

    if(NewPass === RepeatNewPass) {
      this.account.changeProfile(this.form.value).subscribe(result => {
        console.log(result);
        this._success.next('Du hast dein profil erfolgreich aktualisiert');
      },
      error => {
        console.log(error);
        this._success.error('Fehler beim Aktualisieren des Profils!');
      });
    }
    else {
      console.log("Wiederholtes Passwort ist nicht korrekt");
      this._success.error('Wiederholtes Passwort ist nicht korrekt!');
    }
  }
}
