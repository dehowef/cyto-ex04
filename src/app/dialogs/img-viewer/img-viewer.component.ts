import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'ag-img-viewer',
  templateUrl: './img-viewer.component.html',
  styleUrls: ['./img-viewer.component.scss']
})
export class ImgViewerComponent implements OnInit {

  imgType: string = '';
  imgSrc: any = null;

  constructor(
    private dialogRef: MdDialogRef<ImgViewerComponent>
  ) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
