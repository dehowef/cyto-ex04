import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';

import { ShowColumnDetailComponent } from '../app/dialogs/show-column-detail/show-column-detail.component';
// import { ImgViewerComponent } from '../components/dialogs/img-viewer/img-viewer.component';
// import { CySytlesComponent } from '../components/dialogs/cy-sytles/cy-sytles.component';

@Injectable()
export class DialogsService {

  constructor(private dialog: MdDialog){     
  }

  public dlgShowColumnDetail(label: string, value: any): Observable<string> {
    let dialogRef: MdDialogRef<ShowColumnDetailComponent>;
    dialogRef = this.dialog.open(ShowColumnDetailComponent, {
        width: '30vw', height: '40vh',
        position: {
          top: '24px', right: '20px'
        }
    });
    dialogRef.componentInstance.label = label;
    dialogRef.componentInstance.value = value;

    return dialogRef.afterClosed();
  }

/*
  public dlgImgViewer(imgType: string, imgSrc: any): Observable<string> {

    let dialogRef: MdDialogRef<ImgViewerComponent>;

    dialogRef = this.dialog.open(ImgViewerComponent, {
        width: '50vw', height: '50vh',
        position: {
          top: '24px', right: '20px'
        }
    });
    dialogRef.componentInstance.imgType = imgSrc;
    dialogRef.componentInstance.imgSrc = imgSrc;

    return dialogRef.afterClosed();
  }

  public dlgCyStyles(cy: any): Observable<boolean> {

    let dialogRef: MdDialogRef<CySytlesComponent>;

    dialogRef = this.dialog.open(CySytlesComponent, {
        width: '50vw', height: '50vh',
        position: {
          top: '24px', right: '20px'
        }
    });
    dialogRef.componentInstance.cy = cy;

    return dialogRef.afterClosed();
  }
*/
}
