import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import * as GlobalConfig from '../app/global.config';
import { AuthenticationService } from './authentication.service';

import { AgensRequestLabel } from '../models/agens-request-label';
import { AgensRequestQuery } from '../models/agens-request-query';
import { AgensResponseResult } from '../models/agens-response-result';

@Injectable()
export class AgensApiService {
  
  private apiUrl = `${window.location.protocol}//${window.location.host}/${GlobalConfig.AGENS_DEMO_API}`;

  constructor (
    private http: Http,
    private auth: AuthenticationService
  ) {
    if( GlobalConfig.DEV_MODE ) this.apiUrl = GlobalConfig.DEV_DEMO_API;
  }

  dbUser() {
    return this.auth.getUserInfo();
  }

  dbMeta() {
    const url = `${this.apiUrl}/db`;
    var headers = this.auth.createAuthorizationHeader(this.auth.getToken());
    console.log( `try dbMeta ==> ${url}`);

    return this.http
      .get(url,{headers: headers})
      .toPromise()
      .then(res => {
        return res.json();
      })
      .catch(this.handleError);
  }

  dbLabel( request:AgensRequestLabel ) {
    const url = `${this.apiUrl}/label`;
    var headers = this.auth.createAuthorizationHeader(this.auth.getToken());
    console.log( `try dbLabel ==> ${url}`);

    return this.http
      .post(url, JSON.stringify(request), {headers: headers})
      .toPromise()
      .then(res => {
        return res.json();
      })
      .catch(this.handleError);
  }

  dbLabelCount( request:AgensRequestLabel ) {
    const url = `${this.apiUrl}/label_count`;
    var headers = this.auth.createAuthorizationHeader(this.auth.getToken());
    console.log( `try dbLabelCount ==> ${url}`);

    return this.http
      .post(url, JSON.stringify(request), {headers: headers})
      .toPromise()
      .then(res => {
        return res.json();
      })
      .catch(this.handleError);
  }

  // request = { 
  //   "sql" : "match path=(a:production {'title': 'Haunted House'})-[]-(b:company {'name': 'Ludo Studio'}) return path limit 10" 
  // };
  dbQuery( request:AgensRequestQuery ){
    const url = `${this.apiUrl}/query`;
    var headers = this.auth.createAuthorizationHeader(this.auth.getToken());
    console.log( `try dbQuery ==> ${url}`);

    return this.http
      .post(url, JSON.stringify(request), {headers: headers})
      .toPromise()
      .then(res => {
        //console.log(JSON.stringify( res.json() ));
        return res.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}