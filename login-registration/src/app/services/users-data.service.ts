import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class UsersDataService implements HttpInterceptor {
  loginurl = 'http://localhost:3000/login';
  registrationurl = 'http://localhost:3000/register';
  geturl = 'http://localhost:3000/getuser';
  updateurl = 'http://localhost:3000/update';
  deleteurl = 'http://localhost:3000/delete';
  uploadurl = 'http://localhost:3000/upload';

  constructor(private http: HttpClient, private injector: Injector) {}

  token = localStorage.getItem('token');
  decodedToken: { [key: string]: string };

  decodeToken() {
    if (this.token) {
      this.decodedToken = jwt_decode(this.token);
    }
  }
  getId() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.id : null;
  }
  users() {
    return this.http.get(this.geturl+`/${this.getId()}`);
  }
  loginUsers(data: any) {
    return this.http.post(this.loginurl, data);
  }
  saveUsers(data: any) {
    return this.http.post(this.registrationurl, data);
  }
  updateUsers(data: any){
    return this.http.patch(this.updateurl+`/${this.getId()}`, data);
  }
  deleteUser(){
    return this.http.delete(this.deleteurl+`/${this.getId()}`);
  }
  logoutUser(){
    return localStorage.removeItem('token');
  }
  getToken(): string {
    return localStorage.getItem('token');
  }
  

  intercept(req, next) {
    let authService = this.injector.get(UsersDataService);
    let tokenizedReq = req.clone({
      setHeader: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });
    return next.handle(tokenizedReq);
  }
}
