import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TdLoadingService } from '@covalent/core';

import { AlertService } from '../../services/alert.service';
import { AuthenticationService } from '../../services/authentication.service';

import { AgensRequestConnect } from '../../models/agens-request-connect';


@Component({
  selector: 'ag-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  request: AgensRequestConnect;

  loading = false;
  returnUrl: string;
  databaseValue: string;

  data = [
    {viewValue: 'BIT'},
    {viewValue: 'NINE'},
    {viewValue: 'MANAGER'}
  ];
    
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,

    private _loadingService: TdLoadingService
  ) { 
    this.request = new AgensRequestConnect();
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    // for TEST
    this.request.host = '27.117.163.21';
    this.request.port = '15602';
    this.request.db = 'imdb';
    this.request.user_id = 'agraph';
    this.request.user_pw = '';
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.request)
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
  }

}