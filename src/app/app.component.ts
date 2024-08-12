import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IoclEmpComponent } from './login/components/iocl-emp/iocl-emp.component';
import { LoginComponent } from './login/components/login/login.component';
import { ProfileComponent } from './dispatchEmp/components/profile/profile.component';
import { ParcelInComponent } from './dispatchEmp/components/parcel-in/parcel-in.component';
import { ParcelOutComponent } from './dispatchEmp/components/parcel-out/parcel-out.component';
import { HistoryComponent } from './dispatchEmp/components/history/history.component';
import { DispatchEmployeeComponent } from './dispatchEmp/components/dispatch-employee/dispatch-employee.component';
import { HttpClientModule } from '@angular/common/http';
import { DisEmpReqOtpComponent } from './login/components/dis-emp-req-otp/dis-emp-req-otp.component';
import { DisEmpVerOtpComponent } from './login/components/dis-emp-ver-otp/dis-emp-ver-otp.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    IoclEmpComponent,
    DisEmpReqOtpComponent,
    DisEmpVerOtpComponent,
    LoginComponent,
    ProfileComponent,
    ParcelInComponent,
    ParcelOutComponent,
    HistoryComponent,
    DispatchEmployeeComponent,
    HttpClientModule,
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DispatchApp';
}
