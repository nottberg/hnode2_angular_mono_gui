import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { FormGroup, FormBuilder } from '@angular/forms';
import { Modifier } from '../_services/irrigation-data.service';

// Bitfield values for tracking updates
export const MUPD_NONE    = 0;  // 0b00000000
export const MUPD_NAME    = 1;  // 0b00000001
export const MUPD_DESC    = 2;  // 0b00000010
export const MUPD_TYPE    = 4;  // 0b00000100
export const MUPD_VALUE   = 8;  // 0b00001000
export const MUPD_ZONE   = 16;  // 0b00010000


@Component({
  selector: 'app-hnid-modifiers-edit-dialog',
  templateUrl: './hnid-modifiers-edit-dialog.component.html',
  styleUrls: ['./hnid-modifiers-edit-dialog.component.scss']
})
export class HnidModifiersEditDialogComponent implements OnInit {
 
  form!: FormGroup;
  description: string;

  //dayList : NMObjSelectionTracker[];
  //zoneList : NMObjSelectionTracker[];

  curMod: Modifier;

  //nameFC: string = "";
  //descriptionFC: string = "";
  //typeFC: string = "";
  //valueFC: string = "";
  //zoneidFC: string = "";

  updateFlags: number;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<HnidModifiersEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data : any) { 

    this.description = data.description;
    this.updateFlags = MUPD_NONE;

    console.log(data);
    //console.log(this.zoneList);
    this.curMod = data.curMod;

    //if( 'nameFC' in data )
    //  this.nameFC = data.nameFC;
    //if( 'descriptionFC' in data )
    //  this.descriptionFC = data.descriptionFC;
    //if( 'typeFC' in data )
    //  this.typeFC = data.typeFC;      
    //if( 'valueFC' in data )
    //  this.valueFC = data.valueFC;      
    //if( 'zoneidFC' in data )
    //  this.zoneidFC = data.zoneidFC;      

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      description: [this.description, []],
      nameFC: [this.curMod.name, []],
      descriptionFC: [this.curMod.description, []],      
      typeFC: [this.curMod.type, []],
      valueFC: [this.curMod.value, []],
      zoneidFC: [this.curMod.zoneid, []]
    });
  }

  save() {
    let rtnDayArr : string[] = [];

    const rtnData = { form: this.form.value,
                      updFlags: this.updateFlags };

    this.dialogRef.close(rtnData);
  }

  close() {
    this.dialogRef.close();
  }

  onFieldUpdate( ctrlID: string ) {
    if( ctrlID == "nameFC" )
      this.updateFlags |= MUPD_NAME;
    else if( ctrlID == "descriptionFC" )
      this.updateFlags |= MUPD_DESC;
    else if( ctrlID == "typeFC" )
      this.updateFlags |= MUPD_TYPE;
    else if( ctrlID == "valueFC" )
      this.updateFlags |= MUPD_VALUE;
    else if( ctrlID == "zoneidFC" )
      this.updateFlags |= MUPD_ZONE;      
  }

  /*
  onDayChange( event : any ) {
    this.updateFlags |= PEUPD_DAYLST;
    console.log( event );

    let id : string = event.source.id;
    let state : boolean = event.checked;

    if( this.dayList[0].id == id )
    {
        // Set the daily case to the new state.
        this.dayList[0].selected = state;

        // If daily is turned on then turn off 
        // all of the individual day boxes.
        if( state == true )
        {
          // Clear all the day specific selected values
          for( let i = 1; i < this.dayList.length; i++ )
          {
              document.getElementById(id)?.setAttribute('checked','false');
              this.dayList[i].selected = false;
          }
        }
    }
    else
    {
        // Apply the day state change
        let allOff : boolean = true;
        for( let i = 1; i < this.dayList.length; i++ )
        {
          if( this.dayList[i].id == id )
          {
            console.log("Set " + id + " to " + state);
            this.dayList[i].selected = state;
          }

          if( this.dayList[i].selected == true )
            allOff = false;
        }

        // If all of the daily checkboxes are all off then
        // turn on the daily checkbox, otherwise disable the daily box
        if( allOff == true )
        {
          document.getElementById(this.dayList[0].id)?.setAttribute('checked','true');
          this.dayList[0].selected = true;
        }
        else
        {
          document.getElementById(this.dayList[0].id)?.setAttribute('checked','false');
          this.dayList[0].selected = false;  
        }
    }
  }

  onZoneChange( event : any ) {
    this.updateFlags |= PEUPD_ZONELST;
    console.log( event );

    let id : string = event.source.id;
    let state : boolean = event.checked;

    if( this.zoneList[0].id == id )
    {
        // Set the 'allzones' case to the new state.
        this.zoneList[0].selected = state;

        // If daily is turned on then turn off 
        // all of the individual day boxes.
        if( state == true )
        {
          // Clear all the day specific selected values
          for( let i = 1; i < this.zoneList.length; i++ )
          {
              document.getElementById(id)?.setAttribute('checked','false');
              this.zoneList[i].selected = false;
          }
        }
    }
    else
    {
        // Apply the zone state change
        let allOff : boolean = true;
        for( let i = 1; i < this.zoneList.length; i++ )
        {
          if( this.zoneList[i].id == id )
          {
            console.log("Set " + id + " to " + state);
            this.zoneList[i].selected = state;
          }

          if( this.zoneList[i].selected == true )
            allOff = false;
        }

        // If all of the zone checkboxes are all off then
        // turn on the 'all zones' checkbox, 
        // otherwise disable the 'all zones' checkbox
        if( allOff == true )
        {
          document.getElementById(this.zoneList[0].id)?.setAttribute('checked','true');
          this.zoneList[0].selected = true;
        }
        else
        {
          document.getElementById(this.zoneList[0].id)?.setAttribute('checked','false');
          this.zoneList[0].selected = false;  
        }
    }
  }
*/
}
