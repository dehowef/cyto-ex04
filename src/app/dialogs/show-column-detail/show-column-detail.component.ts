import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'ag-show-column-detail',
  templateUrl: './show-column-detail.component.html',
  styleUrls: ['./show-column-detail.component.scss']
})
export class ShowColumnDetailComponent implements OnInit {

  label: string;
  value: any = {};

  constructor(
    public dialogRef: MdDialogRef<ShowColumnDetailComponent>
  ) { }

  ngOnInit() {
  }

}
