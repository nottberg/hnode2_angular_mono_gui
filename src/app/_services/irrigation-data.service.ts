import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';

export interface NamedObj {
  id: string;
  name: string;
  description: string;
};

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

export interface HNIrrSequence {
  name: string;
  description: string;
  type: string;
  onDuration: string;
  offDuration: string;
  objIDList: string[];
  sequenceid: string;
};

export interface HNIrrInhibit {
  name: string;
  type: string;
  zoneid: string;
  duration: string;
  expirationDateStr: string;
  inhibitid : string;
};

export interface HNIrrOperation {
  type: string;
  operationid: string;
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

export interface Sequence {
  name: string;
  description: string;
  type: string;
  onDuration: string;
  offDuration: string;
  objIDList: string[];
  sequenceid: string;
};

export interface SequenceConfig {
  sequencesList: Sequence[];
  znmList: NamedObj[];
};

export interface Inhibit {
  name: string;
  type: string;
  zoneid: string;
  duration: string;
  expirationDateStr: string;
  inhibitid: string;
};

export interface InhibitConfig {
  inhibitsList: Inhibit[];
  znmList: NamedObj[];
};

export interface Operation {
  type: string;
  operationid: string;
};

export interface HNIrrScheduleAction {
  name: string;
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

export interface HNIrrAppliedModifier {
  calculationStr: string;
  deltaSeconds: number;
  modifierName: string;
  modifierid: string;
};

export interface HNIrrSecondsPerDay {
  Sunday: number;
  Monday: number;
  Tuesday: number;
  Wednesday: number;
  Thursday: number;
  Friday: number;
  Saturday: number;
};

export interface HNIrrStartEntry {
  startTime: string;
  duration: string;
};

export interface HNIrrStartsByDay {
  Sunday: HNIrrStartEntry[];
  Monday: HNIrrStartEntry[];
  Tuesday: HNIrrStartEntry[];
  Wednesday: HNIrrStartEntry[];
  Thursday: HNIrrStartEntry[];
  Friday: HNIrrStartEntry[];
  Saturday: HNIrrStartEntry[];
};

export interface HNIrrScheduleZoneStatistics {
  appliedModifiers: HNIrrAppliedModifier[];
  avgSecondsPerDay: number;
  baseSeconds: number;
  secondsPerDay: HNIrrSecondsPerDay;
  startsByDay: HNIrrStartsByDay;  
  totalSeconds: number;
  inhibitedByID: string;
  inhibitName: string;
  inhibitExpirationDateStr: string;
  zoneName: string;
  zoneid: string;
};

export interface HNIrrSchedule {
  scheduleMatrix: HNIrrScheduleWeek;
  zoneStatistics: HNIrrScheduleZoneStatistics[];
  scheduleTimezone: string;
  schedulerInhibitID: string;
  schedulerInhibitExpirationDateStr: string;
  schedulerInhibitName: string;  
};

export interface HNIrrZoneInhibitInfo {
  id: string;
  inhibitByID: string;
  inhibitExpirationDateStr: string;
  inhibitName: string;
  name: string;
};

export interface HNIrrOverallHealth {
  msg: string;
  status: string;
};

export interface HNIrrStatus {
  activeSequenceID: string;
  activeSequenceName: string;
  activeZones: NamedObj[];
  inhibitedZones: HNIrrZoneInhibitInfo[];
  date: string;
  activeInhibitCnt: number;
  overallHealth: HNIrrOverallHealth;
  schedulerState: string;
  time: string;
  timezone: string;
  schedulerInhibitID: string;
  schedulerInhibitName: string;
  schedulerInhibitExpirationDateStr: string;
};

export interface ScheduleAction {
  name: string;
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

export interface AppliedModifier {
  calculationStr: string;
  deltaSeconds: number;
  modifierName: string;
  modifierid: string;
};

export interface SecondsPerDay {
  Sunday: number;
  Monday: number;
  Tuesday: number;
  Wednesday: number;
  Thursday: number;
  Friday: number;
  Saturday: number;
};

export interface StartEntry {
  startTime: string;
  duration: string;
};

export interface StartsByDay {
  Sunday: StartEntry[];
  Monday: StartEntry[];
  Tuesday: StartEntry[];
  Wednesday: StartEntry[];
  Thursday: StartEntry[];
  Friday: StartEntry[];
  Saturday: StartEntry[];
};

export interface ScheduleZoneStatistics {
  appliedModifiers: AppliedModifier[];
  avgSecondsPerDay: number;
  baseSeconds: number;
  secondsPerDay: SecondsPerDay;
  startsByDay: StartsByDay;
  totalSeconds: number;
  inhibitedByID: string;
  inhibitName: string;
  inhibitExpirationDateStr: string;
  zoneName: string;
  zoneid: string;
};

export interface Schedule {
  scheduleMatrix: ScheduleWeek;
  zoneStatistics: ScheduleZoneStatistics[];
  scheduleTimezone: string;
  schedulerInhibitID: string;
  schedulerInhibitExpirationDateStr: string;
  schedulerInhibitName: string;
};

export interface ZoneInhibitInfo {
  id: string;
  inhibitByID: string;
  inhibitExpirationDateStr: string;
  inhibitName: string;
  name: string;
};

export interface OverallHealth {
  msg: string;
  status: string;
};

export interface Status {
  activeSequenceID: string;
  activeSequenceName: string;
  activeZones: NamedObj[];
  inhibitedZones: ZoneInhibitInfo[];
  date: string;
  activeInhibitCnt: number;
  overallHealth: OverallHealth;
  schedulerState: string;
  time: string;
  timezone: string;
  schedulerInhibitID: string;
  schedulerInhibitName: string;
  schedulerInhibitExpirationDateStr: string;
};

export interface HNIrrSchedulerState {
  state: string;
  inhibitDuration: string;
};

export interface SchedulerState {
  state: string;
  inhibitDuration: string;
};

export interface ControlsConfig {
  status: Status;
  zoneList: Zone[];
  sequenceList: Sequence[];
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

  private proxyURL = "/hnode2/mgmt/device-proxy";

  private switchURL = 'hnode2/irrigation/switches';
  private zonesURL = 'hnode2/irrigation/zones';
  private placementsURL = 'hnode2/irrigation/placement';
  private modifiersURL = 'hnode2/irrigation/modifier';
  private sequencesURL = 'hnode2/irrigation/sequence';
  private inhibitsURL = 'hnode2/irrigation/inhibit';    
  private schURL = 'hnode2/irrigation/schedule';
  private statusURL = 'hnode2/irrigation/status';
  private schedulerStateURL = 'hnode2/irrigation/schedule/state';
  private operationsURL = 'hnode2/irrigation/operation';

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
          activeSequenceID: irrStatus.activeSequenceID,
          activeSequenceName: irrStatus.activeSequenceName,
          activeZones: irrStatus.activeZones,
          inhibitedZones: irrStatus.inhibitedZones,
          activeInhibitCnt: 0,
          date: irrStatus.date,
          overallHealth: irrStatus.overallHealth,
          schedulerState: irrStatus.schedulerState,
          time: irrStatus.time,
          timezone: irrStatus.timezone,
          schedulerInhibitID: irrStatus.schedulerInhibitID,
          schedulerInhibitName: irrStatus.schedulerInhibitName,
          schedulerInhibitExpirationDateStr: irrStatus.schedulerInhibitExpirationDateStr
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

  getSequencesList( crc32ID : string ) {
    const reqURL = this.createReqURL( this.proxyURL, crc32ID, this.sequencesURL );
    const rObs = this.http.get<HNIrrSequence[]>( reqURL );
        
    return rObs.pipe(
      map<HNIrrSequence[], Sequence[]>(irrSequence => {
        let sequencesList : Sequence[] = [];
        irrSequence.forEach( irrSeq => {
          let sequence : Sequence = {
            name: irrSeq.name,
            description: irrSeq.description,
            type: irrSeq.type,
            onDuration: irrSeq.onDuration,
            offDuration: irrSeq.offDuration,
            objIDList: irrSeq.objIDList,
            sequenceid: irrSeq.sequenceid
          }
          sequencesList.push( sequence );
        });
        return sequencesList;
      }))

  }

  getSequencesConfig( crc32ID: string ) : Observable<SequenceConfig> {
    const sequencesObs$ = this.getSequencesList( crc32ID );
    const znmObs$ = this.getZoneNameList( crc32ID );

    const combo$ = combineLatest([sequencesObs$, znmObs$]);

    const cbObs$ = combo$.pipe(
      map(([sequencesList, znmList]) => {
        console.log(sequencesList);
        console.log(znmList);

        const nullSequence : Sequence[] = [];
        const nullZNMList : NamedObj[] = [];
        const sequenceCD : SequenceConfig = {sequencesList: nullSequence, znmList: nullZNMList};

        sequenceCD.sequencesList = sequencesList;
        sequenceCD.znmList = znmList;
        console.log(sequenceCD);

        return sequenceCD;
      })
    );

    return cbObs$;
  }

  putUpdateSequence( crc32ID: string, pid: string, updFields: Record< string, any > ) {
    const reqURL = this.createReqURLWithID( this.proxyURL, crc32ID, this.sequencesURL, pid );
    return this.http.put<string>( reqURL, JSON.stringify( updFields ), { observe: 'response' } );
  }

  postCreateSequence( crc32ID: string, createFields: Record< string, any> ) {
    const reqURL = this.createReqURL( this.proxyURL, crc32ID, this.sequencesURL );
    return this.http.post<string>( reqURL, JSON.stringify( createFields ), { observe: 'response' } );
  }

  deleteSequence( crc32ID: string, pid: string ) {
    const reqURL = this.createReqURLWithID( this.proxyURL, crc32ID, this.sequencesURL, pid );
    return this.http.delete( reqURL, { observe: 'response' } );
  }

  getInhibitsList( crc32ID : string ) {
    const reqURL = this.createReqURL( this.proxyURL, crc32ID, this.inhibitsURL );
    const rObs = this.http.get<HNIrrInhibit[]>( reqURL );
        
    return rObs.pipe(
      map<HNIrrInhibit[], Inhibit[]>(irrInhibit => {
        let inhibitsList : Inhibit[] = [];
        irrInhibit.forEach( irrInh => {
          let inhibit : Inhibit = {
            name: irrInh.name,
            type: irrInh.type,
            zoneid: irrInh.zoneid,
            expirationDateStr: irrInh.expirationDateStr,
            duration: "",
            inhibitid: irrInh.inhibitid
          }
          inhibitsList.push( inhibit );
        });
        return inhibitsList;
      }))

  }

  getInhibitsConfig( crc32ID: string ) : Observable<InhibitConfig> {
    const inhibitsObs$ = this.getInhibitsList( crc32ID );
    const znmObs$ = this.getZoneNameList( crc32ID );

    const combo$ = combineLatest([inhibitsObs$, znmObs$]);

    const cbObs$ = combo$.pipe(
      map(([inhibitsList, znmList]) => {
        console.log(inhibitsList);
        console.log(znmList);

        const nullInhibit : Inhibit[] = [];
        const nullZNMList : NamedObj[] = [];
        const inhibitCD : InhibitConfig = {inhibitsList: nullInhibit, znmList: nullZNMList};

        inhibitCD.inhibitsList = inhibitsList;
        inhibitCD.znmList = znmList;
        console.log(inhibitCD);

        return inhibitCD;
      })
    );

    return cbObs$;
  }

  postCreateInhibit( crc32ID: string, createFields: Record< string, any> ) {
    const reqURL = this.createReqURL( this.proxyURL, crc32ID, this.inhibitsURL );
    return this.http.post<string>( reqURL, JSON.stringify( createFields ), { observe: 'response' } );
  }

  deleteInhibit( crc32ID: string, pid: string ) {
    const reqURL = this.createReqURLWithID( this.proxyURL, crc32ID, this.inhibitsURL, pid );
    return this.http.delete( reqURL, { observe: 'response' } );
  }

  getSchedulerEnabledState( crc32ID : string ) : Observable<SchedulerState> {
    const reqURL = this.createReqURL( this.proxyURL, crc32ID, this.schedulerStateURL );

    return this.http.get<SchedulerState>( reqURL )
      .pipe(
        map<HNIrrSchedulerState, SchedulerState>(irrState => {
          let rtnState : SchedulerState = {
            state: irrState.state,
            inhibitDuration: irrState.inhibitDuration
          }
          return rtnState;
        }))
  } 

  getOperationsList( crc32ID : string ) {
    const reqURL = this.createReqURL( this.proxyURL, crc32ID, this.operationsURL );
    const rObs = this.http.get<HNIrrOperation[]>( reqURL );
        
    return rObs.pipe(
      map<HNIrrOperation[], Operation[]>(irrOperation => {
        let operationsList : Operation[] = [];
        irrOperation.forEach( irrOp => {
          let operation : Operation = {
            type: irrOp.type,
            operationid: irrOp.operationid
          }
          operationsList.push( operation );
        });
        return operationsList;
      }))

  }

  postCreateOperation( crc32ID: string, createFields: Record< string, any> ) {
    const reqURL = this.createReqURL( this.proxyURL, crc32ID, this.operationsURL );
    console.log( reqURL );
    return this.http.post<string>( reqURL, JSON.stringify( createFields ), { observe: 'response' } );
  }

  postScheduleEnableOperation( crc32ID : string, enabled : boolean ) {

    const opFields : Record< string, any> = {
      "type":"scheduler_state",
      "schedulerState": ((enabled == true) ? "enabled" : "disabled")
    };

    console.log("postSchEnable");
    console.log( opFields );

    return this.postCreateOperation( crc32ID, opFields );
  }

  postExecSequenceOperation( crc32ID : string, sequenceID : string ) {

    const opFields : Record< string, any> = {
      "type":"exec_sequence",
      "objIDList":[sequenceID] 
    };

    return this.postCreateOperation( crc32ID, opFields );
  }

  postExecOneTimeSequenceOperation( crc32ID: string, onDuration: string, offDuration: string, objIDList: string[] ) {

    const opFields : Record< string, any> = {
      "type":"exec_onetimeseq",
      "onDuration":onDuration,
      "offDuration":offDuration,
      "objIDList":objIDList 
    };

    return this.postCreateOperation( crc32ID, opFields );
  }

  cancelOperation( crc32ID: string, oid: string ) {
    const reqURL = this.createReqURLWithID( this.proxyURL, crc32ID, this.operationsURL, oid );
    return this.http.delete( reqURL, { observe: 'response' } );
  }

  getControlsConfig( crc32ID : string ) : Observable<ControlsConfig> {
    const statusObs$ = this.getStatus( crc32ID );
    const zoneObs$ = this.getZonesList( crc32ID );
    const seqObs$ = this.getSequencesList( crc32ID );

    const combo$ = combineLatest([statusObs$, zoneObs$, seqObs$]);

    const cbObs$ = combo$.pipe(
      map(([status, zones, sequences]) => {
        console.log(status);
        console.log(zones);
        console.log(sequences);

        const controlsCD : ControlsConfig = {status: {} as Status, zoneList: [], sequenceList: []};

        controlsCD.status = status;
        controlsCD.zoneList = zones;
        controlsCD.sequenceList = sequences;
        console.log(controlsCD);

        return controlsCD;
      })
    );

    return cbObs$;
  }
}
