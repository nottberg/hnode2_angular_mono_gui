import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-hnsd-nav-list',
  templateUrl: './hnsd-nav-list.component.html',
  styleUrls: ['./hnsd-nav-list.component.scss']
})
export class HnsdNavListComponent implements OnInit {

  hexID : string | null = null;

  constructor( private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.hexID = params.get('hexID');
      console.log(this.hexID);
    });

  }

}
