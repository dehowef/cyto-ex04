export class AgensTypePath {
  vertexes: AgensTypeVertex[] = [];
  edges: AgensTypeEdge[] = [];
  svertex: AgensTypeVertex = null;
  evertex: AgensTypeVertex = null;

  constructor( data:any ){
    if( data.hasOwnProperty('vertexes')) {
      for( let item of data['vertexes'] ){
        this.vertexes.push( new AgensTypeVertex(item) );
      }
    }
    if( data.hasOwnProperty('edges')) {
      for( let item of data['edges'] ){
        this.edges.push( new AgensTypeEdge(item) );
      }
    }      
    if( data.hasOwnProperty('svertex')) this.svertex = new AgensTypeVertex(data['svertex']);
    if( data.hasOwnProperty('evertex')) this.evertex = new AgensTypeVertex(data['evertex']);
  }

  public toNodes():any[] {
    let eles:any[] = [];
    for( let vertex of this.vertexes ){
      let ele = vertex.toNode();
      if( vertex.vid === this.svertex.vid ) ele['data']['_order']='start';
      else if( vertex.vid === this.evertex.vid ) ele['data']['_order']='end';
      eles.push( ele );
    }
    return eles;
  }
  public toEdges():any[] {
    let eles:any[] = [];
    for( let edge of this.edges ){
      let ele = edge.toEdge();
      if( edge.svid === this.svertex.vid ) ele['data']['_order']='start';
      else if( edge.evid === this.evertex.vid ) ele['data']['_order']='end';
      eles.push( ele );
    }
    return eles;
  }
};

export class AgensTypeVertex {
  vid: string;
  label: string;
  props: any;

  constructor( data: any ){
    if( data.hasOwnProperty('vid')) this.vid = data['vid'];
    if( data.hasOwnProperty('label')) this.label = data['label'];
    if( data.hasOwnProperty('props')) this.props = data['props'];
  }

  public toNode():any {
    let name = this.props.hasOwnProperty('name') ? this.props['name']
        : (this.props.hasOwnProperty('title') ? this.props['title'] : this.vid);
    let ele = {'data': { 'id': this.vid, 'label': this.label, 'name': name, 'props': this.props }};
    return ele;
  }
};

export class AgensTypeEdge {
  eid: string;
  svid: string;
  evid: string;
  label: string;
  props: any;

  constructor( data: any ){
    if( data.hasOwnProperty('eid')) this.eid = data['eid'];
    if( data.hasOwnProperty('svid')) this.svid = data['svid'];
    if( data.hasOwnProperty('evid')) this.evid = data['evid'];
    if( data.hasOwnProperty('label')) this.label = data['label'];
    if( data.hasOwnProperty('props')) this.props = data['props'];
  }

  public toEdge():any {
    let name = this.props.hasOwnProperty('name') ? this.props['name']
        : (this.props.hasOwnProperty('title') ? this.props['title'] : this.eid);
    let ele = {'data': { 'id': this.eid, 'label': this.label, 'name': name, 'props': this.props,
      'source': this.svid, 'target': this.evid
    }};
    return ele;
  }
};