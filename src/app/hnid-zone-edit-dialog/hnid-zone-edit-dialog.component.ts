import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { FormGroup, FormBuilder } from '@angular/forms';

// Bitfield values for tracking updates
export const ZEUPD_NONE  = 0;  // 0b00000000
export const ZEUPD_NAME  = 1;  // 0b00000001
export const ZEUPD_DESC  = 2;  // 0b00000010
export const ZEUPD_SPW   = 4;  // 0b00000100
export const ZEUPD_MAXCT = 8;  // 0b00001000
export const ZEUPD_MINCT = 16; // 0b00010000
export const ZEUPD_SWLST = 32; // 0b00100000

export interface SWSelect {
    swid: string;
    name: string;
    description: string;
    selected: boolean;
}

@Component({
  selector: 'app-hnid-zone-edit-dialog',
  templateUrl: './hnid-zone-edit-dialog.component.html',
  styleUrls: ['./hnid-zone-edit-dialog.component.scss']
})
export class HnidZoneEditDialogComponent implements OnInit {

  form!: FormGroup;
  description: string;

  nameFC: string;
  descriptionFC: string;
  secPerWeekFC: string;
  maxCycleTimeFC: string;
  minCycleTimeFC: string;

  swList: SWSelect[];

  updateFlags: number;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<HnidZoneEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) { 

    this.swList = [];
    this.description = data.description;
    this.updateFlags = ZEUPD_NONE;
    this.nameFC = "";
    this.descriptionFC = "";
    this.secPerWeekFC = "";
    this.maxCycleTimeFC = "";
    this.minCycleTimeFC = "";

    if( 'nameFC' in data )
      this.nameFC = data.nameFC;
    if( 'descriptionFC' in data )
      this.descriptionFC = data.descriptionFC;
    if( 'secPerWeekFC' in data )
      this.secPerWeekFC = data.secPerWeekFC;
    if( 'maxCycleTimeFC' in data )
      this.maxCycleTimeFC = data.maxCycleTimeFC;
    if( 'minCycleTimeFC' in data )
      this.minCycleTimeFC = data.minCycleTimeFC;

    if( ('swidListFC' in data) && ('availSWList' in data) )
    {
      for( let i = 0; i < data.availSWList.length; i++ )
      {
          let swex : SWSelect = { swid: "", name: "", description: "", selected: false };

          console.log( data.availSWList[i] );

          swex.swid = data.availSWList[i].id;
          swex.name = data.availSWList[i].name;

          for( let j = 0; j < data.swidListFC.length; j++ )
          {
            if( swex.swid == data.swidListFC[j] )
            {
              swex.selected = true;
              break;
            }
          }

          this.swList.push( swex );

      }
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
        description: [this.description, []],
        nameFC: [this.nameFC, []],
        descriptionFC: [this.descriptionFC, []],
        secPerWeekFC: [this.secPerWeekFC, []],
        maxCycleTimeFC: [this.maxCycleTimeFC, []],
        minCycleTimeFC: [this.minCycleTimeFC, []]
      });
  }

  save() {
    let swArrVal : string[] = [];
    for( let i = 0; i < this.swList.length; i++ )
    {
      if( this.swList[i].selected == true )
          swArrVal.push( this.swList[i].swid );
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
      if( this.swList[i].swid == id )
      {
        console.log("Set " + id + " to " + state);
        this.swList[i].selected = state;
      }
    }
  }
}