import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { IrrigationDataService, Schedule } from '../_services/irrigation-data.service';

@Component({
  selector: 'app-hnid-schedule',
  templateUrl: './hnid-schedule.component.html',
  styleUrls: ['./hnid-schedule.component.scss']
})
export class HnidScheduleComponent implements OnInit {

  crc32ID: string | null;
  errMsg : string;

  displayedColumns: string[] = ['name', 'start', 'end'];

  nullSchedule: Schedule = {scheduleTimezone: "", scheduleMatrix : { Sunday:[], Monday:[], Tuesday:[], Wednesday:[], Thursday:[], Friday:[], Saturday:[] }, zoneStatistics: []};
  schedule: Schedule = this.nullSchedule;

  scheduleByZoneRow1: any = { z1: [[{startTime:"09:00:00", duration:"00:05:00"}, {startTime:"10:00:00", duration:"00:05:00"},{startTime:"11:00:00", duration:"00:05:00"},{startTime:"12:00:00", duration:"00:05:00"},{startTime:"13:00:00", duration:"00:05:00"},{startTime:"14:00:00", duration:"00:05:00"},{startTime:"15:09:00", duration:"00:05:00"}]]};

  scheduleByZone: any = { z1: [[{startTime:"16:00:00", duration:"00:05:00"}, {startTime:"17:00:00", duration:"00:05:00"},{startTime:"18:00:00", duration:"00:05:00"},{startTime:"19:00:00", duration:"00:05:00"},{startTime:"20:00:00", duration:"00:05:00"},{startTime:"21:00:00", duration:"00:05:00"},{startTime:"22:09:00", duration:"00:05:00"}],
                               [{startTime: "", duration:""}, {startTime:"23:00:00", duration:"00:05:00"}, {startTime: "", duration:""}, {startTime: "", duration:""}, {startTime: "", duration:""}, {startTime: "", duration:""}, {startTime: "", duration:""}]] };

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
          //this.schedule.zoneStatistics = [{appliedModifiers:[], zoneName:"Test Zone", zoneid:"z1", avgSecondsPerDay: 10, baseSeconds: 100, secondsPerDay: { Sunday:0, Monday:0, Tuesday:0, Wednesday:0, Thursday:0, Friday:0, Saturday:0 }, totalSeconds:800}, {appliedModifiers:[], zoneName:"Test Zone 2", zoneid:"z2", avgSecondsPerDay: 10, baseSeconds: 100, secondsPerDay: { Sunday:0, Monday:0, Tuesday:0, Wednesday:0, Thursday:0, Friday:0, Saturday:0 }, totalSeconds:800}]
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

  getZoneScheduleStartTime( zoneid: string, row: number, day: number ) : string {
    return row + "," + day;
  }

  getZoneScheduleDuration( zoneid: string, row: number, day: number ) : string {
    return row + "," + day;
  }
}
