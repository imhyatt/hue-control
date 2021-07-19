import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Light } from './lights.model';

@Injectable({
  providedIn: 'root'
})
export class LightsService {

  constructor(private http: HttpClient) { }


  hueBridgeAddress: string = "http://192.168.86.43/api/";
  hueUsername: string = "8WpBcyqplNPhnZVYFk6kO4A9A2l8UedKxO-B1iBe";

  getLights(): Observable<object> {
    var endpoint = this.hueBridgeAddress + this.hueUsername + '/lights';
    var httpOptions = {
      headers: new HttpHeaders({ 'Accept': 'application/json'})
    };
    return this.http.get<object>(endpoint, httpOptions);
  }

  setLightPower(id: number, power: boolean): Observable<object> {
    var endpoint = this.hueBridgeAddress + this.hueUsername + '/lights/' + id + '/state';
    var options = { 'on': power };
    var httpOptions = {
      headers: new HttpHeaders({ 'Accept': 'application/json'})
    };
    return this.http.put<object>(endpoint, options, httpOptions);
  }

  setLightIntensity(id: number, intensity: number): Observable<object> {
    var endpoint = this.hueBridgeAddress + this.hueUsername + '/lights/' + id + '/state';
    var options = { 'bri': intensity };
    var httpOptions = {
      headers: new HttpHeaders({ 'Accept': 'application/json'})
    };
    return this.http.put<object>(endpoint, options, httpOptions);
  }

  setLightHue(id: number, hue: number): Observable<object> {
    var endpoint = this.hueBridgeAddress + this.hueUsername + '/lights/' + id + '/state';
    var options = { 'hue': hue };
    var httpOptions = {
      headers: new HttpHeaders({ 'Accept': 'application/json'})
    };
    return this.http.put<object>(endpoint, options, httpOptions);
  }

  setLightSat(id: number, sat: number): Observable<object> {
    var endpoint = this.hueBridgeAddress + this.hueUsername + '/lights/' + id + '/state';
    var options = { 'sat': sat };
    var httpOptions = {
      headers: new HttpHeaders({ 'Accept': 'application/json'})
    };
    return this.http.put<object>(endpoint, options, httpOptions);
  }

}
