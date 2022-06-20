import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { HnidPlacementEditDialogComponent, PEUPD_NAME, PEUPD_DESC, PEUPD_RANK, PEUPD_STIME, PEUPD_ETIME, PEUPD_DAYLST, PEUPD_ZONELST } from '../hnid-placement-edit-dialog/hnid-placement-edit-dialog.component';
import { HnidConfirmDialogComponent } from '../hnid-confirm-dialog/hnid-confirm-dialog.component';
import { IrrigationDataService, NamedObj, Placement } from '../_services/irrigation-data.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-hnid-placements',
  templateUrl: './hnid-placements.component.html',
  styleUrls: ['./hnid-placements.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class HnidPlacementsComponent implements OnInit {
  crc32ID : string | null;
  errMsg : string;

  znmList: NamedObj[] = [];
  placementsList: Placement[] = [];

  dataSource = new MatTableDataSource<Placement>( this.placementsList );
  selection = new SelectionModel<Placement>( false, [] );

  columnsToDisplay : string[] = ['select', 'nameCol', 'startTimeCol', 'endTimeCol', 'rankCol', 'dayCol'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Placement | null = null;

  constructor( private route: ActivatedRoute, private irrData: IrrigationDataService, private dialog: MatDialog ) {
    this.crc32ID = null;
    this.errMsg = "";     
  }

  refreshPlacementsConfig() : void {
    this.selection.clear();
    const tmpID: string = this.crc32ID !== null ? this.crc32ID : '';
    this.irrData.getPlacementsConfig( tmpID ).subscribe({
      next: data => {
        this.placementsList = data.placementsList;
        this.znmList = data.znmList;
        this.dataSource.data = this.placementsList;
        console.log( this.placementsList );
        console.log( this.znmList );       
      },
      error: err => {
        this.placementsList = [];
        this.znmList = [];
        this.dataSource.data = this.placementsList;
        this.errMsg = JSON.parse(err.error).message;
      }
    });
  }

  ngOnInit(): void {
    
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.crc32ID = params.get('crc32ID');
      this.refreshPlacementsConfig();
    });

  }

  getZoneName( zoneid: string ) : string {
    for( let i = 0; i < this.znmList.length; i++ )
    {
      if( this.znmList[i].id == zoneid )
        return this.znmList[i].name;
    }

    return "Zone Not Found (" + zoneid + ")";
  }

  getDaysStr( dayArray: string[] ): string {
    let rtnStr = "";

    for( let i = 0; i < dayArray.length; i++ )
    {
      let dStr = dayArray[i];

      if( "Sunday" == dStr )
        rtnStr += "Su ";
      else if( "Monday" == dStr )
        rtnStr += "M ";
      else if( "Tuesday" == dStr )
        rtnStr += "T ";
      else if( "Wednesday" == dStr )
        rtnStr += "W ";
      else if( "Thursday" == dStr )
        rtnStr += "Th ";
      else if( "Friday" == dStr )
        rtnStr += "F ";
      else if( "Saturday" == dStr )
        rtnStr += "Sa ";
    } 

    return rtnStr;
  }

  onEditButtonClick(): void
  {
    const dialogCfg = new MatDialogConfig();

    dialogCfg.autoFocus = true;

    console.log(this.selection);
    
    if( this.selection.selected.length != 1 )
      return;

    let curPlat : Placement = this.selection.selected[0];

    dialogCfg.data = {
      description: 'Edit Schedule Placement',
      curPlat: curPlat,
      zoneAvail: this.znmList
    };

    const dialogRef = this.dialog.open( HnidPlacementEditDialogComponent, dialogCfg );

    dialogRef.afterClosed().subscribe(
      data => {
        if( data )
        {
          var updateFields: Record<string,any> = {zoneID: curPlat.placementid};
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
          this.irrData.putUpdatePlacement( tmpID, curPlat.placementid, updateFields ).subscribe(resp=>{
            console.log('Placement Updated');
            this.refreshPlacementsConfig();
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
      description: 'Create Schedule Placement',
      curPlat: null,
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
            console.log('Placement Created');
            this.refreshPlacementsConfig();
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

    let curPlat : Placement = this.selection.selected[0];

    dialogCfg.data = {
      prompt: 'Delete placement - ' + curPlat.name
    };

    const dialogRef = this.dialog.open( HnidConfirmDialogComponent, dialogCfg );

    dialogRef.afterClosed().subscribe(
      data => {
        if( data )
        {
          console.log("Delete confirmed");
          const tmpID: string = this.crc32ID !== null ? this.crc32ID : '';
          this.irrData.deletePlacement( tmpID, curPlat.placementid ).subscribe(resp=>{
            console.log('Placement Deleted');
            this.refreshPlacementsConfig();
          });
        }
        else
          console.log("dialog Canceled");
        }
    );
  }

}
