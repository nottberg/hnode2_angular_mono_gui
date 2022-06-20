import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { HnidZoneEditDialogComponent, ZEUPD_NAME, ZEUPD_SPW, ZEUPD_SWLST, ZEUPD_DESC, ZEUPD_MAXCT, ZEUPD_MINCT } from '../hnid-zone-edit-dialog/hnid-zone-edit-dialog.component';
import { HnidConfirmDialogComponent } from '../hnid-confirm-dialog/hnid-confirm-dialog.component';
import { IrrigationDataService, NamedObj, Zone } from '../_services/irrigation-data.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-hnid-zones',
  templateUrl: './hnid-zones.component.html',
  styleUrls: ['./hnid-zones.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class HnidZonesComponent implements OnInit {
  
  crc32ID : string | null;
  errMsg : string;

  switchList: NamedObj[] = [];
  zoneList: Zone[] = [];

  dataSource = new MatTableDataSource<Zone>( this.zoneList );
  selection = new SelectionModel<Zone>( false, [] );

  columnsToDisplay : string[] = ['select', 'nameCol', 'secPerWeekCol', 'minCycleTimeCol', 'maxCycleTimeCol'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Zone | null = null;

  constructor( private route: ActivatedRoute, private irrData: IrrigationDataService, private dialog: MatDialog ) {
    this.crc32ID = null;
    this.errMsg = "";     
  }

  refreshZoneConfig() : void {
    this.selection.clear();
    const tmpID: string = this.crc32ID !== null ? this.crc32ID : '';
    this.irrData.getZoneConfig( tmpID ).subscribe({
      next: data => {
        this.zoneList = data.zoneList;
        this.dataSource.data = this.zoneList;
        this.switchList = data.switchList;
        console.log( this.zoneList );
        console.log( this.switchList );          
      },
      error: err => {
        this.zoneList = [];
        this.dataSource.data = this.zoneList;
        this.switchList = []; 
        this.errMsg = JSON.parse(err.error).message;
      }
    });
  }

  ngOnInit(): void {
    
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.crc32ID = params.get('crc32ID');
      this.refreshZoneConfig();
    });

  }

  formatDurationStr( seconds : number ) : string
  {
    var date = new Date(0);
    date.setSeconds( seconds );
    let rtnStr : string = date.toISOString().substring(11, 19);
    
    rtnStr += " (" + seconds + " seconds)";
    return rtnStr;
  }

  getSwitchName(swid : string) : string {
    for( let i = 0; i < this.switchList.length; i++ )
    {
      if( this.switchList[i].id == swid )
      {
        let rtnStr : string = this.switchList[i].name;
        rtnStr += " : " + swid;
        return rtnStr;
      }
    }

    return "Unnamed : " + swid;
  }

  onEditButtonClick(): void
  {
    const dialogCfg = new MatDialogConfig();

    dialogCfg.autoFocus = true;

    console.log(this.selection);
    
    if( this.selection.selected.length != 1 )
      return;

    let curZone : Zone = this.selection.selected[0];

    dialogCfg.data = {
      description: 'Edit Zone',
      curZone: curZone,
      nameFC: curZone.name,
      descriptionFC: curZone.description,
      secPerWeekFC: curZone.secondsPerWeek,
      maxCycleTimeFC: curZone.secondsMaxCycle,
      minCycleTimeFC: curZone.secondsMinCycle,
      swidListFC: curZone.swidList,
      availSWList: this.switchList
    };

    const dialogRef = this.dialog.open( HnidZoneEditDialogComponent, dialogCfg );

    dialogRef.afterClosed().subscribe(
      data => {
        if( data )
        {
          var updateFields: Record<string,any> = {zoneID: curZone.zoneid};
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
          this.irrData.putUpdateZone( tmpID, curZone.zoneid, updateFields ).subscribe(()=>{
            this.refreshZoneConfig();
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

    let nullZone : Zone = {zoneid: "", name: "", description: "", secondsPerWeek: 0, secondsMinCycle: 0, secondsMaxCycle: 0, swidList: []};

    dialogCfg.data = {
      description: 'Create Zone',
      curZone: nullZone,
      availSWList: this.switchList
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
            this.refreshZoneConfig();
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

    let curZone : Zone = this.selection.selected[0];

    dialogCfg.data = {
      prompt: 'Delete zone - ' + curZone.name
    };

    const dialogRef = this.dialog.open( HnidConfirmDialogComponent, dialogCfg );

    dialogRef.afterClosed().subscribe(
      data => {
        if( data )
        {
          console.log("Delete confirmed");
          const tmpID: string = this.crc32ID !== null ? this.crc32ID : '';
          this.irrData.deleteZone( tmpID, curZone.zoneid ).subscribe(()=>{
              this.refreshZoneConfig();
          });
        }
        else
          console.log("dialog Canceled");
        }
    );
  }

}

