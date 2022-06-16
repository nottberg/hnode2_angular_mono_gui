import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HnidPlacementEditDialogComponent, PEUPD_NAME, PEUPD_DESC, PEUPD_RANK, PEUPD_STIME, PEUPD_ETIME, PEUPD_DAYLST, PEUPD_ZONELST } from '../hnid-placement-edit-dialog/hnid-placement-edit-dialog.component';
import { HnidConfirmDialogComponent } from '../hnid-confirm-dialog/hnid-confirm-dialog.component';
import { IrrigationDataService, NamedObj, Placement } from '../_services/irrigation-data.service';

@Component({
  selector: 'app-hnid-placements',
  templateUrl: './hnid-placements.component.html',
  styleUrls: ['./hnid-placements.component.scss']
})
export class HnidPlacementsComponent implements OnInit {
  crc32ID : string | null;
  errMsg : string;

  znmList: NamedObj[] = [];

  placementsList: Placement[] = [];
  selectedIndex: number = 0;
  selected: string = "";

  curPID: string = "";

  nameFC: string = "";
  descriptionFC: string = "";
  startTimeFC: string = "";
  endTimeFC: string = "";
  rankFC: number = 0;

  dayListFC: string[] = [];
  zoneListFC: string[] = [];

  constructor( private route: ActivatedRoute, private irrData: IrrigationDataService, private dialog: MatDialog ) {
    this.crc32ID = null;
    this.errMsg = "";     
  }

  ngOnInit(): void {
    
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.crc32ID = params.get('crc32ID');
      const tmpID: string = this.crc32ID !== null ? this.crc32ID : '';
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

  onEditButtonClick(): void
  {
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
      zoneArr: this.placementsList[ this.selectedIndex ].zoneList
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
  }

  onNewButtonClick(): void
  {
    const dialogCfg = new MatDialogConfig();

    dialogCfg.autoFocus = true;

    dialogCfg.data = {
      description: 'Create Schedule Placement'
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

  }

  onDeleteButtonClick(): void
  {
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
  }
}
