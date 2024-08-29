import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MstLocation } from '../../model/mstLocation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MstLocationService {

  private apiUrl = 'http://localhost:8080/parcels-in/api/locations';

  constructor(private http: HttpClient) { }

  getAllLocations(): Observable<MstLocation[]> {
    return this.http.get<MstLocation[]>(this.apiUrl);
  }
  
}
