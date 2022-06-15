import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { IrrigationDataService, Status } from '../_services/irrigation-data.service';

@Component({
  selector: 'app-hnode2-irrigation-device',
  templateUrl: './hnode2-irrigation-device.component.html',
  styleUrls: ['./hnode2-irrigation-device.component.scss']
})
export class Hnode2IrrigationDeviceComponent implements OnInit {
  
  crc32ID: string | null;
  status: Status | null;
  errMsg : string;

  constructor(private route: ActivatedRoute, private irrData: IrrigationDataService) {
    this.crc32ID = null;
    this.status = null;
    this.errMsg = "";
  }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.crc32ID = params.get('crc32ID')
      const tmpID: string = this.crc32ID !== null ? this.crc32ID : '';
      this.irrData.getStatus( tmpID ).subscribe({
        next: data => {
          this.status = data;
        },
        error: err => {
          this.status = null; 
          this.errMsg = JSON.parse(err.error).message;
        }
      });
    })
    
  
  }
}
