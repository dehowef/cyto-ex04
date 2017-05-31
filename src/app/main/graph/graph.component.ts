import { Component, HostBinding, AfterViewInit, ElementRef, OnInit, Input } from '@angular/core';
import { TdMediaService, TdDialogService } from '@covalent/core';
// import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
// import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';

import { WindowRefService } from '../../../services/window-ref.service';
import { AgensApiService } from '../../../services/agens-api.service';
import { DialogsService } from '../../../services/dialogs.service';

import { AgensRequestQuery } from '../../../models/agens-request-query';
import { AgensResponseResult, AgensResponseResultMeta, AgensResponseResultQuery } from '../../../models/agens-response-result';


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
  result_json:any = null;
  result_json_expand:boolean = false;
  result_table:any = [];
  result_table_columns: ITdDataTableColumn[] = [];
  result_table_expand:boolean = false;
  result_labels:any[] = [];

  loading:boolean = false;

  query:string =
`match path=(a:production {'title': 'Haunted House'})-[]-(b:company) 
return path 
limit 10
`;

  title: string = "No title"
  editor: any;
  editorRef: any;

  show = false;
  hide = false;
  
  newGraphOpen = true;
  newGraphSave = true;

  data: any[] = [
    { a: 'Born', m: 'Tagline', b: 'Born' },
  ];
  filteredData: any[] = this.data;
  filteredTotal: number = this.data.length; 
  sortBy: string = 'a';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending; 

  constructor(
    public media: TdMediaService,
    private el: ElementRef,
    private dialogsService: DialogsService,
    // public dialog: MdDialog,
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
    // Cytoscape의 canvas가 영역을 전부 덮어버리기 때문에, zIndex 우선순위를 올려야 함
    this.el.nativeElement.querySelector('span#agens-graph-toolbar').style.zIndex = "9";
    // this.el.nativeElement.querySelector('md-chip-list#agens-graph-labels').style.zIndex = "9";

    // md-chip TEST
    this.result_labels = this.getLabels( this.window.agens.defaultElements );
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
    this.loading = true;
    this.clearGraph();
    
    let query:AgensRequestQuery = new AgensRequestQuery( sql );
    this.apiSerivce.dbQuery(query)
      .then(data => {
        this.result = new AgensResponseResult(data);
        this.setResultJson(this.result);
        this.setResultTable(this.result);
        this.result_table_expand = true;

        let eles = this.result.getCyElements();
        this.window.agens.loadData( eles );
        this.result_labels = this.getLabels( eles );

        this.loading = false;
      });
  }
  getLabels( eles:any ):any[] {
    let labels = new Map<string,any>();
    for( let item of eles['nodes'] ){
      if( labels.has(item.data.label) ) labels.get(item.data.label).count += 1;
      else {
        labels.set(item.data.label, { name: item.data.label, type: 'vertex', count: 1 });
      }
    }
    for( let item of eles['edges'] ){
      if( labels.has(item.data.label) ) labels.get(item.data.label).count += 1;
      else {
        labels.set(item.data.label, { name: item.data.label, type: 'edge', count: 1 });
      }
    }
    let labelArray:any[] = [];
    for( let key of Array.from(labels.keys()) ){
      labelArray.push(labels.get(key) );
    }
    return labelArray;
  }

  setResultJson( result:AgensResponseResult ){
    this.result_json = result.getRows();
  }
  setResultTable( result:AgensResponseResult ){
    let meta = result.getMeta();
    this.result_table_columns = [];
    for( let item of meta ){
      let isNumber:boolean = ['int', 'number', 'long'].indexOf(item.type) >= 0;
      let graphFormat:any = ['graphpath', 'vertex', 'edge', 'jsonb'].indexOf(item.type) >= 0 ?
              v => JSON.stringify(v).substr(0,80)+".." : undefined ;
      let col = { name: item.label, label: item.label, numeric: isNumber
              , sortable: (graphFormat === undefined), format: graphFormat };
      this.result_table_columns.push( col );
    }
    let rows = result.getRows();
    this.result_table = [];
    for( let row of rows ){
      let index = 0;
      let item:any = {};
      for( let col of meta ){
        item[col.label] = row[index++];
        // let isGraphElement:boolean = ['graphpath', 'vertex', 'edge', 'jsonb'].indexOf(col.type) >= 0;
        // if( isGraphElement ) item[col.label] = JSON.stringify(value).substr(0,100)+"..";
        // else item[col.label] = value;
      }
      this.result_table.push( item );
    }
  }
  showColumnDetail(label: string, value: any): void {
    this.dialogsService.dlgShowColumnDetail(label, value);
  }

  clearGraph(){
    this.graph.elements().remove();
    this.graph.style( this.window.agens.defaultStyle );

    this.result = null;
    this.result_json = null;
    this.result_json_expand = false;
    this.result_table_expand = false;
    this.result_table_columns = [];
    this.result_table = [];
    this.result_labels = [];
  }
  newGraph() {
    if( this.graph === undefined ) return;
    this.clearGraph();
  }

  dlgImgViewer(imgType:string){
    if( this.graph === undefined ) return;
    let imgSrc:any = null;
    if( imgType === 'PNG' ) imgSrc = this.graph.png();
    else imgSrc = this.graph.jpg();

    this.dialogsService.dlgImgViewer(imgType, imgSrc);
  }

  dlgFullScreen(){
    if( this.graph === undefined ) return;

    this.dialogsService.dlgFullScreenGraph( this.graph.json() );
  }

  cyUndo(): void{
    if( this.window.agens.api.unre === undefined ) return;
    this.window.agens.api.unre.undo();
  }
  cyRedo(): void{
    if( this.window.agens.api.unre === undefined ) return;
    this.window.agens.api.unre.redo();
  }
  cySelectLabel( labelType, labelName ){
    console.log(`clicked md-chip: label('${labelType}', '${labelName}')`);
    this.graph.elements(':selected').unselect();
    let type:string = (labelType == 'vertex') ? 'node' : 'edge';
    this.graph.elements(`${type}[label='${labelName}']`).select();
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
