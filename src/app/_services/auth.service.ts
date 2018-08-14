import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Options } from '../../../node_modules/@types/selenium-webdriver/opera';

@Injectable()
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  userToken: any;

constructor(private http: Http) { }

login(model: any) {
  return this.http.post(this.baseUrl + 'login', model, this.requestOptions()).map((response: Response) => {
    const user = response.json();
    if (user && user.tokenString) {
      localStorage.setItem('token', user.tokenString);
      this.userToken = user.tokenString;
    }
  });
}

register(model: any) {
  return this.http.post(this.baseUrl + 'register', model, this.requestOptions());
}

private requestOptions() {
  const headers = new Headers({'Content-type': 'application/json'});
  return new RequestOptions({headers: headers});
}
}