import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { RouterOutlet } from '@angular/router';
import { routes } from '../../../app.routes';
import { RouterModule,Router} from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HomeComponent } from '../home/home.component';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-dispatch-employee',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    RouterOutlet,
    MatSidenavModule,
    HomeComponent,
    NgIf
  ],
  templateUrl: './dispatch-employee.component.html',
  styleUrl: './dispatch-employee.component.css'
})
export class DispatchEmployeeComponent {
  constructor(private router: Router) {}

  navigate(path: string) {
    this.router.navigate([path]);
  }
  isMenuOpened = true;

  toggleSidenav(sidenav: any) {
    this.isMenuOpened = !this.isMenuOpened;
    sidenav.toggle();
  }

}
