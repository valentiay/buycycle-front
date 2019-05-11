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
  errorText: string;

  ngOnInit() {
    this.authService.isAuthorised().subscribe(isAuthorised => {
      if (isAuthorised) {
        this.router.navigateByUrl('/accounts');
      }
    });
  }

  login() {
    if (!this.user.login) {
      this.errorText = 'Не введен логин';
    } else if (!this.user.password) {
      this.errorText = 'Не введен пароль';
    } else {
      this.authService.login(this.user).subscribe(
        () => this.router.navigateByUrl('/accounts'),
        err => this.errorText = err.text
      );
    }
  }
}
