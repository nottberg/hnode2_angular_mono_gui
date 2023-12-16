import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { SlideDigitizerDataService, Status } from '../_services/slide-digitizer-data.service';

@Component({
  selector: 'app-hnode2-slide-digitizer-device',
  templateUrl: './hnode2-slide-digitizer-device.component.html',
  styleUrls: ['./hnode2-slide-digitizer-device.component.scss']
})
export class Hnode2SlideDigitizerDeviceComponent implements OnInit {
  hexID: string | null;
  status: Status | null;
  errMsg : string;

  constructor(private route: ActivatedRoute, private sdData: SlideDigitizerDataService) {
    this.hexID = null;
    this.status = null;
    this.errMsg = "";
  }
  
  refreshStatusConfig() : void {
    const tmpID: string = this.hexID !== null ? this.hexID : '';
    this.sdData.getStatus( tmpID ).subscribe({
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
      this.hexID = params.get('hexID')
      this.refreshStatusConfig();
    });
  }

}
