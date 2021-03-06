import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(user => {
      this.alertify.success('logged in successfully');
    }, error => {
      this.alertify.error('please provide a valid username and password');
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  logout() {
    this.authService.userToken = null;
    localStorage.removeItem('token');
    this.alertify.success('logged out');
    this.router.navigate(['/home'])
  }

  loggedIn() {
    return this.authService.loggedIn();
  }
}
