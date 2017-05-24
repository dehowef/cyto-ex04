import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { TdMediaService, TdDialogService } from '@covalent/core';
import { Router } from '@angular/router';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';

import { AgensApiService } from '../../../services/agens-api.service';
import { AgensResponseMetaDb, AgensResponseMetaGraph, AgensResponseMetaLabel } from '../../../models/agens-response-meta';

@Component({
  selector: 'ag-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
//  viewProviders: [ ItemsService, UsersService, ProductsService, AlertsService ],
})
export class DashboardComponent implements OnInit, AfterViewInit {

  host: string;
  port: string;
  db: string;
  user_id: string;

  metaData: AgensResponseMetaDb = null;
  treeData: any = [];

  data: any[] = [
    { Name: 'Line List Items with Avatars and inset dividers' },
    { Name: 'A reader will be distracted by the readable content of a page' },
    { Name: 'A reader will be distracted by the readable content of a page' },
  ];
  columns: ITdDataTableColumn[] = [
    { name: 'Name', label: 'Name',},
  ];

  filteredData: any[] = this.data;
  filteredTotal: number = this.data.length;

  searchTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 1;
  pageSize: number = 5;
  
  constructor(
    public media: TdMediaService,
    private el: ElementRef,
    private _dialogService: TdDialogService,
    private _dataTableService: TdDataTableService,
    private apiSerivce: AgensApiService
  ) { }

  ngOnInit(): void { this.filter(); }

  ngAfterViewInit(): void {
    if (localStorage.getItem('currentUser')) {
        let user = JSON.parse( localStorage.getItem('currentUser') );
        if(user.host) this.host = user.host;
        if(user.port) this.port = user.port;
        if(user.db) this.db = user.db;
        if(user.user_id) this.user_id = user.user_id;
    }

    // broadcast to all listener observables when loading the page
    this.media.broadcast();
    this.filter();

    // display metaData to treeData
    this.loadMetaData();
  }
    
  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filter();
  }

  page(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
    this.filter();
  }

  filter(): void {
    let newData: any[] = this.data;
    newData = this._dataTableService.filterData(newData, this.searchTerm, true);
    this.filteredTotal = newData.length;
    newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
    this.filteredData = newData;
  }

  //아래는 트리와 테이블에서 사용함 
  focusedNodeName = null;
  focusedNodeColumnName = null;

  nodes = [
    {
      id: 1,
          name: '서버1',
          children: [
            { id: 8, 
              name: "graph_path",
              children: [
                {id: 9, name: "agens1"},
                {id: 10, name: "agens2"},
                {id: 11, name: "agens3", 
                children: [ 
                  { id: 12, name: "Vertex",
                    children: [
                      {id: 14, name: "Company"}, 
                      {id: 15, name: "Person"}
                    ]
                  }, {id: 13, name: "Edge",
                      children: [
                        {id: 16, name: "actor_in"},
                        {id: 17, name: "actress_in"},
                        {id: 18, name: "is_member_of"}
                      ]
                     }
                  ]
                }
              ]
            }
          ]
    }
  ];

  personColumns = [ {prop: '속성1'}, {prop: '속성2'}, {prop: '속성3'}, {prop: '속성4'}, {prop: '속성5'}];
  dataColumns_1 = [ {prop: '필드'}, {prop: '타입'}, {prop: '키'}, {prop: '설명'}, {prop: '널여부'}, {prop: '기본'}, {prop: '확장정보'}];
  vertexColumns = [{prop: '이름'}, {prop: '종류'}, {prop: '설명'}];
  edgeColumns = [{prop: '이름'}, {prop: '종류'}, {prop: '설명'}];
  tableColumns = [{prop: '이름'}, {prop: '종류'}, {prop: '설명'}];
  databaseColumns = [{prop: '데이터베이스명'}, {prop: '사용자'}, {prop: '비밀번호'}];
  serverColumns = [{prop: '호스트명'}, {prop: '포트번호'}, {prop: '데이터베이스명'}, {prop: '사용자'}, {prop: '비밀번호'}];

  personRows = [{속성1: '데이터1', 속성2: '데이터1', 속성3: '데이터1', 속성4: '데이터1', 속성5: '데이터1'}, 
              {속성1: '데이터1', 속성2: '데이터1', 속성3: '데이터1', 속성4: '데이터1', 속성5: '데이터1'},
              {속성1: '데이터1', 속성2: '데이터1', 속성3: '데이터1', 속성4: '데이터1', 속성5: '데이터1'},
              {속성1: '데이터1', 속성2: '데이터1', 속성3: '데이터1', 속성4: '데이터1', 속성5: '데이터1'}];

  dataRows_1 = [{필드: 'id', 타입: 'graphid', 널여부: 'NO'}, 
              {필드: 'start', 타입: 'graphid', 널여부: 'NO'}, 
              {필드: 'end', 타입: 'graphid', 널여부: 'NO'},
              {필드: 'properties', 타입: 'graphid', 널여부: 'NO'}];

  vertexRows = [{이름: 'vertex.company', 종류: 'vertex', 설명: '설명1'},
                {이름: 'vertex.person', 종류: 'vertex', 설명: '설명2'}];

  edgeRows = [{이름: 'edge.actor_in', 종류: 'edge', 설명: '설명2'},
              {이름: 'edge.actress_in', 종류: 'edge', 설명: '설명2'},
               {이름: 'edge.is_member_of', 종류: 'edge', 설명: '설명2'}];

  tableRows = [{이름: 'vertex.company', 종류: 'vertex', 설명: '설명1'},
                {이름: 'vertex.person', 종류: 'vertex', 설명: '설명2'},
                {이름: 'edge.actor_in', 종류: 'edge', 설명: '설명2'}, 
               {이름: 'edge.actress_in', 종류: 'edge', 설명: '설명2'},
               {이름: 'edge.is_member_of', 종류: 'edge', 설명: '설명2'}];

  databaseRows = [{데이터베이스명: 'agens1', 사용자: 'bylee1', 비밀번호: '1234'},
                  {데이터베이스명: 'agens2', 사용자: 'bylee2', 비밀번호: '1234'},
                  {데이터베이스명: 'agens3', 사용자: 'bylee3', 비밀번호: '1234'}];             

  serverRows = [{호스트명: '192.168.100.1', 포트번호: '6179', 데이터베이스명: 'agens1', 사용자: 'bylee1', 비밀번호: '1234'},
                  {호스트명: '192.168.100.1', 포트번호: '6179', 데이터베이스명: 'agens2', 사용자: 'bylee2', 비밀번호: '1234'},
                  {호스트명: '192.168.100.1', 포트번호: '6179', 데이터베이스명: 'agens3', 사용자: 'bylee3', 비밀번호: '1234'}];

  onInitialized(tree, $event){
    if(tree.treeModel.isExpanded) tree.treeModel.expandAll();

    //tree.treeModel.focusedNode.level == 1
    this.focusedNodeName = this.serverRows;
    this.focusedNodeColumnName = this.serverColumns;
  }

  onFocus(tree, $event) {
    if (tree.treeModel.focusedNode.level == 1){
      this.focusedNodeName = this.serverRows;
      this.focusedNodeColumnName = this.serverColumns;
    } else if (tree.treeModel.focusedNode.level == 2){
      this.focusedNodeName = this.databaseRows;
      this.focusedNodeColumnName = this.databaseColumns;
    } else if(tree.treeModel.focusedNode.level == 3) {
    //console.log("nodeName: "+tree.treeModel.focusedNode.data.name);
    //console.log("level:"+tree.treeModel.focusedNode.level);
      this.focusedNodeName = this.tableRows;
      this.focusedNodeColumnName = this.tableColumns;
      //console.log("aaa:"+this.focusedNodeColumnName[0].prop);
    } else if(tree.treeModel.focusedNode.level == 4) {
      if ( tree.treeModel.focusedNode.data.name == 'Vertex') {
        this.focusedNodeName = this.vertexRows;
        this.focusedNodeColumnName = this.vertexColumns;
      } else {
        this.focusedNodeName = this.edgeRows;
        this.focusedNodeColumnName = this.edgeColumns;
      }
    } else if (tree.treeModel.focusedNode.level == 5){
      //console.log("level:"+tree.treeModel.focusedNode.level);
      this.focusedNodeName = this.personRows;
      this.focusedNodeColumnName = this.personColumns;
    }
  }

  onActivate(tree, $event) {
    //console.dir(tree.treeModel);
    console.log("level:"+tree.treeModel.focusedNode.level);
    console.log("name:"+tree.treeModel.focusedNode.data.name);
    //this.nodes[1].children.push({id: 9, name: '새로운 자식노드'});
    //tree.treeModel.update();
    //console.log("name:"+tree.treeModel.nodes);
    //console.log("length:"+tree.treeModel.focusedNode.children.length);//focusedNode 대신에 nodes['1'] 가능
    //console.log("root:"+tree.treeModel.focusedNode.isRoot);
    //console.log("leaf:"+tree.treeModel.focusedNode.isLeaf);
  }

  rawEvent: MouseEvent;
  contextmenuRow: any;


  onContextMenu(contextMenuEvent) {
    console.log(contextMenuEvent);

    this.rawEvent = contextMenuEvent.event;
    this.contextmenuRow = contextMenuEvent.row;
    
    contextMenuEvent.event.preventDefault();
    contextMenuEvent.event.stopPropagation();
  }

  // call API: meta
  loadMetaData(){
    if(!localStorage.getItem('currentUser')) return;

    this.apiSerivce.dbMeta()
      .then(data => {
        this.metaData = new AgensResponseMetaDb(data);
        this.treeData = [ this.metaData.toTreeData() ];
      });     
  }
}
