import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HomeDeviceConfigDialogComponent, DCUPD_NAME } from '../home-device-config-dialog/home-device-config-dialog.component';
import { DataService, Device, DeviceInventory, DeviceConfig } from '../_services/data.service';

@Component({
  selector: 'app-hnmd-devices',
  templateUrl: './hnmd-devices.component.html',
  styleUrls: ['./hnmd-devices.component.scss']
})
export class HnmdDevicesComponent implements OnInit {

  content: DeviceInventory = {ownedDevices: [], unclaimedDevices: [], unavailableDevices: []};
  
  constructor(private dataService: DataService, private dialog: MatDialog) { }
  
  updateDeviceInventory(): void {
    this.dataService.getDeviceInventory().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
  }

  ngOnInit(): void {
    this.updateDeviceInventory();
  }

  onClaimDevice( hexID : string ): void {
    console.log( "onClaimDevice click - " + hexID );
    this.dataService.postClaimDeviceRequest( hexID ).subscribe({
      next: string => {
        this.updateDeviceInventory();
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
  }

  onReleaseDevice( hexID : string ): void {
    console.log( "onReleaseDevice click - " + hexID );
    this.dataService.postReleaseDeviceRequest( hexID ).subscribe({
      next: string => {
        this.updateDeviceInventory();
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
  }

  onEditButtonClick( hexID : string ): void
  {
    const dialogCfg = new MatDialogConfig();

    dialogCfg.autoFocus = true;

    //console.log(this.content.);
    
    let curConfig : DeviceConfig = { hexID: "", name: "" };
    for( const device of this.content.ownedDevices )
    {
      if( device.hexID = hexID )
      {
        curConfig.hexID = device.hexID;
        curConfig.name = device.name;
      }
    }
    
    dialogCfg.data = {
      description: 'Edit Device Configuration',
      curConfig: curConfig
    };

    const dialogRef = this.dialog.open( HomeDeviceConfigDialogComponent, dialogCfg );

    dialogRef.afterClosed().subscribe(
      data => {
        if( data )
        {
          var updateFields: Record<string,any> = {hexID: curConfig.hexID};
          console.log("Dialog output:", data);
          
          if( data.updFlags & DCUPD_NAME )
            updateFields['name'] = data.form.nameFC;

          console.log( updateFields );

          this.dataService.postDeviceConfigUpdate( hexID, updateFields ).subscribe(()=>{
            this.updateDeviceInventory();
          });
        }
        else
          console.log("dialog Canceled");
        }
    );
  
  }

}
