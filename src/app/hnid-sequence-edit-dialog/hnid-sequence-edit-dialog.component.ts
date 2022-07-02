import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { FormGroup, FormBuilder } from '@angular/forms';
import { Sequence, NMObjSelectionTracker } from '../_services/irrigation-data.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

// Bitfield values for tracking updates
export const SQUPD_NONE        = 0;  // 0b00000000
export const SQUPD_NAME        = 1;  // 0b00000001
export const SQUPD_DESC        = 2;  // 0b00000010
export const SQUPD_TYPE        = 4;  // 0b00000100
export const SQUPD_ONDURATION  = 8;  // 0b00001000
export const SQUPD_OFFDURATION = 16; // 0b00010000
export const SQUPD_OBJIDLIST   = 32; // 0b00100000

@Component({
  selector: 'app-hnid-sequence-edit-dialog',
  templateUrl: './hnid-sequence-edit-dialog.component.html',
  styleUrls: ['./hnid-sequence-edit-dialog.component.scss']
})
export class HnidSequenceEditDialogComponent implements OnInit {
  form!: FormGroup;
  description: string;

  curSeq: Sequence;
  updateFlags: number;

  availZones : NMObjSelectionTracker[];

  selectedObjID : any;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<HnidSequenceEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data : any) { 

    this.description = data.description;
    this.updateFlags = SQUPD_NONE;

    if( data.curSeq )
    {
      this.curSeq = data.curSeq;
    }
    else
      this.curSeq = {sequenceid: "", name: "", description: "", type: "uniform", onDuration: "", offDuration: "", objIDList: [] };

     this.availZones = data.availZones;
    
     if( this.availZones )
     {
      this.selectedObjID = this.availZones[0].id;
     }

     console.log(data);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      description: [this.description, []],
      nameFC: [this.curSeq.name, []],
      descriptionFC: [this.curSeq.description, []],      
      onDurationFC: [this.curSeq.onDuration, []],
      offDurationFC: [this.curSeq.offDuration, []]
    });
  }

  getObjectName( objid: string ) : string {
    for( let i = 0; i < this.availZones.length; i++ )
    {
      if( this.availZones[i].id == objid )
        return this.availZones[i].name;
    }

    return "Object ID Not Found (" + objid + ")";
  }

  drop(event: CdkDragDrop<string[]>) {
    this.updateFlags |= SQUPD_OBJIDLIST;
    moveItemInArray(this.curSeq.objIDList, event.previousIndex, event.currentIndex);
  }

  addObjID() {
    if( this.selectedObjID == null )
      return;

    this.updateFlags |= SQUPD_OBJIDLIST;
    this.curSeq.objIDList.push( this.selectedObjID );  
  }

  removeObjID() {
    if( this.selectedObjID == null )
      return;

    this.updateFlags |= SQUPD_OBJIDLIST;
    do{
      var index = this.curSeq.objIDList.indexOf( this.selectedObjID );
      if (index !== -1) {
        this.curSeq.objIDList.splice(index, 1);
      }
    }while( index !== -1 );
  }

  save() {
    const rtnData = { form: this.form.value,
                      type: this.curSeq.type,
                      objIDList: this.curSeq.objIDList,
                      updFlags: this.updateFlags
                    };

    this.dialogRef.close(rtnData);
  }

  close() {
    console.log(this.form.value);
    console.log(this.updateFlags);
    console.log(this.curSeq.objIDList);

    this.dialogRef.close();
  }

  onFieldUpdate( ctrlID: string ) {
    if( ctrlID == "nameFC" )
      this.updateFlags |= SQUPD_NAME;
    else if( ctrlID == "descriptionFC" )
      this.updateFlags |= SQUPD_DESC;
    else if( ctrlID == "onDurationFC" )
      this.updateFlags |= SQUPD_ONDURATION;
    else if( ctrlID == "offDurationFC" )
      this.updateFlags |= SQUPD_OFFDURATION; 
  }

}
