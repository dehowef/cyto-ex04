// Title: Agens Graph Utilities using Cytoscape
// Right: Bitnine.net
// Author: Byeong-Guk Min <maxmin93@gmail.com>

// Self-Executing Anonymous Func: Part 2 (Public &amp; Private)
// ** 참고
// https://stackoverflow.com/a/5947280/6811653

(function( agens, $, undefined ) { 

  // Public Property : defaultStyle
  agens.defaultStyle = [{
      selector: 'node',
      css: {
          'content': 'data(id)',
          'text-opacity': 0.5,
          'text-valign': 'center',
          'text-halign': 'right',
          'background-color': '#11479e'            
    }},{
      selector: 'edge',
      css: {
          'target-arrow-shape': 'triangle',
          'width': 4,
          'line-color': '#9dbaea',
          'target-arrow-color': '#9dbaea',            
          'curve-style': 'bezier'
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
      selector: ':selected',
      css: {
          'background-color': 'black',
          'line-color': 'black',
          'target-arrow-color': 'black',
          'source-arrow-color': 'black',
          'text-outline-color': 'black'
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

  // Private Property : defaultElements
  var defaultElements = {
    nodes: [
      { data: { id: 'a', name: 'node A', href: 'http://js.cytoscape.org#a' }, selectable: true, selected: false },
      { data: { id: 'b', name: 'node B', href: 'http://js.cytoscape.org#b' }, selectable: true, selected: false },
      { data: { id: 'c', name: 'node C', href: 'http://js.cytoscape.org#c' }, selectable: true, selected: false },
      { data: { id: 'd', name: 'node D', href: 'http://js.cytoscape.org#d' }, selectable: true, selected: false },
      { data: { id: 'e', name: 'node E', href: 'http://js.cytoscape.org#e' }, selectable: true, selected: false },
      { data: { id: 'f', name: 'node F', href: 'http://js.cytoscape.org#f' }, selectable: true, selected: false },
      { data: { id: 'g', name: 'node G', href: 'http://js.cytoscape.org#g' }, selectable: true, selected: false },
      { data: { id: 'h', name: 'node H', href: 'http://js.cytoscape.org#h' }, selectable: true, selected: false },
      { data: { id: 'i', name: 'node I', href: 'http://js.cytoscape.org#i' }, selectable: true, selected: false },
      { data: { id: 'j', name: 'node J', href: 'http://js.cytoscape.org#j' }, selectable: true, selected: false },
      { data: { id: 'k', name: 'node K', href: 'http://js.cytoscape.org#k' }, selectable: true, selected: false },
      { data: { id: 'l', name: 'node L', href: 'http://js.cytoscape.org#l' }, selectable: true, selected: false },
      { data: { id: 'm', name: 'node M', href: 'http://js.cytoscape.org#m' }, selectable: true, selected: false },
      { data: { id: 'n', name: 'node N', href: 'http://js.cytoscape.org#n' }, selectable: true, selected: false },
      { data: { id: 'o', name: 'node O', href: 'http://js.cytoscape.org#o' }, selectable: true, selected: false },
      { data: { id: 'p', name: 'node P', href: 'http://js.cytoscape.org#p' }, selectable: true, selected: false },
      { data: { id: 'q', name: 'node Q', href: 'http://js.cytoscape.org#q' }, selectable: true, selected: false },
      { data: { id: 'r', name: 'node R', href: 'http://js.cytoscape.org#r' }, selectable: true, selected: false },
    ],           
    edges: [
      { data: { id: 'ae', name: 'edge AE', weight: 1, source: 'a', target: 'e' } },
      { data: { id: 'ab', name: 'edge AB', weight: 3, source: 'a', target: 'b' } },
      { data: { id: 'be', name: 'edge BE', weight: 4, source: 'b', target: 'e' } },
      { data: { id: 'bc', name: 'edge BC', weight: 5, source: 'b', target: 'c' } },
      { data: { id: 'ce', name: 'edge CE', weight: 6, source: 'c', target: 'e' } },
      { data: { id: 'cd', name: 'edge CD', weight: 2, source: 'c', target: 'd' } },
      { data: { id: 'de', name: 'edge DE', weight: 7, source: 'd', target: 'e' } },
      { data: { id: 'af', name: 'edge AF', weight: 8, source: 'a', target: 'f' } },
      { data: { id: 'bh', name: 'edge BH', weight: 7, source: 'b', target: 'h' } },
      { data: { id: 'bo', name: 'edge BO', weight: 2, source: 'b', target: 'o' } },
      { data: { id: 'bp', name: 'edge BP', weight: 3, source: 'b', target: 'p' } },
      { data: { id: 'br', name: 'edge BR', weight: 4, source: 'b', target: 'r' } },
      { data: { id: 'cg', name: 'edge CG', weight: 5, source: 'c', target: 'g' } },
      { data: { id: 'cj', name: 'edge CJ', weight: 6, source: 'c', target: 'j' } },
      { data: { id: 'co', name: 'edge CO', weight: 2, source: 'c', target: 'o' } },
      { data: { id: 'di', name: 'edge DI', weight: 7, source: 'd', target: 'i' } },
      { data: { id: 'dq', name: 'edge DQ', weight: 6, source: 'd', target: 'q' } },
      { data: { id: 'eh', name: 'edge EH', weight: 2, source: 'e', target: 'h' } },
      { data: { id: 'fk', name: 'edge FK', weight: 9, source: 'f', target: 'k' } },
      { data: { id: 'kl', name: 'edge kl', weight: 5, source: 'k', target: 'l' } },
      { data: { id: 'ke', name: 'edge KE', weight: 5, source: 'k', target: 'e' } },
      { data: { id: 'kn', name: 'edge KN', weight: 7, source: 'k', target: 'n' } },
      { data: { id: 'mj', name: 'edge MJ', weight: 1, source: 'm', target: 'j' } },
      { data: { id: 'na', name: 'edge NA', weight: 1, source: 'n', target: 'a' } },
      { data: { id: 'np', name: 'edge np', weight: 2, source: 'n', target: 'p' } },
      { data: { id: 'pe', name: 'edge PE', weight: 3, source: 'p', target: 'e' } },
      { data: { id: 'pf', name: 'edge PF', weight: 8, source: 'p', target: 'f' } },
      { data: { id: 'pg', name: 'edge PG', weight: 4, source: 'p', target: 'g' } },
      { data: { id: 'rk', name: 'edge RK', weight: 8, source: 'r', target: 'k' } },
    ]
  };

  // Public Property : Layout Options
  agens.layoutTypes = [
    {
      name: 'grid',
      //animate: true,  
      avoidOverlap: true, 
      avoidOverlapPadding: 10, 
      condense: false,    // if true: Node Larger size (needs to find associations
      fit: false
    },{
      name: 'random',
      fit: true,
      animate: true     
    },{
      name: 'breadthfirst',      
      directed: true,
      roots: '#a',
      animate: true,
      fit: true
    },{
      name: 'circle',

      fit: true, // whether to fit the viewport to the graph
      sort: undefined, // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
      animate: true, // whether to transition the node positions
      animationDuration: 500, // duration of animation in ms if enabled
      animationEasing: undefined, // easing of animation if enabled
    },{
      name: 'cola',  
      animate: true,
      fit: true,

    },{
      name: 'concentric',      
      avoidOverlap: true,
      minNodeSpacing: 10,
      concentric: function( node ){ // returns numeric value for each node, placing higher nodes in levels towards the centre
        return node.degree();
      },
      levelWidth: function( nodes ){ // the variation of concentric values in each level
        return nodes.maxDegree() / 4;
      },
      animate: true,
      fit: true
    },{
      name: 'cose',  
      animate: true, // Whether to animate while running the layout
    },{
      name: 'cose-bilkent',      
    },{
      name: 'dagre',
        fit: true, // whether to fit to viewport
        animate: true, // whether to transition the node positions
    }
  ];
  // Private Property : defaultLayout
  var defaultLayout = agens.layoutTypes[0];

  // Public Property : defaultSetting
  agens.defaultSetting = {
    container: document.getElementById('agens-graph'),
    style: agens.defaultStyle,
    elements: defaultElements,    
    layout: defaultLayout,
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
    // ready function
    ready: function(e){
      agens.cy = e.cy;
      agens.graphReady();
    },
  };

  // Public Function : graphFactory()
  agens.graphFactory = function(target){
    agens.defaultSetting.container = target;
    return cytoscape(agens.defaultSetting);
  };

  // Public Function : graphReady()
  agens.graphReady = function(){

    // just use the regular qtip api but on cy elements
    agens.cy.elements().qtip({
      content: function(){ return 'Example qTip on ele ' + this.id() },
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
            addNode();
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

    // Public Property : APIs about view and undoredo
    agens.api = agens.api || {};
    agens.api.view = agens.cy.viewUtilities({
        neighbor: function(node){
            return node.closedNeighborhood();
        },
        neighborSelectTime: 1000
    });
    // Public Property : UndoRedo for cy
    agens.api.ur = agens.cy.undoRedo();

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
      panInactiveArea: 8, // radius of inactive area in pan drag box
      panIndicatorMinOpacity: 0.5, // min opacity of pan indicator (the draggable nib); scales from this to 1.0
      zoomOnly: false, // a minimal version of the ui only with zooming (useful on systems with bad mousewheel resolution)
      fitSelector: undefined, // selector of elements to fit
      animateOnFit: function(){ // whether to animate on fit
      return false;
      },
		});

    agens.cy.fit( agens.cy.elements(), 50 ); // fit to all the layouts
    /*cy.automove({
      nodesMatching: function(){ return true },
      reposition: 'viewport'    // or function(node){}
    });*/

    // ==========================================
    // ==  cy events
    // ==========================================
    agens.cy.on('tap', function(e){
      // console.log( cyPosition );
      if( e.cyTarget === agens.cy ){
        agens.api.view.removeHighlights();
        agens.cy.$(':selected').unselect();
        agens.pivotNode = null;
      }
    });
    agens.cy.on('tap', 'node', function(e){
      agens.pivotNode = e.cyTarget;
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
      agens.cyPosition = e.cyPosition;
    });
  };

  console.log("agens-graph.js is loaded!");
 
}( window.agens = window.agens || {}, jQuery ));
