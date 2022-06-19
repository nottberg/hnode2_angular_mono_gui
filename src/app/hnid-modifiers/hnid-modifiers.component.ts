import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IrrigationDataService, Modifier, NamedObj } from '../_services/irrigation-data.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { HnidModifiersEditDialogComponent, MUPD_NAME, MUPD_DESC, MUPD_TYPE, MUPD_VALUE, MUPD_ZONE } from '../hnid-modifiers-edit-dialog/hnid-modifiers-edit-dialog.component';
import { HnidConfirmDialogComponent } from '../hnid-confirm-dialog/hnid-confirm-dialog.component';
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
  selection = new SelectionModel<Modifier>( false, [] );

  columnsToDisplay : string[] = ['select', 'nameCol', 'typeCol', 'valueCol', 'zoneCol'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Modifier | null = null;

  constructor( private route: ActivatedRoute, private irrData: IrrigationDataService, private dialog: MatDialog ) {
    this.crc32ID = null;
    this.errMsg = "";     
  }

  refreshModifiersConfig() : void {
    this.selection.clear();
    const tmpID: string = this.crc32ID !== null ? this.crc32ID : '';
    this.irrData.getModifiersConfig( tmpID ).subscribe({
      next: data => {
        this.modifiersList = data.modifiersList;
        this.znmList = data.znmList;
        this.dataSource.data = this.modifiersList;
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
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.crc32ID = params.get('crc32ID');
      console.log(this.crc32ID);
      this.refreshModifiersConfig();
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

  onEditButtonClick(): void
  {
    const dialogCfg = new MatDialogConfig();

    dialogCfg.autoFocus = true;

    console.log(this.selection);
    
    if( this.selection.selected.length != 1 )
      return;

    let curMod : Modifier = this.selection.selected[0];

    dialogCfg.data = {
      description: 'Edit Zone Modifier',
      curMod: curMod,
      zoneAvail: this.znmList
    };

    const dialogRef = this.dialog.open( HnidModifiersEditDialogComponent, dialogCfg );

    dialogRef.afterClosed().subscribe(
      data => {
        if( data )
        {
          var updateFields: Record<string,any> = {modID: curMod.modifierid};
          console.log("Dialog output:", data);
          
          if( data.updFlags & MUPD_NAME )
            updateFields['name'] = data.form.nameFC;
          if( data.updFlags & MUPD_DESC )
            updateFields['description'] = data.form.descriptionFC;
          if( data.updFlags & MUPD_TYPE )
            updateFields['type'] = data.form.typeFC;
          if( data.updFlags & MUPD_VALUE )
            updateFields['value'] = data.form.valueFC;
          if( data.updFlags & MUPD_ZONE )
            updateFields['zoneid'] = data.form.zoneidFC;
          
          console.log( updateFields );

          const tmpID: string = this.crc32ID !== null ? this.crc32ID : '';
          this.irrData.putUpdateModifier( tmpID, curMod.modifierid, updateFields ).subscribe(resp=>{
            console.log("Modifier updated")
            this.refreshModifiersConfig();
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
    const nullMod: Modifier = {modifierid: "", name: "", description: "", type: "", value: "", zoneid: ""};

    dialogCfg.autoFocus = true;

    dialogCfg.data = {
      description: 'Create Schedule Placement',
      curMod: nullMod,
      zoneAvail: this.znmList
    };

    const dialogRef = this.dialog.open( HnidModifiersEditDialogComponent, dialogCfg );

    dialogRef.afterClosed().subscribe(
      data => {
        if( data )
        {
          var updateFields: Record<string,any> = {modID: ""};
          console.log("Dialog output:", data);
          
          if( data.updFlags & MUPD_NAME )
            updateFields['name'] = data.form.nameFC;
          if( data.updFlags & MUPD_DESC )
            updateFields['description'] = data.form.descriptionFC;
          if( data.updFlags & MUPD_TYPE )
            updateFields['type'] = data.form.typeFC;
          if( data.updFlags & MUPD_VALUE )
            updateFields['value'] = data.form.valueFC;
          if( data.updFlags & MUPD_ZONE )
            updateFields['zoneid'] = data.form.zoneidFC;

          console.log( updateFields );

          const tmpID: string = this.crc32ID !== null ? this.crc32ID : '';
          this.irrData.postCreateModifier( tmpID, updateFields ).subscribe(resp=>{
            console.log("Modifier Created")
            this.refreshModifiersConfig();
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

    let curMod : Modifier = this.selection.selected[0];

    dialogCfg.data = {
      prompt: 'Delete placement - ' + curMod.name
    };

    const dialogRef = this.dialog.open( HnidConfirmDialogComponent, dialogCfg );

    dialogRef.afterClosed().subscribe(
      data => {
        if( data )
        {
          console.log("Delete confirmed");
          const tmpID: string = this.crc32ID !== null ? this.crc32ID : '';
          this.irrData.deleteModifier( tmpID, curMod.modifierid ).subscribe(resp=>{
            console.log("Modifier Deleted")
            this.refreshModifiersConfig();
          });
        }
        else
          console.log("dialog Canceled");
      }
    );
  }

}
