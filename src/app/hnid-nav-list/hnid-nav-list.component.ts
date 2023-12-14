import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-hnid-nav-list',
  templateUrl: './hnid-nav-list.component.html',
  styleUrls: ['./hnid-nav-list.component.scss']
})
export class HnidNavListComponent implements OnInit {

  hexID : string | null = null;

  constructor( private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.hexID = params.get('hexID');
      console.log(this.hexID);
    });

  }

}
