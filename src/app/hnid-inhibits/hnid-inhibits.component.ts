import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IrrigationDataService, Inhibit, NamedObj } from '../_services/irrigation-data.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { HnidInhibitEditDialogComponent, INUPD_NAME, INUPD_TYPE, INUPD_EXPIREDATE, INUPD_DURATION, INUPD_ZONE } from '../hnid-inhibit-edit-dialog/hnid-inhibit-edit-dialog.component';
import { HnidConfirmDialogComponent } from '../hnid-confirm-dialog/hnid-confirm-dialog.component';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-hnid-inhibits',
  templateUrl: './hnid-inhibits.component.html',
  styleUrls: ['./hnid-inhibits.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class HnidInhibitsComponent implements OnInit {
  
  crc32ID : string | null;
  errMsg : string;

  znmList: NamedObj[] = [];
  inhibitsList: Inhibit[] = [];

  dataSource = new MatTableDataSource<Inhibit>( this.inhibitsList );
  selection = new SelectionModel<Inhibit>( false, [] );

  columnsToDisplay : string[] = ['select', 'nameCol', 'typeCol', 'expiresCol', 'zoneCol'];

  constructor( private route: ActivatedRoute, private irrData: IrrigationDataService, private dialog: MatDialog ) {
    this.crc32ID = null;
    this.errMsg = "";     
  }

  refreshInhibitsConfig() : void {
    this.selection.clear();
    const tmpID: string = this.crc32ID !== null ? this.crc32ID : '';
    this.irrData.getInhibitsConfig( tmpID ).subscribe({
      next: data => {
        this.inhibitsList = data.inhibitsList;
        this.znmList = data.znmList;
        this.dataSource.data = this.inhibitsList;
        console.log( this.inhibitsList );
        console.log( this.znmList );
      },
      error: err => {
        this.inhibitsList = [];
        this.dataSource.data = this.inhibitsList;
        this.znmList = []; 
        this.errMsg = JSON.parse(err.error).message;
      }
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.crc32ID = params.get('crc32ID');
      console.log(this.crc32ID);
      this.refreshInhibitsConfig();
    });
  }

  getZoneName( zoneid: string ) : string {
    for( let i = 0; i < this.znmList.length; i++ )
    {
      if( this.znmList[i].id == zoneid )
        return this.znmList[i].name;
    }

    return "";
  }

  getTypeStr( type: string ) : string {
    if( type == "scheduler" )
      return "Scheduler";
    else if( type == "scheduler_noexpire" )
      return "Scheduler (No Expiration)";
    else if( type == "zone" )
      return "Zone";
    else if( type == "zone_noexpire" )
      return "Zone (No Expiration)";

    return "Unknown (" + type + ")";
  }
  
  onNewButtonClick(): void
  {
    const dialogCfg = new MatDialogConfig();
    const nullInhibit: Inhibit = {inhibitid: "", name: "", type: "", duration: "", expirationDateStr: "", zoneID: ""};

    dialogCfg.autoFocus = true;

    dialogCfg.data = {
      description: 'Create Inhibit',
      curInhibit: nullInhibit,
      zoneAvail: this.znmList
    };

    const dialogRef = this.dialog.open( HnidInhibitEditDialogComponent, dialogCfg );

    dialogRef.afterClosed().subscribe(
      data => {
        if( data )
        {
          var updateFields: Record<string,any> = {inhibitID: ""};
          console.log("Dialog output:", data);
          
          if( data.updFlags & INUPD_NAME )
            updateFields['name'] = data.form.nameFC;
          if( data.updFlags & INUPD_TYPE )
            updateFields['type'] = data.form.typeFC;
          if( data.updFlags & INUPD_DURATION )
            updateFields['duration'] = data.form.durationFC;
          if( data.updFlags & INUPD_ZONE )
            updateFields['zoneID'] = data.form.zoneIDFC;

          console.log( updateFields );

          const tmpID: string = this.crc32ID !== null ? this.crc32ID : '';
          this.irrData.postCreateInhibit( tmpID, updateFields ).subscribe(resp=>{
            console.log("Inhibit Created")
            this.refreshInhibitsConfig();
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

    let curInhibit : Inhibit = this.selection.selected[0];

    dialogCfg.data = {
      prompt: 'Delete inhibit - ' + curInhibit.name
    };

    const dialogRef = this.dialog.open( HnidConfirmDialogComponent, dialogCfg );

    dialogRef.afterClosed().subscribe(
      data => {
        if( data )
        {
          console.log("Delete confirmed");
          const tmpID: string = this.crc32ID !== null ? this.crc32ID : '';
          this.irrData.deleteInhibit( tmpID, curInhibit.inhibitid ).subscribe(resp=>{
            console.log("Inhibit Deleted")
            this.refreshInhibitsConfig();
          });
        }
        else
          console.log("dialog Canceled");
      }
    );
  }
}
