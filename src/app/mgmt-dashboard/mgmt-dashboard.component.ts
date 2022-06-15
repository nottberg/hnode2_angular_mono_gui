import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-mgmt-dashboard',
  templateUrl: './mgmt-dashboard.component.html',
  styleUrls: ['./mgmt-dashboard.component.scss']
})
export class MgmtDashboardComponent implements OnInit {
  
  content?: string;
  
  constructor(private dataService: DataService) { }
  
  ngOnInit(): void {
    this.dataService.getUserBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
  }

}
