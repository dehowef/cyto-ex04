import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';

import { ShowColumnDetailComponent } from '../app/dialogs/show-column-detail/show-column-detail.component';
import { ImgViewerComponent } from '../app/dialogs/img-viewer/img-viewer.component';
import { GraphStyleComponent } from '../app/dialogs/graph-style/graph-style.component';

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

  public dlgCyStyles(graph: any): Observable<boolean> {
    let dialogRef: MdDialogRef<GraphStyleComponent>;
    dialogRef = this.dialog.open(GraphStyleComponent, {
        width: '50vw', height: '50vh',
        position: {
          top: '24px', right: '20px'
        }
    });
    dialogRef.componentInstance.graph = graph;

    return dialogRef.afterClosed();
  }

}
