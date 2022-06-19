import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { FormGroup, FormBuilder } from '@angular/forms';
import { Modifier, NamedObj } from '../_services/irrigation-data.service';

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
  curMod: Modifier;
  updateFlags: number;
  zoneAvail : NamedObj[];
  zoneSelected : string;
  typeSelected : string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<HnidModifiersEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data : any) { 

    this.description = data.description;
    this.updateFlags = MUPD_NONE;

    console.log(data);
    this.curMod = data.curMod;
    this.zoneAvail = data.zoneAvail;

    this.zoneSelected = "";
    if( data.curMod.zoneid )
      this.zoneSelected = data.curMod.zoneid;

    this.typeSelected = "local.duration";
    if( data.curMod.type )
      this.typeSelected = data.curMod.type;
  
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
    if( this.zoneSelected != this.curMod.zoneid )
    {
      this.form.value.zoneidFC = this.zoneSelected;
      this.updateFlags |= MUPD_ZONE;
    }

    console.log("typeSelected: " + this.typeSelected )
    if( this.typeSelected != this.curMod.type )
    {
      this.form.value.typeFC = this.typeSelected;
      this.updateFlags |= MUPD_TYPE;
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
      this.updateFlags |= MUPD_NAME;
    else if( ctrlID == "descriptionFC" )
      this.updateFlags |= MUPD_DESC;
    else if( ctrlID == "valueFC" )
      this.updateFlags |= MUPD_VALUE;    
  }

}
