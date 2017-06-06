import { Component, ViewChild, HostBinding, AfterViewInit, ElementRef, OnInit, Input } from '@angular/core';
import { TdMediaService, TdDialogService } from '@covalent/core';
import { Router } from '@angular/router';

import { WindowRefService } from '../../../services/window-ref.service';
import { AgensApiService } from '../../../services/agens-api.service';
import { DialogsService } from '../../../services/dialogs.service';

import { AgensRequestQuery } from '../../../models/agens-request-query';
import { AgensResponseMetaDb, AgensResponseMetaGraph, AgensResponseMetaLabel } from '../../../models/agens-response-meta';
import { AgensResponseResult, AgensResponseResultMeta, AgensResponseResultQuery } from '../../../models/agens-response-result';

// ** NOTE : 포함하면 AOT 컴파일 오류 떨어짐 (row detail 기능 때문에 사용)
import { DatatableComponent } from '@swimlane/ngx-datatable/src/components/datatable.component';


declare var $: any;
declare var CodeMirror: any;

@Component({
  selector: 'ag-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class GraphComponent implements AfterViewInit, OnInit {
  
  window:any = null;
  graph:any = null;

  metaData: AgensResponseMetaDb = null;

  result:AgensResponseResult = null;  
  result_json:any = {};
  result_json_expand:boolean = false;
  result_table_expand:boolean = false;
  result_table_rows:any[] = [];
  result_table_columns: any[] = [];
  result_labels:any[] = [];

  loading:boolean = false;
  loading_table:boolean = false;

  query:string =
`match path=(a:production {'title': 'Haunted House'})-[]-(b:company) 
return path 
limit 10
`;

  title: string = "No title"
  editor: any;
  editorRef: any;

  // ** NOTE : 포함하면 AOT 컴파일 오류 떨어짐 (offset 지정 기능 때문에 사용)
  @ViewChild('resultTable') resultTable: any;

  constructor(
    public media: TdMediaService,
    private el: ElementRef,
    private dialogsService: DialogsService,
    private _dialogService: TdDialogService,
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
    this.graph = this.window.agens.graph.graphFactory(
        this.el.nativeElement.querySelector('div#agens-graph')
      );
    // Cytoscape의 canvas가 영역을 전부 덮어버리기 때문에, zIndex 우선순위를 올려야 함
    this.el.nativeElement.querySelector('span#agens-graph-toolbar').style.zIndex = "9";
    // this.el.nativeElement.querySelector('md-chip-list#agens-graph-labels').style.zIndex = "9";

    // md-chip TEST
    this.result_labels = this.getLabels( this.window.agens.graph.demoData[0] );
  }

  // cytoscape makeLayout & run
  changeLayout(index){
    if( this.window.agens.graph === undefined || this.graph === undefined ) return;
    let selectedLayout = this.window.agens.graph.layoutTypes[Number(index)];
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
        this.setResultTable(this.result);
        this.result_table_expand = true;

        let eles = this.result.getCyElements();
        this.window.agens.graph.loadData( eles );
        this.result_labels = this.getLabels( eles );

        // 이것 때문에 테이블의 데이터가 비정상적으로 표시됨 (이유 모름)
        this.setResultJson(this.result);  
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
    let temp:string = JSON.stringify( result.getRows() );
    this.result_json = JSON.parse( temp );
    // console.log(this.result_json);
  }
  setResultTable( result:AgensResponseResult ){
    this.result_table_columns = result.getTableColumns();
    this.result_table_rows = result.getTableRows();
    this.resultTable.offset = 0;
  }

  showColumnDetail(label: string, value: any): void {
    this.dialogsService.dlgShowColumnDetail(label, value);
  }
  // Table page event
  onTablePage(pageNumber:number) {
    console.log(`ngx_datatable: pageNumber=${pageNumber}`);
  }
  toggleExpandRow(row, col) {
    // console.log('Toggled Expand Row!', row, col);
    row._selectedColumn = col;
    this.resultTable.rowDetail.toggleExpandRow(row);
  }
  onRowDetailToggle(event) {
    // console.log('Detail Toggled', event);   // type=row, value={row}
  }

  clearGraph(){
    this.graph.elements().remove();
    this.graph.style( this.window.agens.graph.defaultStyle );

    this.result = null;
    this.result_json = {};
    this.result_json_expand = false;
    this.result_table_expand = false;
    this.result_table_columns = [];
    this.result_table_rows = [];
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


}
