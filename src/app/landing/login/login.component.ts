import { Component, OnInit } from '@angular/core';
import {NewUser} from '../../models/NewUser';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  user: NewUser = new NewUser(null, null);
  errorTexts: string[];

  ngOnInit() {
    this.errorTexts = [];
    this.authService.isAuthorised().subscribe(isAuthorised => {
      if (isAuthorised) {
        this.router.navigateByUrl('/accounts');
      }
    });
  }

  login() {
    this.errorTexts = [];
    if (!this.user.login) {
      this.errorTexts.push('Не введен логин');
    }
    if (!this.user.password) {
      this.errorTexts.push('Не введен пароль');
    }
    if (this.errorTexts.length === 0) {
      this.authService.login(this.user).subscribe(
        () => this.router.navigateByUrl('/accounts'),
        err => this.errorTexts.push(err.text)
      );
    }
  }
}
