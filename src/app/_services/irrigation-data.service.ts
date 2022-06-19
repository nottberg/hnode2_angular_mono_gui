import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';

export interface HNIrrSwitch {
  swid: string;
  description: string;
};

export interface HNIrrZone {
  name: string;
  description: string;
  secondsMaxCycle: number;
  secondsMinCycle: number;
  secondsPerWeek: number;
  swidList: string[];
  zoneid: string;
};

export interface HNIrrPlacement {
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  rank: number;
  dayList: string[];
  zoneList: string[];
  placementid: string;
};

export interface HNIrrModifier {
  name: string;
  description: string;
  type: string;
  value: string;
  zoneid: string;
  modifierid: string;
};

export interface NamedObj {
  id: string;
  name: string;
  description: string;
};

export interface Zone {
  name: string;
  description: string;
  secondsMaxCycle: number;
  secondsMinCycle: number;
  secondsPerWeek: number;
  swidList: string[];
  zoneid: string;
};

export interface ZoneConfig {
  zoneList: Zone[];
  switchList: NamedObj[];
};

export interface Placement {
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  rank: number;
  dayList: string[];
  zoneList: string[];
  placementid: string;
};

export interface PlacementConfig {
  placementsList: Placement[];
  znmList: NamedObj[];
};

export interface Modifier {
  name: string;
  description: string;
  type: string;
  value: string;
  zoneid: string;
  modifierid: string;
};

export interface ModifiersConfig {
  modifiersList: Modifier[];
  znmList: NamedObj[];
};

export interface HNIrrScheduleAction {
  name: string;
  action: string;
  startTime: string;
  endTime: string;
  zoneid: string;
};

export interface HNIrrScheduleWeek  {
  Sunday: HNIrrScheduleAction[];
  Monday: HNIrrScheduleAction[];
  Tuesday: HNIrrScheduleAction[];
  Wednesday: HNIrrScheduleAction[];
  Thursday: HNIrrScheduleAction[];
  Friday: HNIrrScheduleAction[];
  Saturday: HNIrrScheduleAction[];
};

export interface HNIrrSchedule {
  scheduleMatrix: HNIrrScheduleWeek;
  scheduleTimezone: string;
};

export interface HNIrrOverallHealth {
  msg: string;
  status: string;
};

export interface HNIrrStatus {
  activeZones: string[];
  date: string;
  disabledZones: string[];
  inhibitUntil: string;
  inhibitZones: string[];
  overallHealth: HNIrrOverallHealth;
  schedulerState: string;
  time: string;
  timezone: string;
};

export interface ScheduleAction {
  name: string;
  action: string;
  startTime: string;
  endTime: string;
  zoneid: string;
};

export interface ScheduleWeek  {
  Sunday: ScheduleAction[];
  Monday: ScheduleAction[];
  Tuesday: ScheduleAction[];
  Wednesday: ScheduleAction[];
  Thursday: ScheduleAction[];
  Friday: ScheduleAction[];
  Saturday: ScheduleAction[];
};

export interface Schedule {
  scheduleMatrix: ScheduleWeek;
  scheduleTimezone: string;
};

export interface OverallHealth {
  msg: string;
  status: string;
};

export interface Status {
  activeZones: string[];
  date: string;
  disabledZones: string[];
  inhibitUntil: string;
  inhibitZones: string[];
  overallHealth: OverallHealth;
  schedulerState: string;
  time: string;
  timezone: string;
};

export interface NMObjSelectionTracker {
  id: string;
  name: string;
  selected: boolean;
};

@Injectable({
  providedIn: 'root'
})
export class IrrigationDataService {

  private proxyURL = "http://storage2.home/hnode2/mgmt/device-proxy";

  private switchURL = 'hnode2/irrigation/switches';
  private zonesURL = 'hnode2/irrigation/zones';
  private placementsURL = 'hnode2/irrigation/placement';
  private modifiersURL = 'hnode2/irrigation/modifier';
  private schURL = 'hnode2/irrigation/schedule';
  private statusURL = 'hnode2/irrigation/status';

  constructor( private http: HttpClient ) { }

  handleZonesError()
  {
    throw new Error('Method not implemented.');
  }

  createReqURL( rootURL : string, crc32ID : string, reqURL : string ) : string {
      const resultURL = rootURL + "/" + crc32ID + "/" + reqURL;
      return resultURL;
  }

  createReqURLWithID( rootURL : string, crc32ID : string, reqURL : string, objID : string ) : string {
    const resultURL = rootURL + "/" + crc32ID + "/" + reqURL + "/" + objID;
    return resultURL;
}

  getStatus( crc32ID : string ) : Observable<Status> {
    const reqURL = this.createReqURL( this.proxyURL, crc32ID, this.statusURL );
    const rObs = this.http.get<HNIrrStatus>( reqURL );
        
    return rObs.pipe(
      map<HNIrrStatus, Status>(irrStatus => {
        let status : Status = {
          activeZones: irrStatus.activeZones,
          date: irrStatus.date,
          disabledZones: irrStatus.disabledZones,
          inhibitUntil: irrStatus.inhibitUntil,
          inhibitZones: irrStatus.inhibitZones,
          overallHealth: irrStatus.overallHealth,
          schedulerState: irrStatus.schedulerState,
          time: irrStatus.time,
          timezone: irrStatus.timezone
        }
        return status;
      }))
  }

  getSchedule( crc32ID : string ): Observable<Schedule> {
    const reqURL = this.createReqURL( this.proxyURL, crc32ID, this.schURL );
    const rObs = this.http.get<HNIrrSchedule>( reqURL );
        
    return rObs.pipe(
      map<HNIrrSchedule, Schedule>(irrSchedule => {
        let schedule : Schedule = irrSchedule;
        return schedule;
      }))
  }

  getZonesList( crc32ID : string ) : Observable<Zone[]> {
    const reqURL = this.createReqURL( this.proxyURL, crc32ID, this.zonesURL );
    const rObs = this.http.get<HNIrrZone[]>( reqURL );
        
    return rObs.pipe(
      map<HNIrrZone[], Zone[]>(irrZones => {
        let zones : Zone[] = [];
        irrZones.forEach( irrZone => {
          let zone : Zone = {
            name: irrZone.name,
            description: irrZone.description,
            secondsMaxCycle: irrZone.secondsMaxCycle,
            secondsMinCycle: irrZone.secondsMinCycle,
            secondsPerWeek: irrZone.secondsPerWeek,
            swidList: irrZone.swidList,
            zoneid: irrZone.zoneid
          }
        zones.push( zone );
      });
      return zones;
    }))
  }

  getZoneNameList( crc32ID : string ) : Observable<NamedObj[]>{
    const reqURL = this.createReqURL( this.proxyURL, crc32ID, this.zonesURL );

    return this.http.get<HNIrrZone[]>( reqURL )
      .pipe( 
        map<HNIrrZone[], NamedObj[]>(irrZones => {
          let nmObjs : NamedObj[] = [];
          irrZones.forEach( irrZone => {
            let nmObj : NamedObj = {
              name: irrZone.name,
              description: irrZone.description,
              id: irrZone.zoneid
            }
            nmObjs.push( nmObj );
          });
          return nmObjs;
        }))
  }

  getSwitchList( crc32ID : string ) : Observable<NamedObj[]> {
    const reqURL = this.createReqURL( this.proxyURL, crc32ID, this.switchURL );

    return this.http.get<HNIrrSwitch[]>( reqURL )
      .pipe(
        map<HNIrrSwitch[], NamedObj[]>(irrSwitches => {
          let nmObjs : NamedObj[] = [];
          irrSwitches.forEach( irrSwitch => {
            let nmObj : NamedObj = {
              name: irrSwitch.description,
              description: "",
              id: irrSwitch.swid
            }
            nmObjs.push( nmObj );
          });
          return nmObjs;
        }))
  } 

  getZoneConfig( crc32ID : string ) : Observable<ZoneConfig> {
    const zoneObs$ = this.getZonesList( crc32ID );
    const swObs$ = this.getSwitchList( crc32ID );

    const combo$ = combineLatest([zoneObs$, swObs$]);

    const cbObs$ = combo$.pipe(
      map(([zones, switches]) => {
        console.log(zones);
        console.log(switches);

        const nullZones : Zone[] = [];
        const nullSwitches : NamedObj[] = [];
        const zoneCD : ZoneConfig = {zoneList: nullZones, switchList: nullSwitches};

        zoneCD.zoneList = zones;
        zoneCD.switchList = switches;
        console.log(zoneCD);

        return zoneCD;
      })
    );

    return cbObs$;
  }

  putUpdateZone( crc32ID : string, zid: string, updFields: Record< string, any > ) {
    const reqURL = this.createReqURLWithID( this.proxyURL, crc32ID, this.zonesURL, zid );
    return this.http.put<string>( reqURL, JSON.stringify( updFields ), { observe: 'response' } );
  }

  postCreateZone( crc32ID : string, createFields: Record< string, any> ) {
    const reqURL = this.createReqURL( this.proxyURL, crc32ID, this.zonesURL );
    return this.http.post<string>( reqURL, JSON.stringify( createFields ), { observe: 'response' } );
  }

  deleteZone( crc32ID : string, zid: string ) {
    const reqURL = this.createReqURLWithID( this.proxyURL, crc32ID, this.zonesURL, zid );
    return this.http.delete( reqURL, { observe: 'response' } );
  }

  getPlacementsList( crc32ID : string ) {
    const reqURL = this.createReqURL( this.proxyURL, crc32ID, this.placementsURL );
    const rObs = this.http.get<HNIrrPlacement[]>( reqURL );
        
    return rObs.pipe(
      map<HNIrrPlacement[], Placement[]>(irrPlacement => {
        let placementsList : Placement[] = [];
        irrPlacement.forEach( irrPlat => {
          let placement : Placement = {
            name: irrPlat.name,
            description: irrPlat.description,
            startTime: irrPlat.startTime,
            endTime: irrPlat.endTime,
            rank: irrPlat.rank,
            dayList: irrPlat.dayList,
            zoneList: irrPlat.zoneList,
            placementid: irrPlat.placementid
          }
          placementsList.push( placement );
        });
        return placementsList;
      }))

  }

  getPlacementsConfig( crc32ID: string ) : Observable<PlacementConfig> {
    const placementsObs$ = this.getPlacementsList( crc32ID );
    const znmObs$ = this.getZoneNameList( crc32ID );

    const combo$ = combineLatest([placementsObs$, znmObs$]);

    const cbObs$ = combo$.pipe(
      map(([placementsList, znmList]) => {
        console.log(placementsList);
        console.log(znmList);

        const nullPlacement : Placement[] = [];
        const nullZNMList : NamedObj[] = [];
        const placementCD : PlacementConfig = {placementsList: nullPlacement, znmList: nullZNMList};

        placementCD.placementsList = placementsList;
        placementCD.znmList = znmList;
        console.log(placementCD);

        return placementCD;
      })
    );

    return cbObs$;
  }

  putUpdatePlacement( crc32ID: string, pid: string, updFields: Record< string, any > ) {
    const reqURL = this.createReqURLWithID( this.proxyURL, crc32ID, this.placementsURL, pid );
    return this.http.put<string>( reqURL, JSON.stringify( updFields ), { observe: 'response' } );
  }

  postCreatePlacement( crc32ID: string, createFields: Record< string, any> ) {
    const reqURL = this.createReqURL( this.proxyURL, crc32ID, this.placementsURL );
    return this.http.post<string>( reqURL, JSON.stringify( createFields ), { observe: 'response' } );
  }

  deletePlacement( crc32ID: string, pid: string ) {
    const reqURL = this.createReqURLWithID( this.proxyURL, crc32ID, this.placementsURL, pid );
    return this.http.delete( reqURL, { observe: 'response' } );
  }

  getModifiersList( crc32ID : string ) {
    const reqURL = this.createReqURL( this.proxyURL, crc32ID, this.modifiersURL );
    const rObs = this.http.get<HNIrrModifier[]>( reqURL );
        
    return rObs.pipe(
      map<HNIrrModifier[], Modifier[]>(irrModifier => {
        let modifiersList : Modifier[] = [];
        irrModifier.forEach( irrMod => {
          let modifier : Modifier = {
            name: irrMod.name,
            description: irrMod.description,
            type: irrMod.type,
            value: irrMod.value,
            zoneid: irrMod.zoneid,
            modifierid: irrMod.modifierid
          }
          modifiersList.push( modifier );
        });
        return modifiersList;
      }))

  }

  getModifiersConfig( crc32ID: string ) : Observable<ModifiersConfig> {
    const modifiersObs$ = this.getModifiersList( crc32ID );
    const znmObs$ = this.getZoneNameList( crc32ID );

    const combo$ = combineLatest([modifiersObs$, znmObs$]);

    const cbObs$ = combo$.pipe(
      map(([modifiersList, znmList]) => {
        console.log(modifiersList);
        console.log(znmList);

        const nullModifiers : Modifier[] = [];
        const nullZNMList : NamedObj[] = [];
        const modifiersCD : ModifiersConfig = {modifiersList: nullModifiers, znmList: nullZNMList};

        modifiersCD.modifiersList = modifiersList;
        modifiersCD.znmList = znmList;
        console.log(modifiersCD);

        return modifiersCD;
      })
    );

    return cbObs$;
  }

  putUpdateModifier( crc32ID: string, mid: string, updFields: Record< string, any > ) {
    const reqURL = this.createReqURLWithID( this.proxyURL, crc32ID, this.modifiersURL, mid );
    return this.http.put<string>( reqURL, JSON.stringify( updFields ), { observe: 'response' } );
  }

  postCreateModifier( crc32ID: string, createFields: Record< string, any> ) {
    const reqURL = this.createReqURL( this.proxyURL, crc32ID, this.modifiersURL );
    return this.http.post<string>( reqURL, JSON.stringify( createFields ), { observe: 'response' } );
  }

  deleteModifier( crc32ID: string, mid: string ) {
    const reqURL = this.createReqURLWithID( this.proxyURL, crc32ID, this.modifiersURL, mid );
    return this.http.delete( reqURL, { observe: 'response' } );
  }
}