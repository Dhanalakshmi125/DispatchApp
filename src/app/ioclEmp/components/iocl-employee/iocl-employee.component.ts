import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { RouterOutlet } from '@angular/router';
import { RouterModule, Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-iocl-employee',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    RouterOutlet,
    MatSidenavModule,
    NgIf,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatToolbarModule
  ],
  templateUrl: './iocl-employee.component.html',
  styleUrl: './iocl-employee.component.css'
})
export class IoclEmployeeComponent {
  searchQuery: string = '';
  isMenuOpened = true;

  constructor(private router: Router) {}

  navigate(path: string) {
    this.router.navigate([path]);
  }

  toggleSidenav(sidenav: any) {
    this.isMenuOpened = !this.isMenuOpened;
    sidenav.toggle();
  }

  onSearch() {
    console.log('Searching for:', this.searchQuery);
  }

}
