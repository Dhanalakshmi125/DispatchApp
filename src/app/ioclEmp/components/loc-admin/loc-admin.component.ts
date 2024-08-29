import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MstUser } from '../../../model/mstUser';
import { MstUserService } from '../../../services/mst-user.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-loc-admin',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    NgFor,
    MatToolbarModule,
    CommonModule,
    MatTableModule,
    MatToolbarModule,
    FormsModule,
    MatGridListModule,
    ReactiveFormsModule, NgIf,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatPaginatorModule
  ],
  templateUrl: './loc-admin.component.html',
  styleUrl: './loc-admin.component.css'
})
export class LocAdminComponent {
  @ViewChild('userDialogTemplate') userDialogTemplate!: TemplateRef<any>;
  displayedColumns: string[] = ['locCode', 'userId', 'userName', 'mobileNo', 'roleId', 'status'];
  filteredData: MstUser[] = [];
  locCodeFilter: string = '';  // Model for the loc_code filter


  constructor(private mstUserService: MstUserService,
     private dialog: MatDialog,
     private router: Router,
  ) {}

  ngOnInit(): void {
    this.fetchAllUsers();
  }

  fetchAllUsers(): void {
    this.mstUserService.getAllUsers().subscribe(data => {
      this.filteredData = data;
    }, error => {
      console.error('Error fetching users', error);
    });
  }

  openViewDialog(user: any): void {
    const dialogRef = this.dialog.open(this.userDialogTemplate, {
      width: '400px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle any actions after dialog is closed, if needed
    });
  }

  applyFilter(): void {
    if (this.locCodeFilter) {
      this.filteredData = this.filteredData.filter(user => 
        user.locCode.toLowerCase().includes(this.locCodeFilter.toLowerCase())
      );
    } else {
      this.fetchAllUsers();  // Reset the data if no filter is applied
    }
  }

  clearFilter(): void {
    this.filteredData = [];
    this.fetchAllUsers();
  }
  editUser(userData:MstUser) {
    this.dialog.closeAll();
   this.mstUserService.setUserData(userData);
   this.router.navigate(['/ioclEmployee/userEdit']);
 }
 deleteUser(data:any)
 {}
 addNew()
 {}
 onClose()
 {}

}
