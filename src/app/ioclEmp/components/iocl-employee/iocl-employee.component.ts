import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { RouterOutlet } from '@angular/router';
import { RouterModule, Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Menu } from '../../models/menu';
import { MenuService } from '../../services/menu.service';
import { IoclEmpServiceService } from '../../../login/services/iocl-emp-service.service';
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
    NgFor,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './iocl-employee.component.html',
  styleUrl: './iocl-employee.component.css'
})
export class IoclEmployeeComponent {
  searchQuery: string = '';
  isMenuOpened = true;
  menus: Menu[] = [];
  empData:any=''

  constructor(private router: Router,
    private ioclEmpService:IoclEmpServiceService,
    private menuService:MenuService) {}

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
  
  ngOnInit(): void {

      this.empData=this.ioclEmpService.getEmpData();
     // const roleId = params['role']; // Get role from query params
      this.menuService.getMenusByRole(this.empData.role).subscribe((menus) => {
        this.menus = menus;
      });
  }
  // filterChildMenus(menuId: number) {
  //   return this.menus.filter((m) => m.parentMenuId !== undefined && m.parentMenuId === menuId);
  // }
  
}

