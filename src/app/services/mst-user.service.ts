import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MstUser } from '../model/mstUser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MstUserService {

  private apiUrl = 'http://localhost:8182/users';
  userDetails:any='';

  constructor(private http: HttpClient) { }

 getUserById(userId: string): Observable<MstUser> {
   return this.http.get<MstUser>(`${this.apiUrl}/${userId}`);
 }
  getAllUsers(): Observable<MstUser[]> {
    return this.http.get<MstUser[]>(this.apiUrl);
  }
  setUserData(data:MstUser)
  {
    this.userDetails=data;
  }
  getUserData(){
    return this.userDetails;
  }
}
