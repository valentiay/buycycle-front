import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Account} from '../../models/Account';
import {Router} from '@angular/router';
import {User} from '../../models/User';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  login: string;
  password1: string;
  password2: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.isAuthorised().subscribe(isAuthorised => {
      if (isAuthorised) {
        this.router.navigateByUrl('/accounts');
      }
    });
  }

  register() {
    if (this.password1 === this.password2) {
      this.authService.register(new User(this.login, this.password1)).subscribe(() => {
        this.router.navigateByUrl('/newAccount');
      });
    } else {
      console.log('Wrong passwords');
    }
  }
}
