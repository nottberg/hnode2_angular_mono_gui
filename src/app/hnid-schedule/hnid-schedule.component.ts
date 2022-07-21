import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { IrrigationDataService, Schedule, ScheduleZoneStatistics } from '../_services/irrigation-data.service';

@Component({
  selector: 'app-hnid-schedule',
  templateUrl: './hnid-schedule.component.html',
  styleUrls: ['./hnid-schedule.component.scss']
})
export class HnidScheduleComponent implements OnInit {

  crc32ID: string | null;
  errMsg : string;

  displayedColumns: string[] = ['name', 'start', 'end'];

  nullSchedule: Schedule = {scheduleTimezone: "", scheduleMatrix : { Sunday:[], Monday:[], Tuesday:[], Wednesday:[], Thursday:[], Friday:[], Saturday:[] }, schedulerInhibitID: "", schedulerInhibitExpirationDateStr: "", schedulerInhibitName: "", zoneStatistics: []};
  schedule: Schedule = this.nullSchedule;

  constructor( private route: ActivatedRoute, private irrData: IrrigationDataService ) {
    this.crc32ID = null;
    this.errMsg = "";    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.crc32ID = params.get('crc32ID');
      const tmpID: string = this.crc32ID !== null ? this.crc32ID : '';
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
    if( hours < 10 )
      outStr = "0" + hours.toFixed(0);
    else
      outStr = hours.toFixed(0);

    outStr += ":";
    if( minutes < 10 )
      outStr += "0" + minutes.toFixed(0);
    else
      outStr += minutes.toFixed(0);

    outStr += ":";
    if( seconds < 10 )
      outStr += "0" + seconds.toFixed(0);
    else
      outStr += seconds.toFixed(0);
  
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

    return zs.startsByDay[day][row].duration;
  }
}
