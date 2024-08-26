import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IoclEmpServiceService {
  private baseUrl='http://localhost:8182/api/v1/employee';
  empData:any='';

  constructor(private http:HttpClient) { }

     // Service method for login
  authenticateUser(id: string, password: string, captcha_value: string): Observable<any> {
    const loginRequest = { id, password,captcha_value };
    return this.http.post(`${this.baseUrl}/signin`, loginRequest);
  }

   // Service method to get captcha
   getCaptcha(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-captcha`);
  }

  checkCaptcha(captchaValue: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/check-captcha/${captchaValue}`);
  }
  setEmpData(data:any){
    this.empData=data;
  }
  getEmpData(){
    return this.empData;
  }

}
