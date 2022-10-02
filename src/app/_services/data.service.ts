import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { stringToKeyValue } from '@angular/flex-layout/extended/style/style-transforms';

const API_URL = '/hnode2/mgmt/';

export interface DeviceConfig {
  crc32ID: string;
  name: string;
};

export interface DeviceAddress {
  type: string;
  address: string;
  port: string;
};

export interface Device {
  crc32ID: string;
  name: string;
  hnodeID: string;
  discID: string;
  deviceType: string;
  deviceVersion: string;
  addresses: DeviceAddress[];
};

export interface DeviceInventory {
  ownedDevices: Device[];
  unclaimedDevices: Device[];
  unavailableDevices: Device[];
};

export interface ServiceInventory {
  providerSet: any;
};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  getDeviceInventory(): Observable<any> {
    return this.http.get(API_URL + 'device-inventory', { responseType: 'json' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'device-inventory', { responseType: 'json' });
  }

  postDeviceCommandRequest( crc32ID: string, cmdFields: Record< string, any > ): Observable<any> {
    const reqURL = API_URL + 'device-inventory/' + crc32ID + '/command';
    return this.http.post<string>( reqURL, JSON.stringify( cmdFields ), { observe: 'response', headers: {'Content-Type':'application/json'} });
  }

  postClaimDeviceRequest( crc32ID: string ): Observable<any> {
    let cmdData : Record< string, any > = { "command": "claim" };
    return this.postDeviceCommandRequest( crc32ID, cmdData );
  }

  postReleaseDeviceRequest( crc32ID: string ): Observable<any> {
    let cmdData : Record< string, any > = { "command": "release" };
    return this.postDeviceCommandRequest( crc32ID, cmdData );
  }

  postDeviceConfigUpdate( crc32ID: string, updFields: Record< string, any > ): Observable<any> {
    let cmdData : Record< string, any > = { "command": "update_device_fields" };

    console.log( crc32ID );
    console.log( updFields );
    console.log( Object.keys(updFields) );
    for( let index in Object.keys(updFields) )
    {
      let key: string = Object.keys(updFields)[index];
      console.log( key );
      console.log( updFields[ key ] );
      cmdData[ key ] = updFields[ key ];
    }

    console.log( "postDeviceConfigUpdate - ", cmdData);

    return this.postDeviceCommandRequest( crc32ID, cmdData );
  }

  getServicesContent(): Observable<any> {
    return this.http.get(API_URL + 'device-services', { responseType: 'json' });
  }

}
