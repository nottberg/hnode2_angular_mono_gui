import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DxTreeListComponent } from 'devextreme-angular';
import { CaptureList, SlideDigitizerDataService } from '../_services/slide-digitizer-data.service';
import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-hnsd-captures',
  templateUrl: './hnsd-captures.component.html',
  styleUrls: ['./hnsd-captures.component.scss']
})
export class HnsdCapturesComponent implements OnInit {

  hexID : string | null;

  content: CaptureList = { captureArray: [] };
  captureListSource: CustomStore;

  @ViewChild('treeListVar', { static: false }) treeList!: DxTreeListComponent;  
  
  //testData: Employee[] = [];

  constructor(private route: ActivatedRoute, private dataService: SlideDigitizerDataService) { 
    this.hexID = null;
    this.captureListSource = new CustomStore();
    /*
    {
      key:'id',
      load: (loadOptions) => {
        console.log("CustomStore load start");
        console.log( loadOptions );

        console.log( this.treeList.keyExpr );
        //console.log( this.treeList.parentIdExpr );

        const tmpID: string = this.hexID !== null ? this.hexID : '';
        return lastValueFrom(this.dataService.getCaptureList( tmpID ))
          .then(data => {
            console.log("Capture data");
            console.log(data);
            this.content = data;
            console.log(this.content);
            return this.content;
            //let arr = [{"id":"t1"}];
            //console.log(arr);
            //return arr;
          })
          .catch(() => {
            console.log("Data Loading Error");
            return [];
          })
      }
    });
    */
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

  ngOnInit(): void {
    //this.updateHealthInfo();
    console.log("hnsd-captures ngOnInit");
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.hexID = params.get('hexID');
      this.updateCaptureList();
    });
  }

  showDescription( e: any ): void {
    console.log("showDescription");
    console.log( e );
  }

  onNewButtonClick(): void
  {
    //const dialogCfg = new MatDialogConfig();

    //dialogCfg.autoFocus = true;

    //dialogCfg.data = {
    //  description: 'Create Sequence',
    //  curSeq: null,
    //  availZones: this.znmList
    //};

    //const dialogRef = this.dialog.open( HnidSequenceEditDialogComponent, dialogCfg );

    //dialogRef.afterClosed().subscribe(
    //  data => {
    //    if( data )
    //    {
    //      var updateFields: Record<string,any> = {};
    //      console.log("Dialog output:", data);
          
    //      if( data.updFlags & SQUPD_NAME )
    //        updateFields['name'] = data.form.nameFC;
    //      if( data.updFlags & SQUPD_DESC )
    //        updateFields['description'] = data.form.descriptionFC;
    //      if( data.updFlags & SQUPD_TYPE )
    //        updateFields['type'] = data.type;
    //      if( data.updFlags & SQUPD_ONDURATION )
    //        updateFields['onDuration'] = data.form.onDurationFC;
    //      if( data.updFlags & SQUPD_OFFDURATION )
    //        updateFields['offDuration'] = data.form.offDurationFC;
    //      if( data.updFlags & SQUPD_OBJIDLIST )
    //        updateFields['objIDList'] = data.objIDList;

    //      console.log( updateFields );

    //      const tmpID: string = this.hexID !== null ? this.hexID : '';
    //      this.irrData.postCreateSequence( tmpID, updateFields ).subscribe(resp=>{
    //        console.log('Sequence Created');
    //        this.refreshSequencesConfig();
    //      });
    //    }
    //    else
    //      console.log("dialog Canceled");
    //    }
    //);

    var updateFields: Record<string,any> = {};
    const tmpID: string = this.hexID !== null ? this.hexID : '';
    this.dataService.postStartCapture( tmpID, updateFields ).subscribe(resp=>{
      console.log('Capture Started');
      this.updateCaptureList();
    });
    
  }

}
