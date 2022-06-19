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

  //selectedIndex: number = 0;
  //selected: string = "";

  //curPID: string = "";

  //nameFC: string = "";
  //descriptionFC: string = "";
  //startTimeFC: string = "";
  //endTimeFC: string = "";
  //rankFC: number = 0;

  //dayListFC: string[] = [];
  //zoneListFC: string[] = [];

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
        //this.setSelectedPlacementByIndex( 0 );
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
      return "M W F";
  }

  /*
  setFormFields( placement: Placement ): void
  {
    this.nameFC = placement.name;
    this.descriptionFC = placement.description;
    this.startTimeFC = placement.startTime;
    this.endTimeFC = placement.endTime;
    this.rankFC = placement.rank;

    if( placement.dayList.length == 0 )
      this.dayListFC = ["Daily"];
    else
      this.dayListFC = placement.dayList;

    if( placement.zoneList.length == 0 )
      this.zoneListFC = ["All Zones"];
    else      
      this.zoneListFC = placement.zoneList;

    this.curPID = placement.placementid;
  }

  setSelectedPlacementByIndex( index: number ): void
  {
      this.selectedIndex = index;
      this.selected = this.placementsList[index].placementid;

      this.setFormFields( this.placementsList[index] );
  }

  setSelectedPlacementByID( id: string ): void
  {
    if( this.placementsList.length == 0 )
    return;

    let index = 0;
    for( index = 0; index < this.placementsList.length; index++ )
    {
      console.log( index );
      console.log( "placementid: " + this.placementsList[ index ].placementid );
      console.log( "id: " + id );
      if( this.placementsList[ index ].placementid == id )
      {
          console.log( "Found placement" );
          this.setSelectedPlacementByIndex( index );
          return;
      }
    }

    this.setSelectedPlacementByIndex(0);
  }

  nextSelectedPlacement(): void
  {
    if( this.placementsList.length == 0 )
      return;

    let index = this.selectedIndex;
    index += 1;
    if( index >= this.placementsList.length )
      index = 0;
    
    this.setSelectedPlacementByIndex( index );
  }

  prevSelectedPlacement(): void
  {
    if( this.placementsList.length == 0 )
      return;

    let index = this.selectedIndex;
    if( index == 0 )
      index = (this.placementsList.length - 1);
    else
      index -= 1;
    
    this.setSelectedPlacementByIndex( index );
  }

  onPlacementSelectChange(): void
  {
      console.log( "Zone Selection Change: " + this.selected  );
      this.setSelectedPlacementByID( this.selected );
  }
 
  onNextButtonClick(): void
  {
      console.log( "Next Button Click" );
      this.nextSelectedPlacement();
  }

  onPrevButtonClick(): void
  {
    console.log( "Prev Button Click" );
    this.prevSelectedPlacement();
  }
  */

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
      nameFC: curPlat.name,
      descriptionFC: curPlat.description,
      rankFC: curPlat.rank,
      startTimeFC: curPlat.startTime,      
      endTimeFC: curPlat.endTime,
      dayArr: curPlat.dayList,
      zoneArr: curPlat.zoneList,
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
