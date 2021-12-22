import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersDataService } from '../services/users-data.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userdata: any = {};
  message: any;

  constructor(
    private userData: UsersDataService,
    private _authService: AuthService,
    private router: Router,
    private nav: AuthService,
    private _router: Router
  ) {}

  getUserFormData(data: any) {
    this.message = 'Your email and password do not match. Please try again.';
    this.userData.loginUsers(data).subscribe((result: any) => {
      console.warn(result);
      console.warn('JUBER : ', JSON.stringify(result.token));

      if (result) {
        const jsonData = JSON.stringify(result.token);
        localStorage.setItem('token', jsonData);
        this.router.navigate(['/dashbord']);
      } else {
        this.message =
          'Your email and password do not match. Please try again.';
      }
    });
  }
  error() {}
  ngOnInit(): void {
    if (this._authService.loggedIn()) {
      this._router.navigate(['dashbord']);
    } else {
    }
    this.nav.show();
    this.nav.doSomethingElseUseful();
  }
}
