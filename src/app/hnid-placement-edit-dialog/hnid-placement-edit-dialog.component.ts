import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { FormGroup, FormBuilder } from '@angular/forms';
import { Placement, NMObjSelectionTracker } from '../_services/irrigation-data.service';

// Bitfield values for tracking updates
export const PEUPD_NONE    = 0;  // 0b00000000
export const PEUPD_NAME    = 1;  // 0b00000001
export const PEUPD_DESC    = 2;  // 0b00000010
export const PEUPD_RANK    = 4;  // 0b00000100
export const PEUPD_STIME   = 8;  // 0b00001000
export const PEUPD_ETIME   = 16; // 0b00010000
export const PEUPD_DAYLST  = 32; // 0b00100000
export const PEUPD_ZONELST = 64; // 0b01000000

@Component({
  selector: 'app-hnid-placement-edit-dialog',
  templateUrl: './hnid-placement-edit-dialog.component.html',
  styleUrls: ['./hnid-placement-edit-dialog.component.scss']
})
export class HnidPlacementEditDialogComponent implements OnInit {
 
  form!: FormGroup;
  description: string;

  curPlat: Placement;

  dayList : NMObjSelectionTracker[];
  zoneList : NMObjSelectionTracker[];

  updateFlags: number;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<HnidPlacementEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data : any) { 

    this.description = data.description;
    this.updateFlags = PEUPD_NONE;

    if( data.curPlat )
      this.curPlat = data.curPlat;
    else
      this.curPlat = {placementid: "", name: "", description: "", startTime: "", endTime: "", rank: 0, dayList: [], zoneList: [] };

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

    if( this.curPlat ) {
      if( this.curPlat.dayList.length == 0 )
        this.dayList[0].selected = true;   
      else
      {
        for( let i = 0; i < this.curPlat.dayList.length; i++ )
          for( let j = 1; j < this.dayList.length; j++ )
            if( this.curPlat.dayList[i] == this.dayList[j].name )
              this.dayList[j].selected = true;
      }
    }

    this.zoneList = [
      {id: "allzones", name: "All Zones", selected: false},
    ];

    for( let i = 0; i < data.zoneAvail.length; i++ )
    {
      const zlvObj : NMObjSelectionTracker = {id: data.zoneAvail[i].id, name: data.zoneAvail[i].name, selected: false};
      this.zoneList.push(zlvObj);
    }

    console.log(data);
  
    if( this.curPlat )
    {
      if( this.curPlat.zoneList.length == 0 )
        this.zoneList[0].selected = true;   
      else
      {
        for( let i = 0; i < this.curPlat.zoneList.length; i++ )
          for( let j = 1; j < this.zoneList.length; j++ )
            if( this.curPlat.zoneList[i] == this.zoneList[j].id )
              this.zoneList[j].selected = true;
      }
    }

    console.log(this.zoneList);

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      description: [this.description, []],
      nameFC: [this.curPlat.name, []],
      descriptionFC: [this.curPlat.description, []],      
      rankFC: [this.curPlat.rank, []],
      startTimeFC: [this.curPlat.startTime, []],
      endTimeFC: [this.curPlat.endTime, []]
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
