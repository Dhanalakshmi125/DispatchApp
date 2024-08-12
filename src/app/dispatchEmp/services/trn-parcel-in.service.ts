import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MstLocation } from '../model/mstLocation';
import { MstDepartment } from '../model/mstDepartment';
import { MstUser } from '../model/mstUser';
import { MstCourier } from '../model/mstCourier';
import { MstEmployee} from '../model/mstEmployee';
import { TrnParcelIn } from '../model/trnParcelIn';

@Injectable({
  providedIn: 'root'
})
export class TrnParcelInService {

  private baseUrl = 'http://localhost:8182/api/v1/dispatch';
  private creatParcelUrl='http://localhost:8182/parcels-in';

  constructor(private http: HttpClient) {}

  getLocations(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/locNames`);
  }

  getDepartmentsByLocationName(locName: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/departments/by-name/${locName}`);
  }

  getAllEmployees(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/names/by/all-loc`);
  }

  getRecipientDepartments(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/departments-by-loccode`, {withCredentials: true });
  }

  getAllCouriers(): Observable<MstCourier[]> {
    return this.http.get<MstCourier[]>(`${this.baseUrl}/courier-names`);
  }
  createParcel(parcelIn: TrnParcelIn): Observable<any> {
    return this.http.post<any>(`${this.creatParcelUrl}`, parcelIn, { withCredentials: true });
  }
}
