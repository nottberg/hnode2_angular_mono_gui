import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IrrigationDataService, Modifier, NamedObj } from '../_services/irrigation-data.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-hnid-modifiers',
  templateUrl: './hnid-modifiers.component.html',
  styleUrls: ['./hnid-modifiers.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class HnidModifiersComponent implements OnInit {
  crc32ID : string | null;
  errMsg : string;

  znmList: NamedObj[] = [];
  modifiersList: Modifier[] = [];

  dataSource = new MatTableDataSource<Modifier>( this.modifiersList );
  selection = new SelectionModel<Modifier>( true, [] );

  columnsToDisplay : string[] = ['select', 'nameCol', 'typeCol', 'valueCol', 'zoneCol'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Modifier | null = null;

  constructor( private route: ActivatedRoute, private irrData: IrrigationDataService, private dialog: MatDialog ) {
    this.crc32ID = null;
    this.errMsg = "";     
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.crc32ID = params.get('crc32ID');
      console.log(this.crc32ID);
      const tmpID: string = this.crc32ID !== null ? this.crc32ID : '';
      this.irrData.getModifiersConfig( tmpID ).subscribe({
      next: data => {
          this.modifiersList = data.modifiersList;
          this.znmList = data.znmList;
          this.dataSource.data = this.modifiersList;
          //this.setSelectedPlacementByIndex( 0 );
          console.log( this.modifiersList );
          console.log( this.znmList );
        },
        error: err => {
          this.modifiersList = [];
          this.dataSource.data = this.modifiersList;
          this.znmList = []; 
          this.errMsg = JSON.parse(err.error).message;
        }
      });
    });

  }

  getZoneName( zoneid: string ) : string {
    for( let i = 0; i < this.znmList.length; i++ )
    {
      if( this.znmList[i].id == zoneid )
        return this.znmList[i].name;
    }

    return "Not Found (" + zoneid + ")";
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
    
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    
    this.selection.select(...this.dataSource.data);
  }
    
  /** The label for the checkbox on the passed row */
  //checkboxLabel(row?: Modifier): string {
  //  if (!row) {
  //    return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  //  }
  //  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  //}

  onEditButtonClick(): void
  {
    /*
    const dialogCfg = new MatDialogConfig();

    dialogCfg.autoFocus = true;

    dialogCfg.data = {
      description: 'Edit Schedule Placement',
      nameFC: this.nameFC,
      descriptionFC: this.descriptionFC,
      rankFC: this.rankFC,
      startTimeFC: this.startTimeFC,      
      endTimeFC: this.endTimeFC,
      dayArr: this.placementsList[ this.selectedIndex ].dayList,
      zoneArr: this.placementsList[ this.selectedIndex ].zoneList,
      zoneAvail: this.znmList
    };

    const dialogRef = this.dialog.open( HnidPlacementEditDialogComponent, dialogCfg );

    dialogRef.afterClosed().subscribe(
      data => {
        if( data )
        {
          var updateFields: Record<string,any> = {zoneID: this.curPID};
          console.log("Dialog output:", data);
          
          if( data.updFlags & PEUPD_NAME )
            updateFields['name'] = data.form.nameFC;
          if( data.updFlags & PEUPD_DESC )
            updateFields['description'] = data.form.descriptionFC;
          if( data.updFlags & PEUPD_RANK )
            updateFields['rank'] = data.form.rankFC;
          if( data.updFlags & PEUPD_STIME )
            updateFields['startTime'] = data.form.startTimeFC;
          if( data.updFlags & PEUPD_ETIME )
            updateFields['endTime'] = data.form.endTimeFC;
          if( data.updFlags & PEUPD_DAYLST )
            updateFields['dayList'] = data.dayArr;
          if( data.updFlags & PEUPD_ZONELST )
            updateFields['zoneList'] = data.zoneArr;
          
          console.log( updateFields );

          const tmpID: string = this.crc32ID !== null ? this.crc32ID : '';
          this.irrData.putUpdatePlacement( tmpID, this.curPID, updateFields ).subscribe(resp=>{
            this.irrData.getPlacementsConfig( tmpID ).subscribe({
              next: data => {
                this.placementsList = data.placementsList;
                this.znmList = data.znmList;
                this.setSelectedPlacementByIndex( 0 );
                console.log( this.placementsList );
                console.log( this.znmList );       
              },
              error: err => {
                this.placementsList = [];
                this.znmList = []; 
                this.errMsg = JSON.parse(err.error).message;
              }
            });
          });
        }
        else
          console.log("dialog Canceled");
        }
    );
    */
  }

  onNewButtonClick(): void
  {
    /*
    const dialogCfg = new MatDialogConfig();

    dialogCfg.autoFocus = true;

    dialogCfg.data = {
      description: 'Create Schedule Placement',
      zoneAvail: this.znmList
    };

    const dialogRef = this.dialog.open( HnidPlacementEditDialogComponent, dialogCfg );

    dialogRef.afterClosed().subscribe(
      data => {
        if( data )
        {
          var updateFields: Record<string,any> = {};
          console.log("Dialog output:", data);
          
          if( data.updFlags & PEUPD_NAME )
            updateFields['name'] = data.form.nameFC;
          if( data.updFlags & PEUPD_DESC )
            updateFields['description'] = data.form.descriptionFC;
          if( data.updFlags & PEUPD_RANK )
            updateFields['rank'] = data.form.rankFC;
          if( data.updFlags & PEUPD_STIME )
            updateFields['startTime'] = data.form.startTimeFC;
          if( data.updFlags & PEUPD_ETIME )
            updateFields['endTime'] = data.form.endTimeFC;
          if( data.updFlags & PEUPD_DAYLST )
            updateFields['dayList'] = data.dayArr;
          if( data.updFlags & PEUPD_ZONELST )
            updateFields['zoneList'] = data.zoneArr;

          console.log( updateFields );

          const tmpID: string = this.crc32ID !== null ? this.crc32ID : '';
          this.irrData.postCreatePlacement( tmpID, updateFields ).subscribe(resp=>{
            this.irrData.getPlacementsConfig( tmpID ).subscribe({
              next: data => {
                this.placementsList = data.placementsList;
                this.znmList = data.znmList;
                this.setSelectedPlacementByIndex( 0 );
                console.log( this.placementsList );
                console.log( this.znmList );       
              },
              error: err => {
                this.placementsList = [];
                this.znmList = []; 
                this.errMsg = JSON.parse(err.error).message;
              }
            });
          });
        }
        else
          console.log("dialog Canceled");
        }
    );
*/
  }

  onDeleteButtonClick(): void
  {
    /*
    const dialogCfg = new MatDialogConfig();

    dialogCfg.autoFocus = true;

    dialogCfg.data = {
      prompt: 'Delete placement - ' + this.nameFC
    };

    const dialogRef = this.dialog.open( HnidConfirmDialogComponent, dialogCfg );

    dialogRef.afterClosed().subscribe(
      data => {
        if( data )
        {
          console.log("Delete confirmed");
          const tmpID: string = this.crc32ID !== null ? this.crc32ID : '';
          this.irrData.deletePlacement( tmpID, this.curPID ).subscribe(resp=>{
            this.irrData.getPlacementsConfig( tmpID ).subscribe({
              next: data => {
                this.placementsList = data.placementsList;
                this.znmList = data.znmList;
                this.setSelectedPlacementByIndex( 0 );
                console.log( this.placementsList );
                console.log( this.znmList );       
              },
              error: err => {
                this.placementsList = [];
                this.znmList = []; 
                this.errMsg = JSON.parse(err.error).message;
              }
            });
          });
        }
        else
          console.log("dialog Canceled");
        }
    );
    */
  }

}
