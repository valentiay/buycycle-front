import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Account} from '../../models/Account';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss']
})
export class NewAccountComponent implements OnInit {

  newAccount: Account;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.newAccount = new Account(null, 'publicRestricted');
    this.authService.isAuthorised().subscribe(isAuthorised => {
      if (!isAuthorised) {
        this.router.navigateByUrl('/login');
      }
    });
  }

  submit() {
    this.authService
      .createAccount(this.newAccount)
      .subscribe(response => this.router.navigateByUrl(`/account/${response.id}/dashboard`));
  }
}
