import { Component, HostBinding, AfterViewInit, ElementRef, OnInit, Input } from '@angular/core';
import { TdMediaService, TdDialogService } from '@covalent/core';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';

import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';

declare var $: any;
declare var CodeMirror: any;

@Component({
  selector: 'ag-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements AfterViewInit, OnInit {
  
  title: string = "No title"
  title1: string = "No title"
  
  cy: any;
  div_cy: any;

  editor: any;
  div_editor: any;

  show = false;
  hide = false;
  
  newGraphOpen = true;
  newGraphSave = true;

  data: any[] = [
    { a: 'Born', m: 'Tagline', b: 'Born' },
  ];

  columns: ITdDataTableColumn[] = [
    { name: 'a', label: 'a' },
    { name: 'm', label: 'm' },
    { name: 'b', label: 'd' },
  ];

  filteredData: any[] = this.data;
  filteredTotal: number = this.data.length; 

  sortBy: string = 'a';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending; 

  object: any = {
    "stringProperty": "This is a string",
    "dateProperty": "2017-04-07T08:32:52.933Z",
    "numberProperty": 10000,
    "booleanProperty": true,
    "numberArray": [      1,      2,      3,      4,      5,      6    ],
    "objectArray": [      {},      {}    ],
    "longNameeeeeeeeeeeProoooopeeeeeeeeeeertyy": "got truncated",
    "emptyObject": {},
    "emptyArray": []
  };

  constructor(
    public media: TdMediaService,
    private el: ElementRef,
    public dialog: MdDialog,
    private _dialogService: TdDialogService,
    private _dataTableService: TdDataTableService,
  ) {
  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();

    this.div_editor = this.el.nativeElement.querySelector('textarea#code');
    // console.log(div);

    // CodeMirror
    var mime = 'application/x-cypher-query';
    // get mime type
    this.editor = CodeMirror.fromTextArea( this.div_editor, {
      mode: mime,
      indentWithTabs: true,
      smartIndent: true,
      lineNumbers: true,
      matchBrackets : true,
      autofocus: true,
      theme: 'eclipse'
    });
  }

  ngOnInit(): void { this.media.broadcast(); }

  toggleError() {    
    this.hide = !this.hide; 
  }

  toggleSaveFile(){
    this.newGraphSave = !this.newGraphSave; 
  }

  toggleInstall() {    
    this.show = !this.show; 
  }

  newGraphGard() {
    this.newGraphOpen = !this.newGraphOpen;
  }

  reset(): void {
  }
  openSaveGraph(): void {
  }
  openNewGraph(): void {
  }

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.filter();
  }

  filter(): void {
    let newData: any[] = this.data;
    newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
    this.filteredData = newData;
  } 

}
