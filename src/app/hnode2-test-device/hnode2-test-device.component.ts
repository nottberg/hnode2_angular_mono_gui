import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'

@Component({
  selector: 'app-hnode2-test-device',
  templateUrl: './hnode2-test-device.component.html',
  styleUrls: ['./hnode2-test-device.component.scss']
})
export class Hnode2TestDeviceComponent implements OnInit {
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
