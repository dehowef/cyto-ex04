import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Http, Response, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { LocalStorageUtil } from './localstorage.util';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router
  ) { }
/*
  removeStorage(key) {
    try {
        localStorage.removeItem(key);
        localStorage.removeItem(key + '_expiresIn');
    } catch(e) {
        console.log('removeStorage: Error removing key ['+ key + '] from localStorage: ' + JSON.stringify(e) );
        return false;
    }
    return true; 
  }

  getStorage(key) {
    var now = Date.now();  //epoch time, lets deal only with integer
    // set expiration for storage
    var expiresIn = Number(localStorage.getItem(key+'_expiresIn'));
    if( expiresIn===undefined || expiresIn===null ){ 
      expiresIn = 0; 
    }

    if (expiresIn < now) {  // Expired
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

  setStorage(key, value, expires) {
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
*/
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if ( LocalStorageUtil.getStorage('currentUser') ) {
        // logged in so return true
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

}
