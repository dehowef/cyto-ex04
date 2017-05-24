export class AgensResponseMetaDb {
  oid: number;
  name: string;
  owner: string;
  desc: string;
  graphs: AgensResponseMetaGraph[] = [];

  constructor( data:any ){
    if( data.hasOwnProperty('graphs')) {
      for( let item of data['graphs'] ){
        this.graphs.push( new AgensResponseMetaGraph(item) );
      }
    }
    if( data.hasOwnProperty('oid')) this.oid = data.oid;
    if( data.hasOwnProperty('name')) this.name = data.name;
    if( data.hasOwnProperty('owner')) this.owner = data.owner;
    if( data.hasOwnProperty('desc')) this.desc = data.desc;
  }

  toTreeData():any {
    let data = { id: this.oid, name: this.name, owner: this.owner, desc: this.desc, children: [] };
    for( let graph of this.graphs ){
      data.children.push( graph.toTreeData() );
    }
    return data;
  }
};

export class AgensResponseMetaGraph{
  oid: number;
  name: string;
  desc: string;
  vertexes: AgensResponseMetaLabel[] = [];
  edges: AgensResponseMetaLabel[] = [];

  constructor( data:any ){
    if( data.hasOwnProperty('vertexes')) {
      for( let item of data['vertexes'] ){
        this.vertexes.push( new AgensResponseMetaLabel(item) );
      }
    }    
    if( data.hasOwnProperty('edges')) {
      for( let item of data['edges'] ){
        this.edges.push( new AgensResponseMetaLabel(item) );
      }
    }    
    if( data.hasOwnProperty('oid')) this.oid = data.oid;
    if( data.hasOwnProperty('name')) this.name = data.name;
    if( data.hasOwnProperty('desc')) this.desc = data.desc;
  }

  toTreeData():any {
    let data = { id: this.oid, name: this.name, desc: this.desc, children: [
      { id: this.oid+0.1, name: "vertexex", count: this.vertexes.length, children: []},
      { id: this.oid+0.2, name: "edges", count: this.edges.length, children: []},
    ]};
    for( let label of this.vertexes ){
      data.children[0].children.push( label.toTreeData() );
    }
    for( let label of this.edges ){
      data.children[1].children.push( label.toTreeData() );
    }
    return data;
  }
};

export class AgensResponseMetaLabel {
  g_oid: number;
  oid: number;
  type: string;
  name: string;
  owner: string;
  desc: string;
  count_sql: string;
  count: number;

  constructor( data:any ){
    if( data.hasOwnProperty('g_oid')) this.g_oid = data.og_oidid;
    if( data.hasOwnProperty('oid')) this.oid = data.oid;
    if( data.hasOwnProperty('type')) this.type = data.type;
    if( data.hasOwnProperty('name')) this.name = data.name;
    if( data.hasOwnProperty('owner')) this.owner = data.owner;
    if( data.hasOwnProperty('desc')) this.desc = data.desc;
    if( data.hasOwnProperty('count_sql')) this.count_sql = data.count_sql;
    if( data.hasOwnProperty('count')) this.count = data.count;
  }

  toTreeData():any {
    return { id: this.oid, name: this.name, type: this.type, desc: this.desc, owner: this.owner, count: this.count };
  }
};