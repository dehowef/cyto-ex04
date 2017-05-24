import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { AgensRequestConnect } from '../models/agens-request-connect';

@Injectable()
export class AuthenticationService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private apiUrl = 'http://127.0.0.1:8085/api/v1/demo';

  constructor(
    private http: Http
  ) { }

  createAuthorizationHeader( token:String ):Headers {
    return new Headers({'Content-Type': 'application/json', 'Authorization':token}); 
  }

  login(request:AgensRequestConnect) {
    const url = `${this.apiUrl}/connect`;

    return this.http
      .post(url, JSON.stringify(request), {headers: this.headers})
      .map((response: Response) => {
        let user = response.json();
        if( user && user.token ){
            user.host = request.host;
            user.port = request.port;
            user.db = request.db;
            user.user_id = request.user_id;
            console.log('login(): \n'+JSON.stringify(user));
            
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
        }
      });
      // .toPromise()
      // .then((response: Response) => {})
      // .catch(this.handleError);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}