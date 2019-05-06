import { Component, OnInit } from '@angular/core';
import {User} from '../../models/User';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  user: User = new User(null, null);
  errorText: string;

  ngOnInit() {
    this.authService.isAuthorised().subscribe(isAuthorised => {
      if (isAuthorised) {
        this.router.navigateByUrl('/accounts');
      }
    });
  }

  login() {
    this.authService.login(this.user).subscribe(
    () => this.router.navigateByUrl('/accounts'),
    err => this.errorText = err.text
    );
  }
}
