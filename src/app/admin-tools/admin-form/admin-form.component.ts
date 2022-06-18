import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Event, NavigationEnd, Router } from '@angular/router';
import { AccauntService } from 'src/app/services/accaunt.service';
import { IUserCredentials } from '../../interface/accaunt';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css']
})
export class AdminFormComponent implements OnInit {

  form: UntypedFormGroup;

  constructor(public account: AccauntService, private router: Router, 
    private formBuilder: UntypedFormBuilder, private titleService: TitleService) { 
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.titleService.setTitle('Admin - Solido');
        }
      });
    }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit(): void {
    this.registration(this.form.value)
    this.login(this.form.value);
  }

  registration(credentials: IUserCredentials) {
    this.account.registration(credentials).subscribe(response => {
      console.log(response);
      window.location.reload();
    }, error => console.log(error));
  }

  login(credentials: IUserCredentials) {
    this.account.login(credentials).subscribe(response => {
      console.log(response);
      this.router.navigate(['']);
      this.account.saveToken(response.token);
    }, error => console.log(error));
  }

  logout() {
    this.account.logOut();
    this.router.navigate([""]);
  }
}
