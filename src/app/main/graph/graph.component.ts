import { Component, HostBinding, AfterViewInit, ElementRef, OnInit, Input } from '@angular/core';
import { TdMediaService, TdDialogService } from '@covalent/core';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';

import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';

import { WindowRefService } from '../../../services/window-ref.service';
import { AgensApiService } from '../../../services/agens-api.service';
import { AgensRequestQuery } from '../../../models/agens-request-query';
import { AgensResponseResult } from '../../../models/agens-response-result';

declare var $: any;
declare var CodeMirror: any;

@Component({
  selector: 'ag-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements AfterViewInit, OnInit {
  
  window:any = null;
  graph:any = null;

  result:AgensResponseResult = null;  
  result_json:any = {};
  result_json_expand:boolean = false;

  query:string =
`match path=(a:production {'title': 'Haunted House'})-[]-(b:company) 
return path 
limit 10
`;


  title: string = "No title"
  title1: string = "No title"
  
  cy: any;
  div_cy: any;

  editor: any;
  editorRef: any;

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

  constructor(
    public media: TdMediaService,
    private el: ElementRef,
    public dialog: MdDialog,
    private _dialogService: TdDialogService,
    private _dataTableService: TdDataTableService,
    private winRef: WindowRefService,
    private apiSerivce: AgensApiService
  ) {
    this.window = winRef.nativeWindow;    
  }

  ngOnInit(): void { 
    // console.log("GraphComponent.ngOnInit():");
    this.media.broadcast(); 
  }

  ngAfterViewInit(): void {
    console.log("GraphComponent.ngAfterViewInit():");

    // broadcast to all listener observables when loading the page
    this.media.broadcast();

    // CodeMirror Editor
    this.editorRef = this.el.nativeElement.querySelector('textarea#agensQuery');
    // get mime type
    var mime = 'application/x-cypher-query';
    this.editor = CodeMirror.fromTextArea( this.editorRef, {
      mode: mime,
      indentWithTabs: true,
      smartIndent: true,
      lineNumbers: true,
      matchBrackets : true,
      autofocus: true,
      theme: 'eclipse'
    });

    // AgensGraph Factory
    this.graph = this.window.agens.graphFactory(
        this.el.nativeElement.querySelector('div#agens-graph')
      );
    // Cytoscape의 canvas가 영역을 전부 덮어버리기 때문에, 툴바 우선순위를 올려야 함
    this.el.nativeElement.querySelector('span#agens-graph-toolbar').style.zIndex = "999";
  }

  // cytoscape makeLayout & run
  changeLayout(index){
    if( this.window.agens === undefined || this.graph === undefined ) return;
    let selectedLayout = this.window.agens.layoutTypes[Number(index)];
    console.log( "change layout : "+selectedLayout.name );

    var layout = this.graph.makeLayout(selectedLayout);
    layout.run();
    this.graph.fit( this.graph.elements(), 50 ); // fit to all the layouts    
  }

  // request query to server
  requestQuery(){
    let sql:string = String(this.editor.getValue());
    console.log( "** SQL: \n"+sql );
    this.result_json_expand = false;
    
    let query:AgensRequestQuery = new AgensRequestQuery( sql );
    this.apiSerivce.dbQuery(query)
      .then(data => {
        this.result = new AgensResponseResult(data);
        this.result_json = this.result.getRows();
      });     
  }

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
