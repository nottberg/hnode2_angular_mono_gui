import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'

@Component({
  selector: 'app-hnode2-management-device',
  templateUrl: './hnode2-management-device.component.html',
  styleUrls: ['./hnode2-management-device.component.scss']
})
export class Hnode2ManagementDeviceComponent implements OnInit {
  hexID: string | null

  constructor(private route: ActivatedRoute) {
    this.hexID = null;
  }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.hexID = params.get('hexID')
    })    
  }
}
