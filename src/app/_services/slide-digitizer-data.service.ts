import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';

export interface HNSDStatus {
  deviceState: string;
//  activeSequenceName: string;
//  activeZones: NamedObj[];
//  inhibitedZones: HNIrrZoneInhibitInfo[];
  date: string;
//  activeInhibitCnt: number;
//  overallHealth: HNIrrOverallHealth;
//  schedulerState: string;
  time: string;
//  timezone: string;
//  schedulerInhibitID: string;
//  schedulerInhibitName: string;
//  schedulerInhibitExpirationDateStr: string;
};

export interface Status {
  deviceState: string;
//  activeSequenceName: string;
//  activeZones: NamedObj[];
//  inhibitedZones: ZoneInhibitInfo[];
  date: string;
//  activeInhibitCnt: number;
//  overallHealth: OverallHealth;
//  schedulerState: string;
  time: string;
//  timezone: string;
//  schedulerInhibitID: string;
//  schedulerInhibitName: string;
//  schedulerInhibitExpirationDateStr: string;
};

export interface Capture {
  id: string;
//  parentID: string;
//  name: string;
//  status: string;
//  devCRC32ID: string;
};

export interface CaptureList {
  captureArray: Capture[];
};

@Injectable({
  providedIn: 'root'
})
export class SlideDigitizerDataService {

  private proxyURL = "/hnode2/mgmt/device-proxy";

  private statusURL = 'hnode2/slide-digitizer/status';
  private capturesURL = 'hnode2/slide-digitizer/captures';

  constructor( private http: HttpClient ) { }

  createReqURL( rootURL : string, hexID : string, reqURL : string ) : string {
      const resultURL = rootURL + "/" + hexID + "/" + reqURL;
      return resultURL;
  }

  getStatus( hexID : string ) : Observable<Status> {
    const reqURL = this.createReqURL( this.proxyURL, hexID, this.statusURL );
    const rObs = this.http.get<HNSDStatus>( reqURL );
        
    return rObs.pipe(
      map<HNSDStatus, Status>(sdStatus => {
        let status : Status = {
          deviceState: sdStatus.deviceState,
          date: sdStatus.date,
          time: sdStatus.time
        }
        return status;
      }))
  }

  getCaptureList( hexID : string ): Observable<any> {
    const reqURL = this.createReqURL( this.proxyURL, hexID, this.capturesURL );
    return this.http.get(reqURL, { responseType: 'json' });
  }

  postStartCapture( hexID: string, createFields: Record< string, any> ) {
    const reqURL = this.createReqURL( this.proxyURL, hexID, this.capturesURL );
    return this.http.post<string>( reqURL, JSON.stringify( createFields ), { observe: 'response' } );
  }
}
