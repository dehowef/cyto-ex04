import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { TdMediaService } from '@covalent/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { TdDialogService } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ag-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  adminData: any[] = [
    { PID: '1209', Database: 'Test1', User: 'Admin1', Application: 'Agens', Client: '192.156.0.12', Backendstart: '2017-04-14 17:11:04 KST', State: 'active', },
    { PID: '5209', Database: 'Test2', User: 'Admin2', Application: 'Manager', Client: '88.123.145.1', Backendstart: '2017-04-16 09:11:04 KST', State: 'idle', },
  ];

  adminColumns: ITdDataTableColumn[] = [
    { name: 'PID', label: 'PID' },
    { name: 'Database', label: 'Database' },
    { name: 'User', label: 'User' },
    { name: 'Application', label: 'Application' },
    { name: 'Client', label: 'Client' },
    { name: 'Backendstart', label: 'Backendstart' },
    { name: 'State', label: 'State' },
  ];

  filteredData: any[] = this.adminData;
  filteredTotal: number = this.adminData.length;  
  
  searchTerm: string ='';
  sortBy: string = 'PID';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  constructor(
    public media: TdMediaService,
    public dialog: MdDialog,
    private _dialogService: TdDialogService,
    private _dataTableService: TdDataTableService,
  ) { }

  ngOnInit() {
    this.filter();
  }

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.filter();
  }

  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filter();
  }

  filter(): void {
    let newData: any[] = this.adminData;
    newData = this._dataTableService.filterData(newData, this.searchTerm, true);
    this.filteredTotal = newData.length;
    newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
    this.filteredData = newData;
  }

  deleteGraph(): void {
  }

}
