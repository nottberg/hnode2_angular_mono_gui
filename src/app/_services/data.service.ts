import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const API_URL = 'http://storage2.home/hnode2/mgmt/';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'device-inventory', { responseType: 'json' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'device-inventory', { responseType: 'json' });
  }

  //getModeratorBoard(): Observable<any> {
  //  return this.http.get(API_URL + 'mod', { responseType: 'text' });
  //}

  //getAdminBoard(): Observable<any> {
  //  return this.http.get(API_URL + 'admin', { responseType: 'text' });
  //}
}
