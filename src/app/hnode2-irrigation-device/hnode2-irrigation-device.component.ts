import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { IrrigationDataService, Status } from '../_services/irrigation-data.service';

@Component({
  selector: 'app-hnode2-irrigation-device',
  templateUrl: './hnode2-irrigation-device.component.html',
  styleUrls: ['./hnode2-irrigation-device.component.scss']
})
export class Hnode2IrrigationDeviceComponent implements OnInit {
  
  hexID: string | null;
  status: Status | null;
  errMsg : string;

  constructor(private route: ActivatedRoute, private irrData: IrrigationDataService) {
    this.hexID = null;
    this.status = null;
    this.errMsg = "";
  }
  
  refreshStatusConfig() : void {
    const tmpID: string = this.hexID !== null ? this.hexID : '';
    this.irrData.getStatus( tmpID ).subscribe({
      next: data => {
        this.status = data;
      },
      error: err => {
        this.status = null; 
        this.errMsg = JSON.parse(err.error).message;
      }
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.hexID = params.get('crc32ID')
      this.refreshStatusConfig();
    });
  }

  changeSchedulerState(value : string) : void {
      console.log("schState change: " + value);
      const tmpID: string = this.hexID !== null ? this.hexID : '';
      this.irrData.postScheduleEnableOperation(tmpID, ((value == "enabled") ? true : false )).subscribe(resp=>{
        console.log('Scheduler State Updated');
        setTimeout(() => {this.refreshStatusConfig()}, 250);
      });
  }

}
