import { Component, OnInit } from '@angular/core';
import { DataService, ServiceInventory } from '../_services/data.service';

@Component({
  selector: 'app-hnmd-services',
  templateUrl: './hnmd-services.component.html',
  styleUrls: ['./hnmd-services.component.scss']
})
export class HnmdServicesComponent implements OnInit {

  content: ServiceInventory = {providerSet: {}};

  constructor(private dataService: DataService) { }

  updateServicesInfo(): void {
    this.dataService.getServicesContent().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
  }

  ngOnInit(): void {
    this.updateServicesInfo();
  }

}
