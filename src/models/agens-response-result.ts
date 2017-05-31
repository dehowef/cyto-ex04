import { AgensTypePath, AgensTypeVertex, AgensTypeEdge } from './agens-data-types';

export class AgensResponseResult {
  query: AgensResponseResultQuery = null;
  meta: AgensResponseResultMeta[] = [];
  rows: any[] = [];
  size: number;
  message: string;
  finishTime: number;

  constructor( data:any ){
    if( data.hasOwnProperty('query')) this.query = new AgensResponseResultQuery(data.query);
    if( data.hasOwnProperty('meta')) {
      for( let item of data['meta'] ){
        this.meta.push( new AgensResponseResultMeta(item) );
      }
    }
    if( data.hasOwnProperty('rows')) {
      for( let item of data['rows'] ){
        this.rows.push( item );
      }
    }
    if( data.hasOwnProperty('size')) this.size = data.size;
    if( data.hasOwnProperty('message')) this.message = data.message;
    if( data.hasOwnProperty('finishTime')) this.finishTime = data.finishTime;
  }

  public getRows() {
    return this.rows;
  }
  public getMeta() {
    return this.meta;
  }
  public getQuery(){
    return this.query;
  }

  public getCyElements():any {
    let eles:any = {
      nodes: [],
      edges: []
    };

    for( let row of this.rows ){
      let idx = 0;
      for( let meta of this.meta ){
        let colData:any = row[idx++];
        switch( meta.type ){
          case 'graphpath': {
            let path:AgensTypePath = new AgensTypePath(colData);
            eles.nodes = eles.nodes.concat( path.toNodes() );
            eles.edges = eles.edges.concat( path.toEdges() );
            break;
          }
          case 'vertex': {
            let vertex:AgensTypeVertex = new AgensTypeVertex(colData);
            eles.nodes.push( vertex.toNode() );
            break;
          }
          case 'edge': {
            let edge:AgensTypeEdge = new AgensTypeEdge(colData);
            eles.edges.push( edge.toEdge() );
            break;
          }
        }
      }
    }  
    return eles;
  }

};

export class AgensResponseResultQuery {
  sessionId: string;
  requestId: number;
  requestTime: number;
  sql: string;

  constructor( data:any ){
    if( data.hasOwnProperty('sessionId')) this.sessionId = data.sessionId;
    if( data.hasOwnProperty('requestId')) this.requestId = data.requestId;
    if( data.hasOwnProperty('requestTime')) this.requestTime = data.requestTime;
    if( data.hasOwnProperty('sql')) this.sql = data.sql;
  }
};

export class AgensResponseResultMeta {
  label: string;
  type: string;

  constructor( data:any ){
    if( data.hasOwnProperty('label')) this.label = data.label;
    if( data.hasOwnProperty('type')) this.type = data.type;
  }
};