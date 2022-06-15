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

  displayedColumns: string[] = ['name', 'start', 'end', 'action'];

  nullSchedule: Schedule = {scheduleTimezone: "", scheduleMatrix : { Sunday:[], Monday:[], Tuesday:[], Wednesday:[], Thursday:[], Friday:[], Saturday:[] }};
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
        },
        error: err => {
          this.schedule = this.nullSchedule; 
          this.errMsg = JSON.parse(err.error).message;
        }
      });
    });

  }

}
