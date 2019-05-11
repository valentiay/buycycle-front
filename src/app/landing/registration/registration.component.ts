import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {NewUser} from '../../models/NewUser';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  login: string;
  password1: string;
  password2: string;
  errorTexts: string[];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.errorTexts = [];
    this.authService.isAuthorised().subscribe(isAuthorised => {
      if (isAuthorised) {
        this.router.navigateByUrl('/accounts');
      }
    });
  }

  register() {
    this.errorTexts = [];
    if (!this.login) {
      this.errorTexts.push('Не введен логин');
    }
    if (!this.password1 || !this.password2) {
      this.errorTexts.push('Не введен пароль');
    }
    if (this.password1 !== this.password2) {
      this.errorTexts.push('Пароли не совпадают');
    }
    if (this.errorTexts.length === 0) {
      this.authService.register(new NewUser(this.login, this.password1)).subscribe(
        () => this.router.navigateByUrl('/newAccount'),
        err => this.errorTexts.push(err.text)
      );
    }
  }
}
