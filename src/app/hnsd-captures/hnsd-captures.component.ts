import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DxTreeListComponent } from 'devextreme-angular';
import { Capture, SlideDigitizerDataService } from '../_services/slide-digitizer-data.service';
import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-hnsd-captures',
  templateUrl: './hnsd-captures.component.html',
  styleUrls: ['./hnsd-captures.component.scss']
})
export class HnsdCapturesComponent implements OnInit {

  hexID : string | null;

  content: Capture[] = [];
  captureListSource: CustomStore;

  @ViewChild('treeListVar', { static: false }) treeList!: DxTreeListComponent;  
  
  constructor(private router: Router, private route: ActivatedRoute, private dataService: SlideDigitizerDataService) { 
    this.hexID = null;
    this.captureListSource = new CustomStore();

    // Bind the callback so it can reference the component variables.
    this.navigateToCapture = this.navigateToCapture.bind(this);
  }

  updateCaptureList(): void {    
    this.captureListSource = new CustomStore({
      key:'id',
      load: (loadOptions) => {
        console.log("CustomStore load start");
        console.log( loadOptions );

        console.log( this.treeList.keyExpr );
        console.log( this.treeList.parentIdExpr );

        const tmpID: string = this.hexID !== null ? this.hexID : '';
        return lastValueFrom(this.dataService.getCaptureList( tmpID ))
          .then(data => {
            console.log(data);
            this.content = data;
            return this.content;
          })
          .catch(() => {
            console.log("Data Loading Error");
            return [];
          })
      }
    });
  }

  ngOnInit(): void {
    console.log("hnsd-captures ngOnInit");
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.hexID = params.get('hexID');
      this.updateCaptureList();
    });
  }

  navigateToCapture( e: any ): void {
    console.log("showCapture");
    console.log( e );
    console.log( e.row.data.id );
    this.router.navigate( [ e.row.data.id ], { relativeTo: this.route } );
  }

  onNewButtonClick(): void
  {
    var updateFields: Record<string,any> = {};
    const tmpID: string = this.hexID !== null ? this.hexID : '';
    this.dataService.postStartCapture( tmpID, updateFields ).subscribe(resp=>{
      console.log('Capture Started');
      this.updateCaptureList();
    });
    
  }

}
