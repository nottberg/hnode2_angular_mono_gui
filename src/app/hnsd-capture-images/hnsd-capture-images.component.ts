import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Capture, SlideDigitizerDataService } from '../_services/slide-digitizer-data.service';

@Component({
  selector: 'app-hnsd-capture-images',
  templateUrl: './hnsd-capture-images.component.html',
  styleUrls: ['./hnsd-capture-images.component.scss']
})
export class HnsdCaptureImagesComponent implements OnInit {

  hexID : string | null;
  capID : string | null;
  curCapture : Capture;

  constructor(private route: ActivatedRoute, private dataService: SlideDigitizerDataService) { 
    this.hexID = null;
    this.capID = null;
    this.curCapture = {} as Capture;
  }

  updateCaptureRecord(): void {
    if( this.hexID == null || this.capID == null )
      return;

    const hID: string = this.hexID !== null ? this.hexID : '';
    const cID: string = this.capID !== null ? this.capID : '';
    this.dataService.getCapture( hID, cID ).subscribe({
      next: data => {
        this.curCapture = data;
        console.log( this.curCapture );       
      },
      error: err => {
        this.curCapture = {} as Capture;
      }
    });
  }

  ngOnInit() : void {
    console.log("hnsd-captures ngOnInit");
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.hexID = params.get('hexID');
      this.capID = params.get('capID');
      this.updateCaptureRecord();
    });    
  }

  getImageURL( fileID : string ) : string {
    if( this.hexID == null )
      return "";
    
    const hID: string = this.hexID !== null ? this.hexID : '';
    return this.dataService.getCaptureImageURL( hID, fileID );
  }

}
