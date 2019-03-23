import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Account} from '../../models/Account';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  newAccount: Account;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.newAccount = new Account('');
  }

  submit() {
    this.authService
      .createAccount(this.newAccount)
      .subscribe(response => this.router.navigateByUrl(`/account/${response.id}/dashboard`));
  }
}
