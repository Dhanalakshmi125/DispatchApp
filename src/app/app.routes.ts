import { Routes } from '@angular/router';
import { LoginComponent } from './login/components/login/login.component';
import { DisEmpReqOtpComponent } from './login/components/dis-emp-req-otp/dis-emp-req-otp.component';
import { IoclEmpComponent } from './login/components/iocl-emp/iocl-emp.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './dispatchEmp/components/home/home.component';
import { ParcelInComponent } from './dispatchEmp/components/parcel-in/parcel-in.component';
import { ParcelOutComponent } from './dispatchEmp/components/parcel-out/parcel-out.component';
import { DispatchEmployeeComponent } from './dispatchEmp/components/dispatch-employee/dispatch-employee.component';
import { ProfileComponent } from './dispatchEmp/components/profile/profile.component';
import { IoclEmployeeComponent } from './ioclEmp/components/iocl-employee/iocl-employee.component';
import { DashboardComponent } from './ioclEmp/components/dashboard/dashboard.component';
import { DisEmpVerOtpComponent } from './login/components/dis-emp-ver-otp/dis-emp-ver-otp.component';
import { HistoryComponent } from './dispatchEmp/components/history/history.component';
import { EmpHistoryComponent } from './ioclEmp/components/emp-history/emp-history.component';
import { EmpReportsComponent } from './ioclEmp/components/emp-reports/emp-reports.component';
import { ReportsComponent } from './dispatchEmp/components/reports/reports.component';
import { ParcelEditComponent } from './dispatchEmp/components/parcel-edit/parcel-edit.component';
import { ParcelOutEditComponent } from './dispatchEmp/components/parcel-out-edit/parcel-out-edit.component';
import { LocImplementationComponent } from './ioclEmp/components/loc-implementation/loc-implementation.component';
import { LocAdminComponent } from './ioclEmp/components/loc-admin/loc-admin.component';
export const routes: Routes = [
    {path:"login",component:LoginComponent},
    {path:"disEmpReqOtp",component:DisEmpReqOtpComponent},
    {path:"disEmpVerOtp",component:DisEmpVerOtpComponent},
    {path:"ioclEmp",component:IoclEmpComponent},
    // {path:"ioclEmp",component:IoclEmpComponent},
     {path:'',redirectTo:'login',pathMatch:'full'},
    //{path:'',redirectTo:'disEmpVerOtp',pathMatch:'full'},
    {
        path: 'dispatchEmployee',
        component: DispatchEmployeeComponent,
        children: [
          // { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', component: HomeComponent },
          { path: 'parcelIn', component: ParcelInComponent },
          { path: 'parcelOut', component: ParcelOutComponent },
          { path: 'profile', component: ProfileComponent },
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'history', component: HistoryComponent } ,
          { path: 'reports', component: ReportsComponent },
          { path: 'parcelEdit', component: ParcelEditComponent },
          { path: 'parcelOutEdit', component: ParcelOutEditComponent }
        ]
      },
      // {path:'',redirectTo:'ioclEmployee',pathMatch:'full'},
      {
        path:'ioclEmployee',
        component:IoclEmployeeComponent,
        children:[
          { path:'dashboard',component:DashboardComponent },
        //  { path:'profile', component:ProfileComponent},
         // { path: 'dashboard', component: DashboardComponent },
          { path: 'loc-implementation', component: LocImplementationComponent },
          { path: 'loc-admin', component: LocAdminComponent },
          { path: 'history', component: EmpHistoryComponent },
          { path: 'reports', component: EmpReportsComponent },
         // { path: '', redirectTo: '/dashboard', pathMatch: 'full' } // Default route
        ]
      }
];
