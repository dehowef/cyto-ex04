import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
//import {ColorPickerService} from 'angular2-color-picker';

@Component({
  selector: 'app-graph-style',
  templateUrl: './graph-style.component.html',
  styleUrls: ['./graph-style.component.scss']
})
export class GraphStyleComponent implements OnInit {

  graph: any = null;

  nodeColor: string = "#12dc20";
  edgeColor: string = "#127bdc";
  nodeSize: number = 4;
  edgeWidth: number = 1;

  constructor(
    public dialogRef: MdDialogRef<GraphStyleComponent>
    //, private cpService: ColorPickerService
  ) { }

  ngOnInit() {
  }

  onNodeColorChange(): void{
    console.log( 'color='+this.nodeColor );
    var stringStylesheet = `node { background-color: ${this.nodeColor}; }`;
    this.graph.style( stringStylesheet );
  }
  onEdgeColorChange(): void{
    console.log( 'color='+this.edgeColor );
    var stringStylesheet = `edge { line-color: ${this.edgeColor}; }`;
    this.graph.style( stringStylesheet );
  }

  onNodeSizeChange( value: number ): void{
    console.log( 'size='+value );
    // console.log( this.cy.nodes().style({}) );

    var size = value * 10;
    var stringStylesheet = `node { width: ${size}px; height: ${size}px; background-color: ${this.nodeColor}; }`;
    this.graph.style( stringStylesheet );
  }
  onEdgeWidthChange( value: number ): void{
    console.log( 'width='+value );
    // console.log( this.cy.edges().style() );

    var size = value * 2;
    var stringStylesheet = `edge { width: ${size}px; line-color: ${this.edgeColor}; }`;
    this.graph.style( stringStylesheet );
  }

}
