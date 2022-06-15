import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HnidZoneEditDialogComponent, ZEUPD_NAME, ZEUPD_SPW, ZEUPD_SWLST, ZEUPD_DESC, ZEUPD_MAXCT, ZEUPD_MINCT } from '../hnid-zone-edit-dialog/hnid-zone-edit-dialog.component';
import { HnidConfirmDialogComponent } from '../hnid-confirm-dialog/hnid-confirm-dialog.component';
import { IrrigationDataService, NamedObj, Zone } from '../_services/irrigation-data.service';

@Component({
  selector: 'app-hnid-zones',
  templateUrl: './hnid-zones.component.html',
  styleUrls: ['./hnid-zones.component.scss']
})
export class HnidZonesComponent implements OnInit {
  
  crc32ID : string | null;
  errMsg : string;

  switches: NamedObj[] = [];

  zones: Zone[] = [];
  selectedIndex: number = 0;
  selected: string = "";

  curZID: string = "";

  nameFC: string = ""; 
  descriptionFC: string = "";
  secPerWeekFC: number = 0;
  maxCycleTimeFC: number = 0;
  minCycleTimeFC: number = 0;
  swidListFC: string[] = [];

  constructor( private route: ActivatedRoute, private irrData: IrrigationDataService, private dialog: MatDialog ) {
    this.crc32ID = null;
    this.errMsg = "";     
  }

  ngOnInit(): void {
    
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.crc32ID = params.get('crc32ID');
      const tmpID: string = this.crc32ID !== null ? this.crc32ID : '';
      this.irrData.getZoneConfig( tmpID ).subscribe({
        next: data => {
          this.zones = data.zoneList;
          this.switches = data.switchList;
          this.setSelectedZoneByIndex( 0 );
          console.log( this.zones );
          console.log( this.switches );          
        },
        error: err => {
          this.zones = [];
          this.switches = []; 
          this.errMsg = JSON.parse(err.error).message;
        }
      });
    });

  }

  setFormFields( zone: Zone ): void
  {

    this.nameFC = zone.name;
    this.descriptionFC = zone.description;
    this.secPerWeekFC = zone.secondsPerWeek;
    this.maxCycleTimeFC = zone.secondsMaxCycle;
    this.minCycleTimeFC = zone.secondsMinCycle;
    this.swidListFC = zone.swidList;

    this.curZID = zone.zoneid;
  }

  setSelectedZoneByIndex( index: number ): void
  {
      this.selectedIndex = index;
      this.selected = this.zones[index].zoneid;

      this.setFormFields( this.zones[index] );
  }

  setSelectedZoneByID( id: string ): void
  {
    if( this.zones.length == 0 )
    return;

    let index = 0;
    for( index = 0; index < this.zones.length; index++ )
    {
      console.log( index );
      console.log( "zoneid: " + this.zones[ index ].zoneid );
      console.log( "id: " + id );
      if( this.zones[ index ].zoneid == id )
      {
          console.log( "Found zone" );
          this.setSelectedZoneByIndex( index );
          return;
      }
    }

    this.setSelectedZoneByIndex(0);
  }

  nextSelectedZone(): void
  {
    if( this.zones.length == 0 )
      return;

    let index = this.selectedIndex;
    index += 1;
    if( index >= this.zones.length )
      index = 0;
    
    this.setSelectedZoneByIndex( index );
  }

  prevSelectedZone(): void
  {
    if( this.zones.length == 0 )
      return;

    let index = this.selectedIndex;
    if( index == 0 )
      index = (this.zones.length - 1);
    else
      index -= 1;
    
    this.setSelectedZoneByIndex( index );
  }

  onZoneSelectChange(): void
  {
      console.log( "Zone Selection Change: " + this.selected  );
      this.setSelectedZoneByID( this.selected );
  }
  
  onNextButtonClick(): void
  {
      console.log( "Next Button Click" );
      this.nextSelectedZone();
  }

  onPrevButtonClick(): void
  {
    console.log( "Prev Button Click" );
    this.prevSelectedZone();
  }

  onEditButtonClick(): void
  {
    const dialogCfg = new MatDialogConfig();

    dialogCfg.autoFocus = true;

    dialogCfg.data = {
      description: 'Edit Zone',
      nameFC: this.nameFC,
      descriptionFC: this.descriptionFC,
      secPerWeekFC: this.secPerWeekFC,
      maxCycleTimeFC: this.maxCycleTimeFC,
      minCycleTimeFC: this.minCycleTimeFC,
      swidListFC: this.swidListFC,
      availSWList: this.switches
    };

    const dialogRef = this.dialog.open( HnidZoneEditDialogComponent, dialogCfg );

    dialogRef.afterClosed().subscribe(
      data => {
        if( data )
        {
          var updateFields: Record<string,any> = {zoneID: this.curZID};
          console.log("Dialog output:", data);
          
          if( data.updFlags & ZEUPD_NAME )
            updateFields['name'] = data.form.nameFC;
          if( data.updFlags & ZEUPD_DESC )
            updateFields['description'] = data.form.descriptionFC;
          if( data.updFlags & ZEUPD_SPW )
            updateFields['secondsPerWeek'] = data.form.secPerWeekFC;
          if( data.updFlags & ZEUPD_MAXCT )
            updateFields['secondsMaxCycle'] = data.form.maxCycleTimeFC;
          if( data.updFlags & ZEUPD_MINCT )
            updateFields['secondsMinCycle'] = data.form.minCycleTimeFC;
          if( data.updFlags & ZEUPD_SWLST )
            updateFields['swidList'] = data.swArr;

          console.log( updateFields );

          const tmpID: string = this.crc32ID !== null ? this.crc32ID : '';
          this.irrData.putUpdateZone( tmpID, this.curZID, updateFields ).subscribe(()=>{
            this.irrData.getZoneConfig( tmpID ).subscribe({
              next: data => {
                this.zones = data.zoneList;
                this.switches = data.switchList;
                this.setSelectedZoneByIndex( 0 );
                console.log( this.zones );
                console.log( this.switches );          
              },
              error: err => {
                this.zones = [];
                this.switches = []; 
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
      description: 'Create Zone'
    };

    const dialogRef = this.dialog.open( HnidZoneEditDialogComponent, dialogCfg );

    dialogRef.afterClosed().subscribe(
      data => {
        if( data )
        {
          var updateFields: Record<string,any> = {};
          console.log("Dialog output:", data);
          
          if( data.updFlags & ZEUPD_NAME )
            updateFields['name'] = data.form.nameFC;
          if( data.updFlags & ZEUPD_DESC )
            updateFields['description'] = data.form.descriptionFC;
          if( data.updFlags & ZEUPD_SPW )
            updateFields['secondsPerWeek'] = data.form.secPerWeekFC;
          if( data.updFlags & ZEUPD_MAXCT )
            updateFields['secondsMaxCycle'] = data.form.maxCycleTimeFC;
          if( data.updFlags & ZEUPD_MINCT )
            updateFields['secondsMinCycle'] = data.form.minCycleTimeFC;
          if( data.updFlags & ZEUPD_SWLST )
            updateFields['swidList'] = data.swArr;

          console.log( updateFields );

          const tmpID: string = this.crc32ID !== null ? this.crc32ID : '';
          this.irrData.postCreateZone( tmpID, updateFields ).subscribe(()=>{
            this.irrData.getZoneConfig( tmpID ).subscribe({
              next: data => {
                this.zones = data.zoneList;
                this.switches = data.switchList;
                this.setSelectedZoneByIndex( 0 );
                console.log( this.zones );
                console.log( this.switches );          
              },
              error: err => {
                this.zones = [];
                this.switches = []; 
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
      prompt: 'Delete zone - ' + this.nameFC
    };

    const dialogRef = this.dialog.open( HnidConfirmDialogComponent, dialogCfg );

    dialogRef.afterClosed().subscribe(
      data => {
        if( data )
        {
          console.log("Delete confirmed");
          const tmpID: string = this.crc32ID !== null ? this.crc32ID : '';
          this.irrData.deleteZone( tmpID, this.curZID ).subscribe(()=>{
            this.irrData.getZoneConfig( tmpID ).subscribe({
              next: data => {
                this.zones = data.zoneList;
                this.switches = data.switchList;
                this.setSelectedZoneByIndex( 0 );
                console.log( this.zones );
                console.log( this.switches );          
              },
              error: err => {
                this.zones = [];
                this.switches = []; 
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

