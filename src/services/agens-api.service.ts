import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { AgensRequestQuery } from '../models/agens-request-query';
import { AgensResponseResult } from '../models/agens-response-result';

@Injectable()
export class AgensApiService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private apiUrl = 'http://127.0.0.1:8085/api/v1/demo';

  constructor (
    private http: Http
  ) {}

  createAuthorizationHeader( token:String ):Headers {
    return new Headers({'Content-Type': 'application/json', 'Authorization':token}); 
  }

  getToken(){
    if(localStorage.getItem('currentUser')){
      let user = JSON.parse( localStorage.getItem('currentUser') );
      if(user.token && user.token !== "") return user.token;
    }
    return "";
  }

  dbMeta() {
    const url = `${this.apiUrl}/meta`;
    var headers = this.createAuthorizationHeader(this.getToken());

    console.log("dbMeta()");

    return this.http
      .get(url,{headers: headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  dbQuery( request:AgensRequestQuery ){
    const url = `${this.apiUrl}/query`;
    var headers = this.createAuthorizationHeader(this.getToken());
    // var queryRequest = { 
    //   "sql" : "match path=(a:production {'title': 'Haunted House'})-[]-(b:company {'name': 'Ludo Studio'}) return path limit 10" 
    // };

    console.log("dbQuery():");

    return this.http
      .post(url, JSON.stringify(request), {headers: headers})
      .toPromise()
      .then(res => {
        return res.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}