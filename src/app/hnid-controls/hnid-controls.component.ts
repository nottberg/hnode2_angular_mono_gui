import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { IrrigationDataService, Status, Zone, Sequence } from '../_services/irrigation-data.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-hnid-controls',
  templateUrl: './hnid-controls.component.html',
  styleUrls: ['./hnid-controls.component.scss']
})
export class HnidControlsComponent implements OnInit {

  hexID: string | null;
  errMsg : string;

  status: Status | null = null;
  zoneList: Zone[] = [];
  sequenceList: Sequence[] = [];

  schedulerState: string = "enabled";

  oneTimeZoneIDList: string[] = [];

  onDuration: string = "00:00:00";
  offDuration: string = "00:00:00";

  selectedZoneID: any;
  selectedSequenceID: any;

  constructor(private route: ActivatedRoute, private irrData: IrrigationDataService) {
    this.hexID = null;
    this.errMsg = "";
  }

  refreshControlsConfig() : void {
    //this.selection.clear();
    const tmpID: string = this.hexID !== null ? this.hexID : '';
    this.irrData.getControlsConfig( tmpID ).subscribe({
      next: data => {
        this.status = data.status;
        this.zoneList = data.zoneList;
        this.sequenceList = data.sequenceList;

        if( (this.sequenceList != null) && (this.selectedSequenceID == null) )
          this.selectedSequenceID = this.sequenceList[0].sequenceid;

        if( (this.zoneList != null) && (this.selectedZoneID == null) )
          this.selectedZoneID = this.zoneList[0].zoneid;

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
      this.hexID = params.get('hexID');
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

  zoneActive( zoneid: string ): boolean {
    if( this.status == null )
      return false;

    for( let i = 0; i < this.status.activeZones.length; i++ )
    {
      if( zoneid == this.status.activeZones[i].id )
        return true;
    }

    return false;
  }

  changeSchedulerState(value : string) : void {
    console.log("schState change: " + value);
    //const tmpID: string = this.hexID !== null ? this.hexID : '';
    //this.irrData.postScheduleEnableOperation(tmpID, ((value == "enabled") ? true : false ));
  }

  executeSequence() : void {
    console.log("Execute Sequence");
    console.log(this.selectedSequenceID);
    const tmpID: string = this.hexID !== null ? this.hexID : '';
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
    const tmpID: string = this.hexID !== null ? this.hexID : '';
    this.irrData.postExecOneTimeSequenceOperation( tmpID, this.onDuration, this.offDuration, this.oneTimeZoneIDList ).subscribe(resp=>{
      console.log('One Time Sequence Started');
      //setTimeout(() => {this.refreshStatusConfig()}, 250);
    });
  }

  activateZone( event: any ) {
    console.log( "activateZone click");
    console.log( event );
    const durRegEx = RegExp('([0-9]+)([hms])');
    var idStr = event.target.closest('button').id;
    const paramArray = idStr.split("-");
    const cmdStr = paramArray[0];
    const durStr = paramArray[1];
    const zoneID = paramArray[2];

    console.log( idStr );
    console.log( cmdStr );
    console.log( durStr );
    console.log( zoneID );

    let noExpire = false;
    let onDurationStr = "00:00:00";
    if( durStr == 'custom' )
    {
      // Execute a dialog to get the desired duration
      console.log("Getting Duration");
      return;
    }
    else if( durStr == 'noexpire' )
    {
      noExpire = true;
    }
    else if( durRegEx.test( durStr ) )
    {
      console.log("Dur Reg Ex:");
      const mrst = durStr.match(durRegEx);
      if( mrst[2] == 's' )
      {
        let seconds = parseInt( mrst[1], 10 );
        if( seconds > 59 )
          seconds = 59;
        let numStr = new Intl.NumberFormat('en-IN', { minimumIntegerDigits: 2 }).format(seconds);
        onDurationStr = '00:00:' + numStr;
      }
      else if( mrst[2] == 'm' )
      {
        let minutes = parseInt( mrst[1], 10 );
        if( minutes > 59 )
          minutes = 59;
        let numStr = new Intl.NumberFormat('en-IN', { minimumIntegerDigits: 2 }).format(minutes);
        onDurationStr = '00:' + numStr + ':00';
      }
      else
      {
        let hours = parseInt( mrst[1], 10 );
        let numStr = new Intl.NumberFormat('en-IN', { minimumIntegerDigits: 2 }).format(hours);
        onDurationStr = numStr + ':00:00';
      }
    }
    else
    {
      console.log("Invalid Duration Str: " + durStr);
      return;
    }

    console.log( onDurationStr );

    if( cmdStr == 'activate')
    {
      if( noExpire == true )
      {
        console.log("No expire can't be used with a onetime sequence.")
        return;
      }

      const tmpID: string = this.hexID !== null ? this.hexID : '';
      this.irrData.postExecOneTimeSequenceOperation( tmpID, onDurationStr, "00:00:00", [zoneID] ).subscribe(resp=>{
        console.log('Single Zone Sequence Started');
        //setTimeout(() => {this.refreshStatusConfig()}, 250);
      });
    }
    else if( cmdStr == 'inhibit' )
    {
      if( noExpire == true )
      {
        console.log( "no expiration inhibit request");
      }

      console.log('inhibit request');
    }
  }

  delayScheduler( event: any ) {
    console.log( "delay scheduler click");
    console.log( event );
    const durRegEx = RegExp('([0-9]+)([hms])');
    var idStr = event.target.closest('button').id;
    const paramArray = idStr.split("-");
    const cmdStr = paramArray[0];
    const durStr = paramArray[1];
    const zoneID = paramArray[2];
  }

  isSequenceActive() : boolean
  {
    // FIXME
    return false;
  }

  getActiveSequenceName() : string
  {
    // FIXME
    return "Bob's Sequence";
  }

  cancelActiveSequence() : void
  {
    // FIXME
  }


}
