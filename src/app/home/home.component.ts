import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
//import { HomeDeviceConfigDialogComponent, DCUPD_NAME } from '../home-device-config-dialog/home-device-config-dialog.component';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  //content: DeviceInventory = {ownedDevices: [], unclaimedDevices: [], unavailableDevices: []};
  
  constructor(private dataService: DataService, private dialog: MatDialog) { }
  
  /*
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
  */

  ngOnInit(): void {
    //this.updateDeviceInventory();
  }
}
