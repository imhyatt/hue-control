import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Light } from './lights.model';

@Injectable({
  providedIn: 'root'
})
export class LightsService {

  constructor(private http: HttpClient) { }

  hueBridgeAddress: string = "http://10.0.0.169";
  hueUsername: string = "8WpBcyqplNPhnZVYFk6kO4A9A2l8UedKxO-B1iBe";

  getLights(): Observable<object> {

    var endpoint = this.hueBridgeAddress + '/api/' + this.hueUsername + '/lights';
    var httpOptions = {
      headers: new HttpHeaders({ 'Accept': 'application/json'})
    };

    return this.http.get<object>(endpoint, httpOptions);
  }
}
