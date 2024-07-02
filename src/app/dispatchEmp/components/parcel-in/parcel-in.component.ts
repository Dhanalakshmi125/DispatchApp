import { JsonPipe, NgFor, formatNumber } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { MstLocation } from '../../model/mstLocation';
import { MstDepartment } from '../../model/mstDepartment';
import { MstUser } from '../../model/mstUser';
import { MstCourier } from '../../model/mstCourier';
import { TrnParcelIn } from '../../model/trnParcelIn';
import { TrnParcelInService } from '../../services/trn-parcel-in.service';
import { MstLocationService } from '../../services/mst-location.service';
import { MstDepartmentService } from '../../services/mst-department.service';
import { MstCourierService } from '../../services/mst-courier.service';
import { MstUserService } from '../../services/mst-user.service';

@Component({
  selector: 'app-parcel-in',
  standalone: true,
  imports: [
    MatButtonModule, MatCardModule, FormsModule, ReactiveFormsModule, NgIf,
    MatFormFieldModule, MatInputModule, MatDialogModule, MatIconModule,
    MatSelectModule, MatDatepickerModule, MatNativeDateModule, NgFor, JsonPipe,
  ],
  templateUrl: './parcel-in.component.html',
  styleUrl: './parcel-in.component.css'
})
export class ParcelInComponent implements OnInit {

  parcelInForm: FormGroup;
  locationCodes: MstLocation[] = [];
  departments: MstDepartment[] = [];
  senders: MstUser[] = [];
  recipients: MstUser[] = [];
  couriers: MstCourier[] = [];

  constructor(
    private fb: FormBuilder,
    private parcelInService: TrnParcelInService,
    private locationService: MstLocationService,
    private departmentService: MstDepartmentService,
    private courierService: MstCourierService,
    private userService: MstUserService,
    private snackBar: MatSnackBar
  ) {
    this.parcelInForm = this.fb.group({
      consignmentNo: ['', Validators.required],
      consignmentDate: ['', Validators.required],
      receivedDate: ['', Validators.required],
      senderLocCode: ['', Validators.required],
      senderDepartment: ['', Validators.required],
      senderName: ['', Validators.required],
      recipientDepartment: ['', Validators.required],
      recipientName: ['', Validators.required],
      courierName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadLocations();
    this.loadCouriers();

    // Adding value changes subscription to load dependent data
    this.parcelInForm.get('senderLocCode')?.valueChanges.subscribe(senderLocCode => {
      this.loadDepartments(senderLocCode);
    });

    this.parcelInForm.get('senderDepartment')?.valueChanges.subscribe(senderDepartment => {
      const senderLocCode = this.parcelInForm.get('senderLocCode')?.value;
      if (senderLocCode) {
        this.loadSenders(senderLocCode, senderDepartment);
      }
    });

    this.parcelInForm.get('recipientDepartment')?.valueChanges.subscribe(recipientDepartment => {
      const recipientLocCode = this.parcelInForm.get('recipientLocCode')?.value;
      if (recipientLocCode) {
        this.loadRecipients(recipientLocCode, recipientDepartment);
      }
    });
  }

  loadLocations(): void {
    this.locationService.getAllLocations().subscribe(locations => {
      this.locationCodes = locations;
    });
  }

  loadDepartments(senderLocCode: string): void {
    this.parcelInService.getSenderDepartments(senderLocCode).subscribe(departments => {
      this.departments = departments;
    });
  }

  loadSenders(senderLocCode: string, deptCode: string): void {
    this.parcelInService.getSenderUsers(senderLocCode, deptCode).subscribe(senders => {
      this.senders = senders;
    });
  }

  loadRecipients(recipientLocCode: string, deptCode: string): void {
    this.parcelInService.getRecipientUsers(recipientLocCode, deptCode).subscribe(recipients => {
      this.recipients = recipients;
    });
  }

  loadCouriers(): void {
    this.courierService.getAllCouriers().subscribe(couriers => {
      this.couriers = couriers;
    });
  }

  onSubmit(): void {
    if (this.parcelInForm.valid) {
      const parcelIn: TrnParcelIn = this.parcelInForm.value;
      this.parcelInService.createParcelIn(parcelIn).subscribe(response => {
        this.snackBar.open('Parcel In created successfully', 'Close', { duration: 3000 });
        this.parcelInForm.reset();
      }, error => {
        this.snackBar.open('Error creating Parcel In', 'Close', { duration: 3000 });
      });
    } else {
      this.snackBar.open('Please fill in all required fields', 'Close', { duration: 3000 });
    }
  }
}
