// Title: Agens Graph Utilities using Cytoscape
// Right: Bitnine.net
// Author: Byeong-Guk Min <maxmin93@gmail.com>

// Self-Executing Anonymous Func: Part 2 (Public &amp; Private)
// ** 참고
// https://stackoverflow.com/a/5947280/6811653

// Structure
// ----------------------
//  agens
//    .cy
//    .graph
//      .defaultSetting, .defaultStyle, .demoData[], .layoutTypes[]
//      .ready(), .loadData(), saveFile(), saveImage()
//    .api
//      .view
//      .unre
//    .dialog
//      .propertyBox
//      .styleBox
//      .nodeBox
//

(function( agens, $, undefined ) { 

  // sub namespaces : graph, api, dialog
  agens.cy = null;
  agens.graph = agens.graph || {};
  agens.api = agens.api || {};
  agens.dialog = agens.dialog || {};

  /////////////////////////////////////////////////////////
  //  NAMESPACE: agens.graph
  /////////////////////////////////////////////////////////

  // Public Property : defaultStyle
  agens.graph.defaultStyle = [{
      selector: 'node',
      css: {
          'content': 'data(name)',
          // 'text-opacity': 0.7, 'text-halign': 'right', 'width': 8,
          'text-valign': 'center',
          'color': 'white',
          'text-outline-width': 2,
          'text-outline-color': '#888',
          'border-width': 1
      }},{
      selector: 'node:parent',
      css: {
          'content': 'data(name)',
          'text-valign': 'bottom',
          'color': 'white',
          'text-outline-width': 1,
          'text-outline-color': '#888',
          'border-width': 0,
          'border-color': 'white'
      }}, {
      selector: 'node:selected',
      css: {
          'background-color': 'black',
          'text-outline-color': 'black',
          'border-color': 'black',
          'border-width': 3,
          'opacity': 1
      }},{
      selector: 'edge',
      css: {
          'target-arrow-shape': 'triangle',
          'width': 2,
          'curve-style': 'bezier',
          'background-color': 'black',
          'line-color': '#B788BF',
          'color': 'black',
          'target-arrow-color': '#B788BF',
          'source-arrow-color': 'black',
          'text-outline-color': 'black'
      }}, {
      selector: 'edge:selected',
      css: {
          'line-color': 'black',
          'width': 4,
          'opacity':1,
          'target-arrow-color': 'black',
      }},{
      selector: '.highlighted',
      css: {
          'background-color': '#61bffc',
          'line-color': '#61bffc',
          'target-arrow-color': '#61bffc',
          'transition-property': 'background-color, line-color, target-arrow-color',
          'transition-duration': '0.2s'
      }},{
      selector: '.traveled',
      css: {
          'background-color': '#11bf1c',
          'line-color': '#11bf1c',
          'target-arrow-color': '#11bf1c',
          'transition-property': 'background-color, line-color, target-arrow-color',
          'transition-duration': '0.2s'
      }},{
      selector: '.edgehandles-hover',
      css: {
          'background-color': 'red'
      }},{
      selector: '.edgehandles-source',
      css: {
          'border-width': 2,
          'border-color': 'red'
      }},{
      selector: '.edgehandles-target',
      css: {
          'border-width': 2,
          'border-color': 'red'
      }},{
      selector: '.edgehandles-preview, .edgehandles-ghost-edge',
      css: {
          'line-color': 'red',
          'target-arrow-color': 'red',
          'source-arrow-color': 'red'
      }
  }];

  // Public Property : demoData
  agens.graph.demoData = [
  // demoData[0]
  { nodes: [
      { data: { id: 'a', label: 'vertex-A', name: 'node A', href: 'http://js.cytoscape.org#a' }, classes: 'node-a', selectable: true, selected: false },
      { data: { id: 'b', label: 'vertex-A', name: 'node B', href: 'http://js.cytoscape.org#b' }, classes: 'node-a', selectable: true, selected: false },
      { data: { id: 'c', label: 'vertex-A', name: 'node C', href: 'http://js.cytoscape.org#c' }, classes: 'node-b', selectable: true, selected: false },
      { data: { id: 'd', label: 'vertex-B', name: 'node D', href: 'http://js.cytoscape.org#d' }, classes: 'node-b', selectable: true, selected: false },
      { data: { id: 'e', label: 'vertex-B', name: 'node E', href: 'http://js.cytoscape.org#e' }, classes: 'node-c', selectable: true, selected: false },
      { data: { id: 'f', label: 'vertex-A', name: 'node F', href: 'http://js.cytoscape.org#f' }, classes: 'node-c', selectable: true, selected: false },
      { data: { id: 'g', label: 'vertex-C', name: 'node G', href: 'http://js.cytoscape.org#g' }, classes: 'node-c', selectable: true, selected: false },
      { data: { id: 'h', label: 'vertex-C', name: 'node H', href: 'http://js.cytoscape.org#h' }, classes: 'node-a', selectable: true, selected: false },
      { data: { id: 'i', label: 'vertex-C', name: 'node I', href: 'http://js.cytoscape.org#i' }, classes: 'node-a', selectable: true, selected: false },
      { data: { id: 'j', label: 'vertex-A', name: 'node J', href: 'http://js.cytoscape.org#j' }, classes: 'node-a', selectable: true, selected: false },
      { data: { id: 'k', label: 'vertex-A', name: 'node K', href: 'http://js.cytoscape.org#k' }, classes: 'node-a', selectable: true, selected: false },
      { data: { id: 'l', label: 'vertex-D', name: 'node L', href: 'http://js.cytoscape.org#l' }, classes: 'node-d', selectable: true, selected: false },
      { data: { id: 'm', label: 'vertex-D', name: 'node M', href: 'http://js.cytoscape.org#m' }, classes: 'node-d', selectable: true, selected: false },
      { data: { id: 'n', label: 'vertex-D', name: 'node N', href: 'http://js.cytoscape.org#n' }, classes: 'node-d', selectable: true, selected: false },
      { data: { id: 'o', label: 'vertex-D', name: 'node O', href: 'http://js.cytoscape.org#o' }, classes: 'node-d', selectable: true, selected: false },
      { data: { id: 'p', label: 'vertex-A', name: 'node P', href: 'http://js.cytoscape.org#p' }, classes: 'node-d', selectable: true, selected: false },
      { data: { id: 'q', label: 'vertex-F', name: 'node Q', href: 'http://js.cytoscape.org#q' }, selectable: true, selected: false },
      { data: { id: 'r', label: 'vertex-F', name: 'node R', href: 'http://js.cytoscape.org#r' }, selectable: true, selected: false },
    ],           
    edges: [
      { data: { id: 'ae', label: 'edge-X', name: 'edge AE', weight: 1, source: 'a', target: 'e' } },
      { data: { id: 'ab', label: 'edge-X', name: 'edge AB', weight: 3, source: 'a', target: 'b' } },
      { data: { id: 'be', label: 'edge-X', name: 'edge BE', weight: 4, source: 'b', target: 'e' } },
      { data: { id: 'bc', label: 'edge-X', name: 'edge BC', weight: 5, source: 'b', target: 'c' } },
      { data: { id: 'ce', label: 'edge-X', name: 'edge CE', weight: 6, source: 'c', target: 'e' } },
      { data: { id: 'cd', label: 'edge-X', name: 'edge CD', weight: 2, source: 'c', target: 'd' } },
      { data: { id: 'de', label: 'edge-X', name: 'edge DE', weight: 7, source: 'd', target: 'e' } },
      { data: { id: 'af', label: 'edge-Y', name: 'edge AF', weight: 8, source: 'a', target: 'f' } },
      { data: { id: 'bh', label: 'edge-Y', name: 'edge BH', weight: 7, source: 'b', target: 'h' } },
      { data: { id: 'bo', label: 'edge-Y', name: 'edge BO', weight: 2, source: 'b', target: 'o' } },
      { data: { id: 'bp', label: 'edge-Y', name: 'edge BP', weight: 3, source: 'b', target: 'p' } },
      { data: { id: 'br', label: 'edge-Y', name: 'edge BR', weight: 4, source: 'b', target: 'r' } },
      { data: { id: 'cg', label: 'edge-Y', name: 'edge CG', weight: 5, source: 'c', target: 'g' } },
      { data: { id: 'cj', label: 'edge-Y', name: 'edge CJ', weight: 6, source: 'c', target: 'j' } },
      { data: { id: 'co', label: 'edge-Y', name: 'edge CO', weight: 2, source: 'c', target: 'o' } },
      { data: { id: 'di', label: 'edge-Y', name: 'edge DI', weight: 7, source: 'd', target: 'i' } },
      { data: { id: 'dq', label: 'edge-Y', name: 'edge DQ', weight: 6, source: 'd', target: 'q' } },
      { data: { id: 'eh', label: 'edge-Z', name: 'edge EH', weight: 2, source: 'e', target: 'h' } },
      { data: { id: 'fk', label: 'edge-Z', name: 'edge FK', weight: 9, source: 'f', target: 'k' } },
      { data: { id: 'kl', label: 'edge-Z', name: 'edge kl', weight: 5, source: 'k', target: 'l' } },
      { data: { id: 'ke', label: 'edge-Z', name: 'edge KE', weight: 5, source: 'k', target: 'e' } },
      { data: { id: 'kn', label: 'edge-Z', name: 'edge KN', weight: 7, source: 'k', target: 'n' } },
      { data: { id: 'mj', label: 'edge-Z', name: 'edge MJ', weight: 1, source: 'm', target: 'j' } },
      { data: { id: 'na', label: 'edge-Z', name: 'edge NA', weight: 1, source: 'n', target: 'a' } },
      { data: { id: 'np', label: 'edge-Z', name: 'edge np', weight: 2, source: 'n', target: 'p' } },
      { data: { id: 'pe', label: 'edge-Z', name: 'edge PE', weight: 3, source: 'p', target: 'e' } },
      { data: { id: 'pf', label: 'edge-Z', name: 'edge PF', weight: 8, source: 'p', target: 'f' } },
      { data: { id: 'pg', label: 'edge-Z', name: 'edge PG', weight: 4, source: 'p', target: 'g' } },
      { data: { id: 'rk', label: 'edge-Z', name: 'edge RK', weight: 8, source: 'r', target: 'k' } },
    ]},

  ];

  // Public Property : Layout Options
  agens.graph.layoutTypes = [
    {
      name: 'grid',
      fit: true, // whether to fit the viewport to the graph
      padding: 30, // padding used on fit
      boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
      avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
      avoidOverlapPadding: 10, // extra spacing around nodes when avoidOverlap: true
      nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
      spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
      condense: false, // uses all available space on false, uses minimal space on true
      rows: undefined, // force num of rows in the grid
      cols: undefined, // force num of columns in the grid
      position: function( node ){}, // returns { row, col } for element
      sort: undefined, // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
      animate: false, // whether to transition the node positions
      animationDuration: 500, // duration of animation in ms if enabled
      animationEasing: undefined, // easing of animation if enabled
    },{
      name: 'random',
      fit: true, // whether to fit to viewport
      padding: 30, // fit padding
      boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
      animate: false, // whether to transition the node positions
      animationDuration: 500, // duration of animation in ms if enabled
      animationEasing: undefined, // easing of animation if enabled
    },{
      name: 'breadthfirst',      
      fit: true, // whether to fit the viewport to the graph
      directed: false, // whether the tree is directed downwards (or edges can point in any direction if false)
      padding: 30, // padding on fit
      circle: false, // put depths in concentric circles if true, put depths top down if false
      spacingFactor: 1.75, // positive spacing factor, larger => more space between nodes (N.B. n/a if causes overlap)
      boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
      avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
      nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
      roots: undefined, // the roots of the trees
      maximalAdjustments: 0, // how many times to try to position the nodes in a maximal way (i.e. no backtracking)
      animate: false, // whether to transition the node positions
      animationDuration: 500, // duration of animation in ms if enabled
      animationEasing: undefined, // easing of animation if enabled
    },{
      name: 'circle',
      fit: true, // whether to fit the viewport to the graph
      padding: 30, // the padding on fit
      boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
      avoidOverlap: true, // prevents node overlap, may overflow boundingBox and radius if not enough space
      nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
      spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
      radius: undefined, // the radius of the circle
      startAngle: 3 / 2 * Math.PI, // where nodes start in radians
      sweep: undefined, // how many radians should be between the first and last node (defaults to full circle)
      clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
      sort: undefined, // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
      animate: false, // whether to transition the node positions
      animationDuration: 500, // duration of animation in ms if enabled
      animationEasing: undefined, // easing of animation if enabled
    },{
      name: 'concentric',      
      fit: true, // whether to fit the viewport to the graph
      padding: 30, // the padding on fit
      startAngle: 3 / 2 * Math.PI, // where nodes start in radians
      sweep: undefined, // how many radians should be between the first and last node (defaults to full circle)
      clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
      equidistant: false, // whether levels have an equal radial distance betwen them, may cause bounding box overflow
      minNodeSpacing: 10, // min spacing between outside of nodes (used for radius adjustment)
      boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
      avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
      nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
      height: undefined, // height of layout area (overrides container height)
      width: undefined, // width of layout area (overrides container width)
      spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
      concentric: function( node ){ // returns numeric value for each node, placing higher nodes in levels towards the centre
        return node.degree();
      },
      levelWidth: function( nodes ){ // the variation of concentric values in each level
        return nodes.maxDegree() / 4;
      },
      animate: false, // whether to transition the node positions
      animationDuration: 500, // duration of animation in ms if enabled
      animationEasing: undefined, // easing of animation if enabled
    },{
      name: 'cola',  
      animate: true, // whether to show the layout as it's running
      refresh: 1, // number of ticks per frame; higher is faster but more jerky
      maxSimulationTime: 4000, // max length in ms to run the layout
      ungrabifyWhileSimulating: false, // so you can't drag nodes during layout
      fit: true, // on every layout reposition of nodes, fit the viewport
      padding: 30, // padding around the simulation
      boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
      // positioning options
      randomize: true, // use random node positions at beginning of layout
      avoidOverlap: true, // if true, prevents overlap of node bounding boxes
      handleDisconnected: true, // if true, avoids disconnected components from overlapping
      nodeSpacing: function (node) {
        return 10;
      }, // extra spacing around nodes
      flow: undefined, // use DAG/tree flow layout if specified, e.g. { axis: 'y', minSeparation: 30 }
      alignment: undefined, // relative alignment constraints on nodes, e.g. function( node ){ return { x: 0, y: 1 } }
      // different methods of specifying edge length
      // each can be a constant numerical value or a function like `function( edge ){ return 2; }`
      edgeLength: undefined, // sets edge length directly in simulation
      edgeSymDiffLength: undefined, // symmetric diff edge length in simulation
      edgeJaccardLength: undefined, // jaccard edge length in simulation
      // iterations of cola algorithm; uses default values on undefined
      unconstrIter: undefined, // unconstrained initial layout iterations
      userConstIter: undefined, // initial layout iterations with user-specified constraints
      allConstIter: undefined, // initial layout iterations with all constraints including non-overlap
      // infinite layout options
      infinite: false // overrides all other options for a forces-all-the-time mode      
    },{
      name: 'cose',
      animate: true,    // Whether to animate while running the layout
      // The layout animates only after this many milliseconds  
      animationThreshold: 250,    // (prevents flashing on fast runs)
      // Number of iterations between consecutive screen positions update  
      refresh: 20,    // (0 -> only updated on the end)
      fit: true,    // Whether to fit the network view after when done
      padding: 30,    // Padding on fit
      boundingBox: undefined,   // Constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
      nodeDimensionsIncludeLabels: false,   // Excludes the label when calculating node bounding boxes for the layout algorithm
      randomize: true,   // Randomize the initial positions of the nodes (true) or use existing positions (false)
      componentSpacing: 100,    // Extra spacing between components in non-compound graphs
      nodeRepulsion: function( node ){ return 400000; },    // Node repulsion (non overlapping) multiplier
      nodeOverlap: 10,    // Node repulsion (overlapping) multiplier
      idealEdgeLength: function( edge ){ return 10; },    // Ideal edge (non nested) length
      edgeElasticity: function( edge ){ return 100; },    // Divisor to compute edge forces
      nestingFactor: 5,   // Nesting factor (multiplier) to compute ideal edge length for nested edges
      gravity: 80,    // Gravity force (constant)
      numIter: 1000,    // Maximum number of iterations to perform
      initialTemp: 200,   // Initial temperature (maximum node displacement)
      coolingFactor: 0.95,    // Cooling factor (how the temperature is reduced between consecutive iterations
      minTemp: 1.0,   // Lower temperature threshold (below this point the layout will end)
      weaver: false   // Pass a reference to weaver to use threads for calculations
    },{
      name: 'cose-bilkent',
      refresh: 0,   // Number of iterations between consecutive screen positions update (0 -> only updated on the end)
      fit: true,    // Whether to fit the network view after when done
      padding: 10,    // Padding on fit
      incremental: true,    // Whether to enable incremental mode
      debug: false,   // Whether to use the JS console to print debug messages
      nodeRepulsion: 4500,    // Node repulsion (non overlapping) multiplier
      nodeOverlap: 10,    // Node repulsion (overlapping) multiplier
      idealEdgeLength: 50,    // Ideal edge (non nested) length
      edgeElasticity: 0.45,   // Divisor to compute edge forces
      nestingFactor: 0.1,   // Nesting factor (multiplier) to compute ideal edge length for nested edges
      gravity: 0.4,   // Gravity force (constant)
      numIter: 2500,    // Maximum number of iterations to perform
      initialTemp: 200,   // Initial temperature (maximum node displacement)
      coolingFactor: 0.95,    // Cooling factor (how the temperature is reduced between consecutive iterations
      minTemp: 1,   // Lower temperature threshold (below this point the layout will end)
      tile: true,   // For enabling tiling
      animate: true   //whether to make animation while performing the layout
    },{
      name: 'dagre',
      fit: true, // whether to fit to viewport
      padding: 30, // fit padding
      spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
      animate: true, // whether to transition the node positions
      animationDuration: 500, // duration of animation in ms if enabled
      animationEasing: undefined, // easing of animation if enabled
      boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
      // dagre algo options, uses default value on undefined
      nodeSep: undefined, // the separation between adjacent nodes in the same rank
      edgeSep: undefined, // the separation between adjacent edges in the same rank
      rankSep: undefined, // the separation between adjacent nodes in the same rank
      rankDir: undefined, // 'TB' for top to bottom flow, 'LR' for left to right
      minLen: function( edge ){ return 1; }, // number of ranks to keep between the source and target of the edge
      edgeWeight: function( edge ){ return 1; }, // higher weight edges are generally made shorter and straighter than lower weight edges      
    }
/*    
    ,{
      name: 'arbor',
      animate: true, // whether to show the layout as it's running
      maxSimulationTime: 4000, // max length in ms to run the layout
      fit: true, // on every layout reposition of nodes, fit the viewport
      padding: 30, // padding around the simulation
      boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
      ungrabifyWhileSimulating: false, // so you can't drag nodes during layout
      // forces used by arbor (use arbor default on undefined)
      repulsion: undefined,
      stiffness: undefined,
      friction: undefined,
      gravity: true,
      fps: undefined,
      precision: undefined,
      // static numbers or functions that dynamically return what these
      // values should be for each element
      // e.g. nodeMass: function(n){ return n.data('weight') }
      nodeMass: undefined,
      edgeLength: undefined,
      stepSize: 0.1, // smoothing of arbor bounding box
      // function that returns true if the system is stable to indicate
      // that the layout can be stopped
      stableEnergy: function (energy) {
          var e = energy;
          return (e.max <= 0.5) || (e.mean <= 0.3);
      },
      // infinite layout options
      infinite: false // overrides all other options for a forces-all-the-time mode
    }
*/    
  ];

  // Public Property : defaultSetting
  agens.graph.defaultSetting = {
    container: document.getElementById('agens-graph'),
    style: agens.graph.defaultStyle,
    elements: agens.graph.demoData[0],    
    layout: agens.graph.layoutTypes[0],
    // initial viewport state:
    zoom: 1,
    pan: { x: 0, y: 0 },
    // interaction options:
    minZoom: 1e-25,
    maxZoom: 1e1,
    zoomingEnabled: true,
    userZoomingEnabled: true,
    panningEnabled: true,
    userPanningEnabled: true,
    boxSelectionEnabled: true,
    selectionType: 'single',
    touchTapThreshold: 8,
    desktopTapThreshold: 4,
    autolock: false,
    autoungrabify: false,
    autounselectify: false,
    // rendering options:
    headless: false,
    styleEnabled: true,
    hideEdgesOnViewport: false,
    hideLabelsOnViewport: false,
    textureOnViewport: false,
    motionBlur: false,
    motionBlurOpacity: 0.2,
    wheelSensitivity: 0.7,
    pixelRatio: 'auto',

    /////////////////////////////////////////////////////////
    // NAMESPACE: agens.cy
    /////////////////////////////////////////////////////////
      
    // ready function
    ready: function(e){
      agens.cy = e.cy;
      agens.graph.ready();
    },
  };

  // Public Function : graphFactory()
  agens.graph.loadData = function(data){
    if( agens.cy === undefined ) return;
    // initialize
    agens.cy.elements().remove();
    agens.cy.style( agens.defaultStyle );

    // load data
    agens.cy.add( data );

    // just use the regular qtip api but on cy elements
    agens.cy.elements().qtip({
      content: function(){ 
        var name = this.data('name');
        var label = this.data('label');
        var id = this.id();
        return `id: ${id}<br>\nlabel: ${label}<br>\nname: ${name}`; 
      },
      position: {
        my: 'bottom left',  // Position my top left...
        at: 'top right', // at the bottom right of...
      },
      style: {
        classes: 'qtip-tipsy qtip-shadow qtip-rounded',
        tip: {
          width: 16,
          height: 8
        }
      }
    });

    // adjust layout
    agens.cy.makeLayout(agens.graph.layoutTypes[0]).run();
    agens.cy.fit( agens.cy.elements(), 50 ); // fit to all the layouts
    agens.cy.resize();    
  };

  // Public Function : graphFactory()
  agens.graph.graphFactory = function(target){
    agens.graph.defaultSetting.container = target;
    return cytoscape(agens.graph.defaultSetting);
  };

  // Public Function : ready()
  agens.graph.ready = function(){

    // just use the regular qtip api but on cy elements
    agens.cy.elements().qtip({
      content: function(){ 
        var name = this.data('name');
        var label = this.data('label');
        var id = this.id();
        return `id: ${id}<br>\nlabel: ${label}<br>\nname: ${name}`; 
      },
      position: {
        my: 'bottom left',  // Position my top left...
        at: 'top right', // at the bottom right of...
      },
      style: {
        classes: 'qtip-tipsy qtip-shadow qtip-rounded',
        tip: {
          width: 16,
          height: 8
        }
      }
    });

    // cxt menu for node
    agens.cy.cxtmenu({
      selector: 'node, edge',
      menuRadius: 80,
      fillColor: 'rgba(50, 0, 0, 0.65)',
      commands: [{
          content: '<span>Styles</span>',
          select: function(ele){
            console.log( ele.id() );
          }
        },{
          content: '<span>Properties</span>',
          select: function(ele){
            console.log( ele.data('name') );
          }
          //, disabled: true
        },{
          content: '<span>remove</span>',
          select: function(ele){
            agens.cy.$("#"+ele.id()).remove();
          }
        },{
          content: '<span>hide</span>',
          select: function(){
            agens.api.view.hide(agens.cy.$(":selected"));
          }
        }
      ]
    });

    // cxt menu for edge
    agens.cy.cxtmenu({
      menuRadius: 80,
      selector: 'core',
      fillColor: 'rgba(0, 60, 0, 0.65)',
      commands: [
        {
          content: '<span>add Node</span>',
          select: function(){
            event.preventDefault();
            agens.dialog.propertyBox.dialog( "open" );
            // addNode();
          }
        },{
          content: '<span>show All</span>',
          select: function(){
            agens.api.view.show(agens.cy.elements());
          },
          //disabled: true
        },{
          content: '<span>select Theme</span>',
          select: function(){
            console.log("Menu: select Theme")
          }
        }
      ]
    });

    // on&off control: cy.edgehandles('enable') or cy.edgehandles('disable')
    agens.cy.edgehandles({
      toggleOffOnLeave: true,
      handleNodes: "node",
      handleSize: 10,
      edgeType: function(){ return 'flat'; }
    });

    agens.cy.panzoom({
			zoomFactor: 0.05, // zoom factor per zoom tick
      zoomDelay: 45, // how many ms between zoom ticks
      minZoom: 0.1, // min zoom level
      maxZoom: 10, // max zoom level
      fitPadding: 50, // padding when fitting
      panSpeed: 10, // how many ms in between pan ticks
      panDistance: 10, // max pan distance per tick
      panDragAreaSize: 75, // the length of the pan drag box in which the vector for panning is calculated (bigger = finer control of pan speed and direction)
      panMinPercentSpeed: 0.25, // the slowest speed we can pan by (as a percent of panSpeed)
      panInactiveArea: 3, // radius of inactive area in pan drag box
      panIndicatorMinOpacity: 0.5, // min opacity of pan indicator (the draggable nib); scales from this to 1.0
      autodisableForMobile: true, // disable the panzoom completely for mobile (since we don't really need it with gestures like pinch to zoom)
      // additional
      zoomOnly: false, // a minimal version of the ui only with zooming (useful on systems with bad mousewheel resolution)
      fitSelector: undefined, // selector of elements to fit
      animateOnFit: function(){ // whether to animate on fit
        return false;
      },
      // icon class names
      sliderHandleIcon: 'fa fa-minus',
      zoomInIcon: 'fa fa-plus',
      zoomOutIcon: 'fa fa-minus',
      resetIcon: 'fa fa-expand'      
		});

    // ==========================================
    // ==  cy events 등록
    // ==========================================

    agens.cy.on('tap', function(e){
      // console.log( cyPosition );
      if( e.cyTarget === agens.cy ){
        agens.api.view.removeHighlights();
        agens.cy.$(':selected').unselect();
        agens.graph.pivotNode = null;
      }
    });
    agens.cy.on('tap', 'node', function(e){
      agens.graph.pivotNode = e.cyTarget;
      agens.api.view.removeHighlights();
      agens.api.view.highlightNeighbors( e.cyTarget );
    });
    agens.cy.on('mouseover', 'node', function(e){
      this.addClass('highlighted');
    });
    agens.cy.on('mouseout', 'node', function(e){
      this.removeClass('highlighted');
    });
    agens.cy.on('cxttapstart', function(e){
      agens.graph.cyPosition = e.cyPosition;
    });

    // 화면에 맞게 elements 정렬
    agens.cy.fit( agens.cy.elements(), 50 ); // fit to all the layouts

    /////////////////////////////////////////////////////////
    //  NAMESPACE: agens.api
    /////////////////////////////////////////////////////////

    // Public Property : APIs about view and undoredo
    agens.api.view = agens.cy.viewUtilities({
        neighbor: function(node){
            return node.closedNeighborhood();
        },
        neighborSelectTime: 1000
    });

    // Public Property : UndoRedo for cy
    agens.api.unre = agens.cy.undoRedo();
    
  };

  /////////////////////////////////////////////////////////
  //  NAMESPACE: agens.dialog
  /////////////////////////////////////////////////////////

  agens.dialog.ready = function(){
    $("#agens-node-box").hide();
    $("#agens-property-box").hide();
    $("#agens-style-box").hide();
  };

  agens.dialog.propertyBox = $( "#agens-node-box" ).dialog({
      autoOpen: false,
      title: 'Property Box',
      modal: true,
      maxWidth: 400,
      maxHeight: 600,
      draggable: true,
      resizable: false,
      position: { my: "center", at: "center", of: window },
      show: 'fade',      // 'blind'
      hide: 'fade',      // 'fade'
      closeText: 'close',
      buttons: [{
        text: "Done",
        icons: {
          primary: "ui-icon-heart"
        },
        click: function() {
            var name = $("#new-node-name").val();
            var w = $("#new-node-width").val() == "" ? null : Number($("#new-node-width").val());
            var h = $("#new-node-height").val() == "" ? null : Number($("#new-node-height").val());
            var x = $("#new-node-x").val() == "" ? null : Number($("#new-node-x").val());
            var y = $("#new-node-y").val() == "" ? null : Number($("#new-node-y").val());
            var color = $("#new-node-color").val();
            var shape = $("#new-node-shape").val();
            var borderColor = $("#new-node-border-color").val();
            console.log(name, x, y, w, h, color, shape,borderColor/*, borderWidth */);
            $(this).dialog("close");
        }
    }]      
  });
  /////////////////////////////////////////////////////////
  console.log("agens-graph.js is loaded!");
 
}( window.agens = window.agens || {}, jQuery ));
