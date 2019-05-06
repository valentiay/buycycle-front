import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Account} from '../../models/Account';
import {WithId} from '../../models/responses/WithId';
import {Router} from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  accounts: Account & WithId[];

  ngOnInit() {
    this.authService.getAccounts().subscribe(accounts => this.accounts = accounts);
    this.authService.isAuthorised().subscribe(isAuthorised => {
      if (!isAuthorised) {
        this.router.navigateByUrl('/login');
      }
    });
  }

  logout() {
    this.authService.logout().subscribe(() => this.router.navigateByUrl('/login'));
  }
}
