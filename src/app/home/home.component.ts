import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HomeDeviceConfigDialogComponent, DCUPD_NAME } from '../home-device-config-dialog/home-device-config-dialog.component';
import { DataService, Device, DeviceInventory, DeviceConfig } from '../_services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  content: DeviceInventory = {ownedDevices: [], unclaimedDevices: [], unavailableDevices: []};
  
  constructor(private dataService: DataService, private dialog: MatDialog) { }
  
  updateDeviceInventory(): void {
    this.dataService.getPublicContent().subscribe({
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

  onClaimDevice( crc32ID : string ): void {
    console.log( "onClaimDevice click - " + crc32ID );
    this.dataService.postClaimDeviceRequest( crc32ID ).subscribe({
      next: string => {
        this.updateDeviceInventory();
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
  }

  onReleaseDevice( crc32ID : string ): void {
    console.log( "onReleaseDevice click - " + crc32ID );
    this.dataService.postReleaseDeviceRequest( crc32ID ).subscribe({
      next: string => {
        this.updateDeviceInventory();
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
  }

  onEditButtonClick( crc32ID : string ): void
  {
    const dialogCfg = new MatDialogConfig();

    dialogCfg.autoFocus = true;

    //console.log(this.content.);
    
    let curConfig : DeviceConfig = { crc32ID: "", name: "" };
    for( const device of this.content.ownedDevices )
    {
      if( device.crc32ID = crc32ID )
      {
        curConfig.crc32ID = device.crc32ID;
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
          var updateFields: Record<string,any> = {crc32ID: curConfig.crc32ID};
          console.log("Dialog output:", data);
          
          if( data.updFlags & DCUPD_NAME )
            updateFields['name'] = data.form.nameFC;

          console.log( updateFields );

          this.dataService.postDeviceConfigUpdate( crc32ID, updateFields ).subscribe(()=>{
            this.updateDeviceInventory();
          });
        }
        else
          console.log("dialog Canceled");
        }
    );
  
  }

}
