import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { IrrigationDataService, Schedule, ScheduleZoneStatistics } from '../_services/irrigation-data.service';

@Component({
  selector: 'app-hnid-schedule',
  templateUrl: './hnid-schedule.component.html',
  styleUrls: ['./hnid-schedule.component.scss']
})
export class HnidScheduleComponent implements OnInit {

  hexID: string | null;
  errMsg : string;

  displayedColumns: string[] = ['name', 'start', 'end', 'duration'];

  nullSchedule: Schedule = {scheduleTimezone: "", scheduleMatrix : { Sunday:[], Monday:[], Tuesday:[], Wednesday:[], Thursday:[], Friday:[], Saturday:[] }, schedulerInhibitID: "", schedulerInhibitExpirationDateStr: "", schedulerInhibitName: "", zoneStatistics: []};
  schedule: Schedule = this.nullSchedule;

  constructor( private route: ActivatedRoute, private irrData: IrrigationDataService ) {
    this.hexID = null;
    this.errMsg = "";    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.hexID = params.get('hexID');
      const tmpID: string = this.hexID !== null ? this.hexID : '';
      this.irrData.getSchedule( tmpID ).subscribe({
        next: data => {
          this.schedule = data;
          console.log(this.schedule);
        },
        error: err => {
          console.log("Error getting schedule");
          this.schedule = this.nullSchedule; 
          this.errMsg = JSON.parse(err.error).message;
        }
      });
    });

  }

  formatWithSign( seconds: number ) : string {
    if( seconds > 0 )
      return "+" + seconds.toFixed(0);
    
    return "-" + seconds.toFixed(0);
  }

  formatSecondsToHMS( totalSeconds: number ) : string {
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    let outStr = "";
    if( hours != 0 ) outStr += hours.toFixed(0) + "h";
    if( minutes != 0 ) outStr += minutes.toFixed(0) + "m";
    if( seconds != 0 ) outStr += seconds.toFixed(0) + "s";
  
    return outStr;
  }

  reformatDuration( csTimeStr : string ) : string {
    if( csTimeStr == "" )
      return csTimeStr;

    const csArr = csTimeStr.split(":");
    var hours = parseInt( csArr[0], 10 );
    var minutes = parseInt( csArr[1], 10 );
    if( minutes > 59 ) minutes = 59;
    var seconds = parseInt( csArr[2], 10 );
    if( seconds > 59 ) seconds = 59;

    var outStr = "";
    if( hours != 0 ) outStr += hours.toFixed(0) + "h";
    if( minutes != 0 ) outStr += minutes.toFixed(0) + "m";
    if( seconds != 0 ) outStr += seconds.toFixed(0) + "s";

    return outStr;
  }

  getStartDurationLabel( row: number ) : string {
    if( row == 0 )
      return "Start Time / Duration";

    return "";
  }

  getZoneScheduleStartTime( zoneid: string, row: number, day: string ) : string {

    var zs : any = this.schedule.zoneStatistics.find(obj => {
      return obj.zoneid == zoneid;
    })

    return zs.startsByDay[day][row].startTime;
  }

  getZoneScheduleDuration( zoneid: string, row: number, day: string ) : string {

    var zs : any = this.schedule.zoneStatistics.find(obj => {
      return obj.zoneid == zoneid;
    })

    return this.reformatDuration( zs.startsByDay[day][row].duration );
  }
}
