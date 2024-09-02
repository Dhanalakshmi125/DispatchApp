import { NgIf, NgFor, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MstUserService } from '../../../services/mst-user.service';
import { map, Observable, of, startWith } from 'rxjs';
import { IoclEmpServiceService } from '../../../services/iocl-emp-service.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-add-loc-admin',
  standalone: true,
  imports: [
    CommonModule,
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
    MatIconModule,
    MatAutocompleteModule
    
  ],
  templateUrl: './add-loc-admin.component.html',
  styleUrl: './add-loc-admin.component.css'
})
export class AddLocAdminComponent {
userForm!: FormGroup;
filteredLocationCodes: Observable<string[]> = of([]);
filteredEmployeeCodes: Observable<string[]> = of([]);
filteredUserNames: Observable<string[]> = of([]);
empRoles:string[]=[];
locationCodes: string[] = []; // Populate this with your location codes
empCodes: string[] = []; // Populate this with your sender codes
empNames: string[] = []; // Populate this with your recipient codes

constructor(
  private fb: FormBuilder,
  private mstUserService: MstUserService,
  private ioclEmpService: IoclEmpServiceService
) {
  this.userForm = this.fb.group({
    locCode: ['', Validators.required],
    userId: ['', Validators.required],
    userName: ['', Validators.required],
    mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    roleId: ['', Validators.required],
  });
}

ngOnInit(): void {

  this.loadLocCodes();
  this.loadUserID();
  this.loadRoles();
  this.userForm.get('locCode')?.valueChanges.subscribe((locCode) => {
    if (locCode) {
      this.loadUserNameByLocCode();
    } else {
      this.empNames = []; // Clear the names if locCode is empty
    }
  });

  this.filteredLocationCodes = this.userForm.get('locCode')?.valueChanges.pipe(
    startWith(''),
    map(value => this.filterLocationCodes(value))
  ) ?? of([]);

  this.filteredEmployeeCodes = this.userForm.get('userId')?.valueChanges.pipe(
    startWith(''),
    map(value => this.filterEmployeeCodes(value))
  ) ?? of([]);

  this.filteredUserNames = this.userForm.get('userName')?.valueChanges.pipe(
    startWith(''),
    map(value => this.filterUserNames(value))
  ) ?? of([]);

  // this.roles$ = this.ioclEmpService.getRoles();
}

loadLocCodes():void{ 
  this.ioclEmpService.getLocationNames().subscribe(locations => {
    this.locationCodes = locations;
  });
}

loadUserID():void{
  this.ioclEmpService.getEmployeeCodes().subscribe(empCode => {
    this.empCodes = empCode;
  });
}

// loadUserNameByLocCode(): void {
//   const locationCode = this.userForm.get('locCode')?.value;
//   if (locationCode) {
//     const locName = encodeURIComponent(locationCode.split('(')[0].trim()); 
//     this.ioclEmpService.getEmployeesByLoc(locName).subscribe(empName => {
//       this.empNames = empName;
//     });
//   }
// }
loadUserNameByLocCode(): void {
  const LocCode = this.userForm.get('locCode')?.value;
 
  console.log('Sender Location Code:', LocCode); // Debugging
 

  if (LocCode) {
    const locName = LocCode.split('(')[0].trim();  // Extract the locName from senderLocCode
    console.log("locname:",locName);
   
    this.ioclEmpService.getEmployeesByLoc(locName).subscribe({
      
      next: (response) => {
        console.log('Full Response:', response);
       this.empNames = response;
        console.log('Received Sender Names:', this.empNames);
      },
      error: (err) => {
        console.error('Failed to load sender names:', err);
      }
    });
    
  }
}


loadRoles():void{
  this.ioclEmpService.getRoles().subscribe(roles =>{
    this.empRoles=roles;
  }
  )
}

filterLocationCodes(value: string): string[] {
  if (value.trim() === '') {
    return []; // No suggestions when input is empty
  }
  const filterValue = value.toLowerCase();
  return this.locationCodes.filter(locCode => locCode.toLowerCase().includes(filterValue));
}

filterEmployeeCodes(value: string): string[]{
  if (value.trim() === '') {
    return []; // No suggestions when input is empty
  }
  const filterValue = value.toLowerCase();
  return this.empCodes.filter(empCode=> empCode.toLowerCase().includes(filterValue));
}

filterUserNames(value: string): string[] {
  if (value.trim() === '') {
    return []; // No suggestions when input is empty
  }
  const filterValue = value.toLowerCase();
  return this.empNames.filter(name => name.toLowerCase().includes(filterValue));
}

onSubmit(): void {
  if (this.userForm.valid) {
    const formData = this.userForm.value;

    this.mstUserService.createLocAdmin(formData).subscribe(
      response => {
        console.log('User created successfully', response);
      },
      error => {
        console.error('Error creating user', error);
      }
    );
  } else {
    console.error('Form is invalid');
  }
}


}
