import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {AccountService} from '../account.service';
import {Account} from '../models/Account';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  account: Account;

  constructor(private route: ActivatedRoute, private accountService: AccountService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.accountService.getAccount(params.get('accountId')).subscribe(account =>
          this.account = account
        );
      }
    );
  }

}
