import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrnParcelIn } from '../model/trnParcelIn';
import { MstLocation } from '../model/mstLocation';
import { MstCourier } from '../model/mstCourier';
import { MstDepartment } from '../model/mstDepartment';
import { MstUser } from '../model/mstUser';

@Injectable({
  providedIn: 'root'
})
export class TrnParcelInService {

  private baseUrl = 'http://localhost:8080/parcels-in'; // Adjust the base URL as per your backend

  constructor(private http: HttpClient) { }

  getAllParcelsIn(): Observable<TrnParcelIn[]> {
    return this.http.get<TrnParcelIn[]>(`${this.baseUrl}`);
  }

  getParcelInById(locCode: string, inwardNo: number): Observable<TrnParcelIn> {
    return this.http.get<TrnParcelIn>(`${this.baseUrl}/${locCode}/${inwardNo}`);
  }

  createParcelIn(parcelIn: TrnParcelIn): Observable<TrnParcelIn> {
    return this.http.post<TrnParcelIn>(`${this.baseUrl}`, parcelIn);
  }

  getAllLocations(): Observable<MstLocation[]> {
    return this.http.get<MstLocation[]>(`${this.baseUrl}/api/locations`);
  }

  getAllCouriers(): Observable<MstCourier[]> {
    return this.http.get<MstCourier[]>(`${this.baseUrl}/api/couriers`);
  }

  getSenderDepartments(senderLocCode: string): Observable<MstDepartment[]> {
    return this.http.get<MstDepartment[]>(`${this.baseUrl}/api/sender-departments/${senderLocCode}`);
  }

  getRecipientDepartments(recipientLocCode: string): Observable<MstDepartment[]> {
    return this.http.get<MstDepartment[]>(`${this.baseUrl}/api/recipient-departments/${recipientLocCode}`);
  }

  getSenderUsers(senderLocCode: string, deptNo: string): Observable<MstUser[]> {
    return this.http.get<MstUser[]>(`${this.baseUrl}/api/sender-users/${senderLocCode}/${deptNo}`);
  }

  getRecipientUsers(recipientLocCode: string, deptNo: string): Observable<MstUser[]> {
    return this.http.get<MstUser[]>(`${this.baseUrl}/api/recipient-users/${recipientLocCode}/${deptNo}`);
  }
}
