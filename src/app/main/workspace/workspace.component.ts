import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TdMediaService } from '@covalent/core';
import { MdDialog } from '@angular/material';

import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { TdDialogService } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';

@Component({
  selector: 'ag-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {

  sourcesData: any[] = [
    { Name: 'Cinema', File: 'user01_cinema_research.prj', Date: '2017.04.11', Comment: 'Cinema type', },
    { Name: 'Car', File: 'user01_car_research.prj', Date: '2017.04.13', Comment: 'kinds of cars', },
    { Name: 'Starbucks', File: 'user01_tea_research.prj', Date: '2017.04.17', Comment: 'sales rate', },
  ];

  sourcesColumns: ITdDataTableColumn[] = [
    { name: 'Name', label: 'Name' },
    { name: 'File', label: 'File' },
    { name: 'Date', label: 'Date' },
    { name: 'Comment', label: 'Comment' },
  ];

  filteredDataSource: any[] = this.sourcesData;
  filteredTotalSource: number = this.sourcesData.length;  
  
  searchTermSource: string ='';
  sortBySource: string = '';
  sortOrderSource: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  constructor(
    public media: TdMediaService,
    private _dialogService: TdDialogService,
    private _dataTableService: TdDataTableService,
    public dialog: MdDialog,
  ){}

  ngOnInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();
    // load all users => users[]
  }

  sortSource(sortSourceEvent: ITdDataTableSortChangeEvent): void {
    this.sortBySource = sortSourceEvent.name;
    this.sortOrderSource = sortSourceEvent.order;
    this.filterSource();
  }

  searchSource(searchTermSource: string): void {
    this.searchTermSource = searchTermSource;
    this.filterSource();
  }

  filterSource() {
    let newDataSource: any[] = this.sourcesData;
    newDataSource = this._dataTableService.filterData(newDataSource, this.searchTermSource, true);
    this.filteredTotalSource = newDataSource.length;
    newDataSource = this._dataTableService.sortData(newDataSource, this.sortBySource, this.sortOrderSource);
    this.filteredDataSource = newDataSource;
  }

  openEditGraph(): void {
  }

  deleteGraph(): void {
  }

}
