import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { FormGroup, FormBuilder } from '@angular/forms';
import { DeviceConfig } from '../_services/data.service';

// Bitfield values for tracking updates
export const DCUPD_NONE  = 0;  // 0b00000000
export const DCUPD_NAME  = 1;  // 0b00000001

@Component({
  selector: 'app-home-device-config-dialog',
  templateUrl: './home-device-config-dialog.component.html',
  styleUrls: ['./home-device-config-dialog.component.scss']
})
export class HomeDeviceConfigDialogComponent implements OnInit {

  form!: FormGroup;
  description: string;

  curConfig: DeviceConfig;

  updateFlags: number;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<HomeDeviceConfigDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) { 

    this.description = data.description;
    this.curConfig = data.curConfig;
    this.updateFlags = DCUPD_NONE;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
        description: [this.description, []],
        nameFC: [this.curConfig.name, []],
    });
  }

  save() {
    const rtnData = { form: this.form.value,
                      updFlags: this.updateFlags };

    this.dialogRef.close( rtnData );
  }

  close() {
    this.dialogRef.close();
  }

  onFieldUpdate( ctrlID : string ) {
    if( ctrlID == "nameFC" )
      this.updateFlags |= DCUPD_NAME;    
  }

}
