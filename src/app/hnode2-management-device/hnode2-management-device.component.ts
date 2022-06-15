import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'

@Component({
  selector: 'app-hnode2-management-device',
  templateUrl: './hnode2-management-device.component.html',
  styleUrls: ['./hnode2-management-device.component.scss']
})
export class Hnode2ManagementDeviceComponent implements OnInit {
  crc32ID: string | null

  constructor(private route: ActivatedRoute) {
    this.crc32ID = null;
  }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.crc32ID = params.get('crc32ID')
    })    
  }
}
