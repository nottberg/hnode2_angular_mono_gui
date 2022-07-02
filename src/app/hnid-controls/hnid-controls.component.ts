import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { IrrigationDataService, NMObjSelectionTracker } from '../_services/irrigation-data.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-hnid-controls',
  templateUrl: './hnid-controls.component.html',
  styleUrls: ['./hnid-controls.component.scss']
})
export class HnidControlsComponent implements OnInit {

  crc32ID: string | null;
  errMsg : string;

  objIDList: string[] = [];
  availZones : NMObjSelectionTracker[] = [];

  selectedObjID : any;

  constructor(private route: ActivatedRoute, private irrData: IrrigationDataService) {
    this.crc32ID = null;
    this.errMsg = "";
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.crc32ID = params.get('crc32ID');
      //this.refreshSequencesConfig();
    });    
  }

  getObjectName( objid: string ) : string {
    for( let i = 0; i < this.availZones.length; i++ )
    {
      if( this.availZones[i].id == objid )
        return this.availZones[i].name;
    }

    return "Object ID Not Found (" + objid + ")";
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.objIDList, event.previousIndex, event.currentIndex);
  }

  addObjID() : void {

  }

  removeObjID() : void {

  }

  executeOneTimeSequence() : void {

  }
  
}
