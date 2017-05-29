import { NgModule, Type } from '@angular/core';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Covalent Modules
import { CovalentCoreModule } from '@covalent/core';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';

// External Modules
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TreeModule } from 'angular-tree-component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

// Router
import { appRoutes, appRoutingProviders } from './app.routes';

// Components
import { AppComponent } from './app.component';

import { AlertComponent } from './alert/alert.component';
import { LoginComponent } from './login/login.component';

import { MainComponent } from './main/main.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { GraphComponent } from './main/graph/graph.component';
import { WorkspaceComponent } from './main/workspace/workspace.component';
import { AdminComponent } from './main/admin/admin.component';
import { HelpComponent } from './main/help/help.component';

// Services
import { AuthGuardService } from '../services/auth-guard.service';
import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';
import { AgensApiService } from '../services/agens-api.service';
import { WindowRefService } from '../services/window-ref.service';

// Reuse Strategy
import {RouteReuseStrategy} from "@angular/router";
import {CustomReuseStrategy} from "./reuse-strategy";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DashboardComponent,
    LoginComponent,
    AlertComponent,
    GraphComponent,
    AdminComponent,
    HelpComponent,
    WorkspaceComponent,
  ], // directives, components, and pipes owned by this NgModule
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CovalentCoreModule,
    CovalentHighlightModule,
    CovalentMarkdownModule,
    appRoutes,
    NgxChartsModule,
    TreeModule,
    NgxDatatableModule
  ], // modules needed to run this module
  providers: [
    appRoutingProviders,
    Title,
    AlertService,
    AuthGuardService,
    AuthenticationService,
    AgensApiService,
    WindowRefService,
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}
  ], // additional providers needed for this module
  entryComponents: [ ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
