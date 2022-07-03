import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { IrrigationDataService, Zone, Sequence } from '../_services/irrigation-data.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-hnid-controls',
  templateUrl: './hnid-controls.component.html',
  styleUrls: ['./hnid-controls.component.scss']
})
export class HnidControlsComponent implements OnInit {

  crc32ID: string | null;
  errMsg : string;

  zoneList: Zone[] = [];
  sequenceList: Sequence[] = [];

  schedulerState: string = "enabled";

  oneTimeZoneIDList: string[] = [];

  onDuration: string = "00:00:00";
  offDuration: string = "00:00:00";

  selectedZoneID: any;
  selectedSequenceID: any;

  constructor(private route: ActivatedRoute, private irrData: IrrigationDataService) {
    this.crc32ID = null;
    this.errMsg = "";
  }

  refreshControlsConfig() : void {
    //this.selection.clear();
    const tmpID: string = this.crc32ID !== null ? this.crc32ID : '';
    this.irrData.getControlsConfig( tmpID ).subscribe({
      next: data => {
        this.zoneList = data.zoneList;
        this.sequenceList = data.sequenceList;
        console.log( this.zoneList );
        console.log( this.sequenceList );       
      },
      error: err => {
        this.zoneList = [];
        this.sequenceList = [];
        this.errMsg = JSON.parse(err.error).message;
      }
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.crc32ID = params.get('crc32ID');
      this.refreshControlsConfig();
    });    
  }

  getZoneName( zoneid: string ) : string {
    for( let i = 0; i < this.zoneList.length; i++ )
    {
      if( this.zoneList[i].zoneid == zoneid )
        return this.zoneList[i].name;
    }

    return "Zone ID Not Found (" + zoneid + ")";
  }

  changeSchedulerState(value : string) : void {
    console.log("schState change: " + value);
    //const tmpID: string = this.crc32ID !== null ? this.crc32ID : '';
    //this.irrData.postScheduleEnableOperation(tmpID, ((value == "enabled") ? true : false ));
  }

  executeSequence() : void {
    console.log("Execute Sequence");
    console.log(this.selectedSequenceID);
    const tmpID: string = this.crc32ID !== null ? this.crc32ID : '';
    this.irrData.postExecSequenceOperation( tmpID, this.selectedSequenceID ).subscribe(resp=>{
      console.log('Sequence Started');
      //setTimeout(() => {this.refreshStatusConfig()}, 250);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.oneTimeZoneIDList, event.previousIndex, event.currentIndex);
  }

  addZoneID() : void {
    if( this.selectedZoneID == null )
      return;

    this.oneTimeZoneIDList.push( this.selectedZoneID );  
  }

  removeZoneID() : void {
    if( this.selectedZoneID == null )
    return;

    do{
      var index = this.oneTimeZoneIDList.indexOf( this.selectedZoneID );
      if (index !== -1) {
        this.oneTimeZoneIDList.splice(index, 1);
      }
    }while( index !== -1 );
  }

  executeOneTimeSequence() : void {
    console.log("Execute One-Time Sequence");
    console.log(this.oneTimeZoneIDList);
    console.log(this.onDuration);
    console.log(this.offDuration);
  }

  activateZone( event: any ) {
    console.log( "activateZone click");
    console.log( event );
    var idStr = event.target.closest('button').id;
    const paramArray = idStr.split("-");
    console.log( idStr );
    console.log( paramArray[0] );
    console.log( paramArray[1] );
    console.log( paramArray[2] );

  }
}
