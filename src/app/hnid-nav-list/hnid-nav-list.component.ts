import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-hnid-nav-list',
  templateUrl: './hnid-nav-list.component.html',
  styleUrls: ['./hnid-nav-list.component.scss']
})
export class HnidNavListComponent implements OnInit {

  crc32ID : string | null = null;

  constructor( private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.crc32ID = params.get('crc32ID');
      console.log(this.crc32ID);
    });

  }

}
