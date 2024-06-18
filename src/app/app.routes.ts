import { Routes } from '@angular/router';
import { LoginComponent } from './login/components/login/login.component';
import { DisEmpComponent } from './login/components/dis-emp/dis-emp.component';
import { IoclEmpComponent } from './login/components/iocl-emp/iocl-emp.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './dispatchEmp/components/home/home.component';
import { ParcelInComponent } from './dispatchEmp/components/parcel-in/parcel-in.component';
import { ParcelOutComponent } from './dispatchEmp/components/parcel-out/parcel-out.component';
import { HistoryComponent } from './dispatchEmp/components/history/history.component';
import { DispatchEmployeeComponent } from './dispatchEmp/components/dispatch-employee/dispatch-employee.component';
import { ProfileComponent } from './dispatchEmp/components/profile/profile.component';
export const routes: Routes = [
    {path:"login",component:LoginComponent},
    {path:"disEmp",component:DisEmpComponent},
    {path:"ioclEmp",component:IoclEmpComponent},
    {path:'',redirectTo:'login',pathMatch:'full'},
    {
        path: 'dispatchEmployee',
        component: DispatchEmployeeComponent,
        children: [
        //   { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', component: HomeComponent },
          { path: 'parcelIn', component: ParcelInComponent },
          { path: 'parcelOut', component: ParcelOutComponent },
          { path: 'history', component: HistoryComponent },
          {path:'profile',component:ProfileComponent}
        ]
      },
];
