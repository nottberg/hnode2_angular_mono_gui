import { Component, OnInit, ViewChild } from '@angular/core';
import { DxTreeListComponent } from 'devextreme-angular';
import { DataService, ClusterHealth, ComponentHealth, Employee } from '../_services/data.service';

import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-hnmd-health',
  templateUrl: './hnmd-health.component.html',
  styleUrls: ['./hnmd-health.component.scss']
})
export class HnmdHealthComponent implements OnInit {

  content: ClusterHealth = { healthArray: [] };
  healthArraySource: CustomStore;

  @ViewChild('treeListVar', { static: false }) treeList!: DxTreeListComponent;  
  
  //testData: Employee[] = [];

  constructor(private dataService: DataService) { 
    this.healthArraySource = new CustomStore({
      key:'id',
      load: (loadOptions) => {
        console.log("CustomStore load start");
        console.log( loadOptions );

        console.log( this.treeList.keyExpr );
        console.log( this.treeList.parentIdExpr );

        return lastValueFrom(this.dataService.getClusterHealthContent())
          .then(data => {
            console.log(data);
            this.content = data;
            return this.content.healthArray;
            //let arr = [{"id":"t1", "parentId":"", "Name":"Test 1"}, {"id":"t2", "parentId":"t1", "Name":"Test 1.1"}];
            //console.log(arr);
            //return arr;
          })
          .catch(() => {
            console.log("Data Loading Error");
            return [];
          })
      }
    });
  }

  updateHealthInfo(): void {
    //this.testData = this.dataService.getEmployees();
    //console.log( this.testData );
    /*
    this.dataService.getClusterHealthContent().subscribe({
      next: data => {
        console.log( data );
        this.content = data;

        //this.treeList.instance.refresh()
        //  .then(function() { console.log("refresh complete"); })
        //  .catch(function(error) { console.log("refresh failed: " + error); });
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
    */
  }

  ngOnInit(): void {
    //this.updateHealthInfo();
    console.log("health component ngOnInit");
  }

  showDescription( e: any ): void {
    console.log("showDescription");
    console.log( e );
  }
  
}
