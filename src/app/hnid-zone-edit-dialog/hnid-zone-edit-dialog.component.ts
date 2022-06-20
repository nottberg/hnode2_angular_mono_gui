import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { FormGroup, FormBuilder } from '@angular/forms';
import { Zone, NMObjSelectionTracker } from '../_services/irrigation-data.service';

// Bitfield values for tracking updates
export const ZEUPD_NONE  = 0;  // 0b00000000
export const ZEUPD_NAME  = 1;  // 0b00000001
export const ZEUPD_DESC  = 2;  // 0b00000010
export const ZEUPD_SPW   = 4;  // 0b00000100
export const ZEUPD_MAXCT = 8;  // 0b00001000
export const ZEUPD_MINCT = 16; // 0b00010000
export const ZEUPD_SWLST = 32; // 0b00100000

@Component({
  selector: 'app-hnid-zone-edit-dialog',
  templateUrl: './hnid-zone-edit-dialog.component.html',
  styleUrls: ['./hnid-zone-edit-dialog.component.scss']
})
export class HnidZoneEditDialogComponent implements OnInit {

  form!: FormGroup;
  description: string;

  curZone: Zone;

  swList: NMObjSelectionTracker[];

  updateFlags: number;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<HnidZoneEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) { 

    this.swList = [];
    this.description = data.description;
    this.curZone = data.curZone;
    this.updateFlags = ZEUPD_NONE;

    if('availSWList' in data) {
      console.log("Avail SW List");
      console.log( data.availSWList );

      for( let i = 0; i < data.availSWList.length; i++ )
      {
        let curSW = data.availSWList[i];
        let swex : NMObjSelectionTracker = { id: curSW.id, name: curSW.name, selected: false };
        this.swList.push( swex );
      }      
    }

    if( this.curZone )
    {
      for( let i = 0; i < this.curZone.swidList.length; i++ )
      {
        let swid = this.curZone.swidList[i];

        for( let j = 0; j < this.swList.length; j++ )
        {
          if( swid == this.swList[j].id )
          {
            this.swList[j].selected = true;
            break;
          }
        }
      }
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
        description: [this.description, []],
        nameFC: [this.curZone.name, []],
        descriptionFC: [this.curZone.description, []],
        secPerWeekFC: [this.curZone.secondsPerWeek, []],
        maxCycleTimeFC: [this.curZone.secondsMaxCycle, []],
        minCycleTimeFC: [this.curZone.secondsMinCycle, []]
      });
  }

  save() {
    let swArrVal : string[] = [];
    for( let i = 0; i < this.swList.length; i++ )
    {
      if( this.swList[i].selected == true )
          swArrVal.push( this.swList[i].id );
    }

    console.log( swArrVal );

    const rtnData = {form: this.form.value,
                     updFlags: this.updateFlags,
                     swArr: swArrVal };

    this.dialogRef.close(rtnData);
  }

  close() {
    this.dialogRef.close();
    console.log( this.swList );
  }

  onFieldUpdate( ctrlID : string ) {
    if( ctrlID == "nameFC" )
      this.updateFlags |= ZEUPD_NAME;
    else if( ctrlID == "descriptionFC" )
      this.updateFlags |= ZEUPD_DESC;
    else if( ctrlID == "secPerWeekFC" )
      this.updateFlags |= ZEUPD_SPW;
    else if( ctrlID == "maxCycleTimeFC" )
      this.updateFlags |= ZEUPD_MAXCT;
    else if( ctrlID == "minCycleTimeFC" )
      this.updateFlags |= ZEUPD_MINCT;     
  }

  onSwitchChange( event : any ) {
    this.updateFlags |= ZEUPD_SWLST;
    console.log( event );

    let id : string = event.source.id;
    let state : boolean = event.checked;

    for( let i = 0; i < this.swList.length; i++ )
    {
      if( this.swList[i].id == id )
      {
        console.log("Set " + id + " to " + state);
        this.swList[i].selected = state;
      }
    }
  }
}