import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { FormGroup, FormBuilder } from '@angular/forms';

// Bitfield values for tracking updates
export const PEUPD_NONE    = 0;  // 0b00000000
export const PEUPD_NAME    = 1;  // 0b00000001
export const PEUPD_DESC    = 2;  // 0b00000010
export const PEUPD_RANK    = 4;  // 0b00000100
export const PEUPD_STIME   = 8;  // 0b00001000
export const PEUPD_ETIME   = 16; // 0b00010000
export const PEUPD_DAYLST  = 32; // 0b00100000
export const PEUPD_ZONELST = 64; // 0b01000000

interface ListValue
{
  id: string;
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-hnid-placement-edit-dialog',
  templateUrl: './hnid-placement-edit-dialog.component.html',
  styleUrls: ['./hnid-placement-edit-dialog.component.scss']
})
export class HnidPlacementEditDialogComponent implements OnInit {
 
  form!: FormGroup;
  description: string;

  dayList : ListValue[];
  zoneList : ListValue[];

  nameFC: string = "";
  descriptionFC: string = "";
  rankFC: number = 0;
  startTimeFC: string = "";
  endTimeFC: string = "";

  updateFlags: number;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<HnidPlacementEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data : any) { 

    this.description = data.description;
    this.updateFlags = PEUPD_NONE;

    this.dayList = [
      {id: "all", name: "Daily", selected: false,},
      {id: "sun", name: "Sunday", selected: false,},
      {id: "mon", name: "Monday", selected: false,},
      {id: "tue", name: "Tuesday", selected: false,},
      {id: "wed", name: "Wednesday", selected: false,},
      {id: "thr", name: "Thursday", selected: false,},
      {id: "fri", name: "Friday", selected: false,},
      {id: "sat", name: "Saturday", selected: false,}
    ];

    if( data.dayArr.length == 0 )
      this.dayList[0].selected = true;   
    else
    {
      for( let i = 0; i < data.dayArr.length; i++ )
        for( let j = 1; j < this.dayList.length; j++ )
          if( data.dayArr[i] == this.dayList[j].name )
            this.dayList[j].selected = true;
    }

    this.zoneList = [
    {id: "allzones", name: "All Zones", selected: false},
    {id: "z1", name: "Front Yard", selected: false},
    {id: "z2", name: "Dog Paddock 1", selected: false}
    ];

    console.log(data);
    console.log(this.zoneList);

    if( data.zoneArr.length == 0 )
      this.zoneList[0].selected = true;   
    else
    {
      for( let i = 0; i < data.zoneArr.length; i++ )
        for( let j = 1; j < this.zoneList.length; j++ )
          if( data.zoneArr[i] == this.zoneList[j].name )
            this.zoneList[j].selected = true;
    }

    if( 'nameFC' in data )
      this.nameFC = data.nameFC;
    if( 'descriptionFC' in data )
      this.descriptionFC = data.descriptionFC;
    if( 'rankFC' in data )
      this.rankFC = data.rankFC;      
    if( 'startTimeFC' in data )
      this.startTimeFC = data.startTimeFC;      
    if( 'endTimeFC' in data )
      this.endTimeFC = data.endTimeFC;      

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      description: [this.description, []],
      nameFC: [this.nameFC, []],
      descriptionFC: [this.descriptionFC, []],      
      rankFC: [this.rankFC, []],
      startTimeFC: [this.startTimeFC, []],
      endTimeFC: [this.endTimeFC, []]
    });
  }

  save() {
    let rtnDayArr : string[] = [];
    if( this.dayList[0].selected == false )
    {
      for( let i = 0; i < this.dayList.length; i++ )
        if( this.dayList[i].selected == true )
          rtnDayArr.push( this.dayList[i].name );
    }

    let rtnZoneArr : string[] = [];
    if( this.zoneList[0].selected == false )
    {
      for( let i = 0; i < this.zoneList.length; i++ )
        if( this.zoneList[i].selected == true )
          rtnZoneArr.push( this.zoneList[i].id );
    }

    const rtnData = { form: this.form.value,
                      updFlags: this.updateFlags,
                      dayArr: rtnDayArr,
                      zoneArr: rtnZoneArr };

    this.dialogRef.close(rtnData);
  }

  close() {
    this.dialogRef.close();
  }

  onFieldUpdate( ctrlID: string ) {
    if( ctrlID == "nameFC" )
      this.updateFlags |= PEUPD_NAME;
    else if( ctrlID == "descriptionFC" )
      this.updateFlags |= PEUPD_DESC;
    else if( ctrlID == "rankFC" )
      this.updateFlags |= PEUPD_RANK;
    else if( ctrlID == "startTimeFC" )
      this.updateFlags |= PEUPD_STIME;
    else if( ctrlID == "endTimeFC" )
      this.updateFlags |= PEUPD_ETIME;      
  }

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
}
