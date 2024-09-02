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
export class LocAdminComponent{

@ViewChild('userDialogTemplate') userDialogTemplate!: TemplateRef<any>;
displayedColumns: string[] = ['locCode', 'userId', 'userName', 'mobileNumber', 'roleId', 'status','view'];
originalData: MstUser[] = [];
filteredData: MstUser[] = [];
locCodeFilter: string = '';  // Model for the loc_code filter

constructor(
  private mstUserService: MstUserService,
  private dialog: MatDialog,
  private router: Router
) {}

ngOnInit(): void {
  this.fetchAllUsers();
}

fetchAllUsers(): void {
  this.mstUserService.getAllUsers().subscribe(data => {
    this.originalData = data;
    this.filteredData = data;  // Initialize filteredData with the full data
  }, error => {
    console.error('Error fetching users', error);
  });
}

openViewDialog(user: MstUser): void {
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
    this.filteredData = this.originalData.filter(user =>
      user.locCode.toLowerCase().includes(this.locCodeFilter.toLowerCase())
    );
  } else {
    this.filteredData = [...this.originalData];  // Reset to original data
  }
}

clearFilter(): void {
  this.locCodeFilter = '';
  this.filteredData = [...this.originalData];  // Reset to original data
}

editUser(userData: MstUser): void {
  this.dialog.closeAll();
  this.mstUserService.setUserData(userData);
  this.router.navigate(['/ioclEmployee/userEdit']);
}

deleteUser(user: MstUser): void {
  // const confirmDelete = confirm(`Are you sure you want to delete the user ${user.userName}?`);
  // if (confirmDelete) {
  //   // Call the delete service method here
  //   this.mstUserService.deleteUser(user.userId).subscribe(() => {
  //     this.fetchAllUsers();  // Refresh the user list after deletion
  //   }, error => {
  //     console.error('Error deleting user', error);
  //   });
  // }
}

addNew(): void {
  this.router.navigate(['/ioclEmployee/addLocAdmin']);
}

onClose(): void {
  this.dialog.closeAll();  // Closes the currently open dialog
}
}
