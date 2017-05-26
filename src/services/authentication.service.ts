import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import * as GlobalConfig from '../app/global.config';

import { AgensRequestConnect } from '../models/agens-request-connect';

@Injectable()
export class AuthenticationService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private apiUrl = GlobalConfig.AGENS_DEMO_API;
  private userKey = GlobalConfig.USER_KEY;

  constructor(
    private http: Http
  ) { }

  public createAuthorizationHeader( token:String ):Headers {
    return new Headers({'Content-Type': 'application/json', 'Authorization':token}); 
  }

  public login(request:AgensRequestConnect) {
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
            
            // auto expire of localStorage = 3600 seconds
            this.setStorage( this.userKey, JSON.stringify(user), 3600 );
        }
      });
  }

  public getToken():string {
    let data = this.getStorage(this.userKey);
    if( data && data !== "" ){
      let user = JSON.parse( data );
      if( user.token && user.token !== "") return user.token;
    }
    return null;
  }

  public isLogin():boolean {    
    return this.getToken() !== null ? true : false;
  }

  public logout():boolean {

    let token = this.getToken();
    if( !token ) return false;
    
    // release connection in server
    this.releaseConnection();
    // remove user from local storage to log user out
    this.removeStorage( this.userKey );

    return true;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private releaseConnection(){
    let token = this.getToken();
    if( !token ) return;

    // release connection in server
    const url = `${this.apiUrl}/disconnect`;
    return this.http.get(url, {headers: this.createAuthorizationHeader(token)})
      .toPromise()
      .then((response: Response) => {
        console.log('logout() => '+JSON.stringify(response.json()));
      })
      .catch(this.handleError);
  }

  private removeStorage(key) {
    try {
        localStorage.removeItem(key);
        localStorage.removeItem(key + '_expiresIn');
    } catch(e) {
        console.log('removeStorage: Error removing key ['+ key + '] from localStorage: ' + JSON.stringify(e) );
        return false;
    }
    return true; 
  }

  private getStorage(key) {
    // set expiration for storage
    var expiresIn = Number(localStorage.getItem(key+'_expiresIn'));
    if( expiresIn===undefined || expiresIn===null ){ 
      expiresIn = 0; 
    }

    var now = Date.now();
    if (expiresIn < now) {  // Expired
        console.log( `storage Expire('${key}'): ${expiresIn} < ${now}`);
        // if userKey, release connection in server
        if( key === this.userKey && expiresIn > 0 ) this.releaseConnection();

        this.removeStorage(key);
        return null;
    } else {
        try {
            var value = localStorage.getItem(key);
            return value;
        } catch(e) {
            console.log('getStorage: Error reading key ['+ key + '] from localStorage: ' + JSON.stringify(e) );
            return null;
        }
    }
  }

  private setStorage(key, value, expires) {
    if( expires===undefined || expires===null ){
        expires = (1*60*60);  // default: seconds for 1 hour
    } else {
        expires = Math.abs(expires); // make sure it's positive
    }

    var now = Date.now();  // millisecs since epoch time, lets deal only with integer
    var schedule = now + expires*1000; 
    try {
        localStorage.setItem(key, value);
        localStorage.setItem(key + '_expiresIn', String(schedule));
    } catch(e) {
        console.log('setStorage: Error setting key ['+ key + '] in localStorage: ' + JSON.stringify(e) );
        return false;
    }
    return true;
  }

}