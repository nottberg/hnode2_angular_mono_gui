import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { HnidSequenceEditDialogComponent, SQUPD_NAME, SQUPD_DESC, SQUPD_TYPE, SQUPD_ONDURATION, SQUPD_OFFDURATION, SQUPD_OBJIDLIST } from '../hnid-sequence-edit-dialog/hnid-sequence-edit-dialog.component';
import { HnidConfirmDialogComponent } from '../hnid-confirm-dialog/hnid-confirm-dialog.component';
import { IrrigationDataService, NamedObj, Sequence } from '../_services/irrigation-data.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-hnid-sequences',
  templateUrl: './hnid-sequences.component.html',
  styleUrls: ['./hnid-sequences.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class HnidSequencesComponent implements OnInit {
  crc32ID : string | null;
  errMsg : string;

  znmList: NamedObj[] = [];
  sequencesList: Sequence[] = [];

  dataSource = new MatTableDataSource<Sequence>( this.sequencesList );
  selection = new SelectionModel<Sequence>( false, [] );

  columnsToDisplay : string[] = ['select', 'nameCol', 'type', 'onDuration', 'offDuration'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Sequence | null = null;

  constructor( private route: ActivatedRoute, private irrData: IrrigationDataService, private dialog: MatDialog ) {
    this.crc32ID = null;
    this.errMsg = "";  
  }

  refreshSequencesConfig() : void {
    this.selection.clear();
    const tmpID: string = this.crc32ID !== null ? this.crc32ID : '';
    this.irrData.getSequencesConfig( tmpID ).subscribe({
      next: data => {
        this.sequencesList = data.sequencesList;
        this.znmList = data.znmList;
        this.dataSource.data = this.sequencesList;
        console.log( this.sequencesList );
        console.log( this.znmList );       
      },
      error: err => {
        this.sequencesList = [];
        this.znmList = [];
        this.dataSource.data = this.sequencesList;
        this.errMsg = JSON.parse(err.error).message;
      }
    });
  }

  ngOnInit(): void {
    
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.crc32ID = params.get('crc32ID');
      this.refreshSequencesConfig();
    });

  }

  getObjectName( zoneid: string ) : string {
    for( let i = 0; i < this.znmList.length; i++ )
    {
      if( this.znmList[i].id == zoneid )
        return this.znmList[i].name;
    }

    return "Zone Not Found (" + zoneid + ")";
  }

  onEditButtonClick(): void
  {
    const dialogCfg = new MatDialogConfig();

    dialogCfg.autoFocus = true;

    console.log(this.selection);
    
    if( this.selection.selected.length != 1 )
      return;

    let curSeq : Sequence = this.selection.selected[0];

    dialogCfg.data = {
      description: 'Edit Sequence',
      curSeq: curSeq,
      availZones: this.znmList
    };

    const dialogRef = this.dialog.open( HnidSequenceEditDialogComponent, dialogCfg );

    dialogRef.afterClosed().subscribe(
      data => {
        if( data )
        {
          var updateFields: Record<string,any> = {sequenceID: curSeq.sequenceid};
          console.log("Dialog output:", data);
          
          if( data.updFlags & SQUPD_NAME )
            updateFields['name'] = data.form.nameFC;
          if( data.updFlags & SQUPD_DESC )
            updateFields['description'] = data.form.descriptionFC;
          if( data.updFlags & SQUPD_TYPE )
            updateFields['type'] = data.form.typeFC;
          if( data.updFlags & SQUPD_ONDURATION )
            updateFields['onDuration'] = data.form.onDurationFC;
          if( data.updFlags & SQUPD_OFFDURATION )
            updateFields['offDuration'] = data.form.offDurationFC;
          if( data.updFlags & SQUPD_OBJIDLIST )
            updateFields['objIDList'] = data.objIDList;
          
          console.log( updateFields );

          const tmpID: string = this.crc32ID !== null ? this.crc32ID : '';
          this.irrData.putUpdateSequence( tmpID, curSeq.sequenceid, updateFields ).subscribe(resp=>{
            console.log('Sequence Updated');
            this.refreshSequencesConfig();
          });
        }
        else
          console.log("dialog Canceled");
        }
    );
  }

  onNewButtonClick(): void
  {
    const dialogCfg = new MatDialogConfig();

    dialogCfg.autoFocus = true;

    dialogCfg.data = {
      description: 'Create Sequence',
      curSeq: null,
      availZones: this.znmList
    };

    const dialogRef = this.dialog.open( HnidSequenceEditDialogComponent, dialogCfg );

    dialogRef.afterClosed().subscribe(
      data => {
        if( data )
        {
          var updateFields: Record<string,any> = {};
          console.log("Dialog output:", data);
          
          if( data.updFlags & SQUPD_NAME )
            updateFields['name'] = data.form.nameFC;
          if( data.updFlags & SQUPD_DESC )
            updateFields['description'] = data.form.descriptionFC;
          if( data.updFlags & SQUPD_TYPE )
            updateFields['type'] = data.form.typeFC;
          if( data.updFlags & SQUPD_ONDURATION )
            updateFields['onDuration'] = data.form.onDurationFC;
          if( data.updFlags & SQUPD_OFFDURATION )
            updateFields['offDuration'] = data.form.offDurationFC;
          if( data.updFlags & SQUPD_OBJIDLIST )
            updateFields['objIDList'] = data.objIDList;

          console.log( updateFields );

          const tmpID: string = this.crc32ID !== null ? this.crc32ID : '';
          this.irrData.postCreateSequence( tmpID, updateFields ).subscribe(resp=>{
            console.log('Sequence Created');
            this.refreshSequencesConfig();
          });
        }
        else
          console.log("dialog Canceled");
        }
    );

  }

  onDeleteButtonClick(): void
  {
    const dialogCfg = new MatDialogConfig();

    dialogCfg.autoFocus = true;

    console.log(this.selection);
    
    if( this.selection.selected.length != 1 )
      return;

    let curSeq : Sequence = this.selection.selected[0];

    dialogCfg.data = {
      prompt: 'Delete placement - ' + curSeq.name
    };

    const dialogRef = this.dialog.open( HnidConfirmDialogComponent, dialogCfg );

    dialogRef.afterClosed().subscribe(
      data => {
        if( data )
        {
          console.log("Delete confirmed");
          const tmpID: string = this.crc32ID !== null ? this.crc32ID : '';
          this.irrData.deleteSequence( tmpID, curSeq.sequenceid ).subscribe(resp=>{
            console.log('Sequence Deleted');
            this.refreshSequencesConfig();
          });
        }
        else
          console.log("dialog Canceled");
        }
    );
  }

}
