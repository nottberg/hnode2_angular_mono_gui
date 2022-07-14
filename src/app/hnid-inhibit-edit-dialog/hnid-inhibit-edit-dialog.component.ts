import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { FormGroup, FormBuilder } from '@angular/forms';
import { Inhibit, NamedObj } from '../_services/irrigation-data.service';

// Bitfield values for tracking updates
export const INUPD_NONE       = 0;  // 0b00000000
export const INUPD_NAME       = 1;  // 0b00000001
export const INUPD_TYPE       = 2;  // 0b00000010
export const INUPD_DURATION   = 4;  // 0b00000100
export const INUPD_EXPIREDATE = 8;  // 0b00001000
export const INUPD_ZONE       = 16; // 0b00010000

@Component({
  selector: 'app-hnid-inhibit-edit-dialog',
  templateUrl: './hnid-inhibit-edit-dialog.component.html',
  styleUrls: ['./hnid-inhibit-edit-dialog.component.scss']
})
export class HnidInhibitEditDialogComponent implements OnInit {
  form!: FormGroup;
  description: string;

  curInhibit: Inhibit;
  updateFlags: number;

  zoneAvail : NamedObj[];

  zoneSelected : string;
  typeSelected : string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<HnidInhibitEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data : any) { 

    this.description = data.description;
    this.updateFlags = INUPD_NONE;

    console.log(data);
    this.curInhibit = data.curInhibit;
    this.zoneAvail = data.zoneAvail;

    this.zoneSelected = "";
    this.typeSelected = "scheduler";

    if( data.curInhibit )
    { 
      if( data.curInhibit.zoneID )
        this.zoneSelected = data.curInhibit.zoneID;

      if( data.curInhibit.type )
        this.typeSelected = data.curInhibit.type;
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      description: [this.description, []],
      nameFC: [this.curInhibit.name, []],
      durationFC: [this.curInhibit.duration, []],
      zoneIDFC: [this.curInhibit.zoneID, []]
    });
  }

  getZoneName( zoneid: string ) : string {
    for( let i = 0; i < this.zoneAvail.length; i++ )
    {
      if( this.zoneAvail[i].id == zoneid )
        return this.zoneAvail[i].name;
    }

    return "Zone Not Found (" + zoneid + ")";
  }

  save() {
    console.log("zoneSelected: " + this.zoneSelected )
    if( this.zoneSelected != this.curInhibit.zoneID )
    {
      this.form.value.zoneIDFC = this.zoneSelected;
      this.updateFlags |= INUPD_ZONE;
    }

    console.log("typeSelected: " + this.typeSelected )
    if( this.typeSelected != this.curInhibit.type )
    {
      this.form.value.typeFC = this.typeSelected;
      this.updateFlags |= INUPD_TYPE;
    }

    const rtnData = { form: this.form.value,
                      updFlags: this.updateFlags };

    this.dialogRef.close(rtnData);
  }

  close() {
    this.dialogRef.close();
  }

  onFieldUpdate( ctrlID: string ) {
    if( ctrlID == "nameFC" )
      this.updateFlags |= INUPD_NAME;
    else if( ctrlID == "durationFC" )
      this.updateFlags |= INUPD_DURATION;
  }
}
