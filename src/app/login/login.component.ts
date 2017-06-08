import { Component, OnInit, AfterViewInit } from '@angular/core';
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
export class LoginComponent implements OnInit, AfterViewInit {

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
    private auth: AuthenticationService,
    private alertService: AlertService,

    private _loadingService: TdLoadingService
  ) { 
    this.request = new AgensRequestConnect();
  }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    // for TEST
    // this.request.host = '27.117.163.21';
    // this.request.port = '15602';
    this.request.host = '127.0.0.1';
    this.request.port = '6179';
    this.request.db = 'imdb';
    this.request.user_id = 'agraph';
    this.request.user_pw = '';
  }

  ngAfterViewInit(){
    // reset login status
    this.auth.logout();
  }

  login() {
    this.loading = true;

    this.auth.login(this.request)
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