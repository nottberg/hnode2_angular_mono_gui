import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'

@Component({
  selector: 'app-hnode2-test-device',
  templateUrl: './hnode2-test-device.component.html',
  styleUrls: ['./hnode2-test-device.component.scss']
})
export class Hnode2TestDeviceComponent implements OnInit {
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
