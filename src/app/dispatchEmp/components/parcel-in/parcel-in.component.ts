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
import { DatePipe } from '@angular/common';
import { MstEmployee } from '../../model/mstEmployee';
import { HttpErrorResponse } from '@angular/common/http';
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
  locationCodes: string[] = [];
  senderDepartments: string[] = [];
  recipientDepartments: string[] = [];
  senders: string[] = [];
  recipients: string[] = [];
  couriers: MstCourier[] = [];

  constructor(
    private fb: FormBuilder,
    private parcelInService: TrnParcelInService,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) {
    this.parcelInForm = this.fb.group({
      consignmentNumber: ['', Validators.required],
      consignmentDate: [this.datePipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required],
      receivedDate: [this.datePipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required],
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
    this.loadRecipientDept();
    this.loadRecipientNames();
    

    this.parcelInForm.get('senderLocCode')?.valueChanges.subscribe(senderLocCode => {
      this.loadDepartmentsByLocationName(senderLocCode);
    });

    this.parcelInForm.get('senderDepartment')?.valueChanges.subscribe(senderDepartment => {
      this.loadSenderNames(senderDepartment);
    });

    // Uncomment if you need to fetch recipient names based on recipientDepartment changes
    // this.parcelInForm.get('recipientDepartment')?.valueChanges.subscribe(() => {
    //   this.loadRecipientNames();
    // });
  }

  loadLocations(): void {
    this.parcelInService.getLocations().subscribe(locations => {
      this.locationCodes = locations;
    });
  }

  loadDepartmentsByLocationName(senderLocCode: string): void {
    this.parcelInService.getDepartmentsByLocationName(senderLocCode).subscribe(departments => {
      this.senderDepartments = departments; // Store in senderDepartments array
    });
  }

  loadSenderNames(senderDepartment: string): void {
    this.parcelInService.getAllEmployees().subscribe(senders => {
      this.senders = senders;
    });
  }

  loadRecipientDept(): void {
    this.parcelInService.getRecipientDepartments().subscribe(departments => {
      this.recipientDepartments = departments; // Store in recipientDepartments array
    });
  }

  loadRecipientNames(): void {
    this.parcelInService.getAllEmployees().subscribe(recipients => {
      this.recipients = recipients;
    });
  }

  loadCouriers(): void {
    this.parcelInService.getAllCouriers().subscribe(couriers => {
      this.couriers = couriers;
    });
  }
  onSubmit(): void {
    console.log('Payload:', this.parcelInForm.value);
    if (this.parcelInForm.invalid) {
      this.snackBar.open('Please fill all required fields.', 'Close', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }

    const parcelIn: TrnParcelIn = {
      consignmentNumber: this.parcelInForm.value.consignmentNumber,
      consignmentDate: this.parcelInForm.value.consignmentDate,
      receivedDate: this.parcelInForm.value.receivedDate,
      senderLocCode: this.parcelInForm.value.senderLocCode,
      senderDepartment: this.parcelInForm.value.senderDepartment,
      senderName: this.parcelInForm.value.senderName,
      recipientDepartment: this.parcelInForm.value.recipientDepartment,
      recipientName: this.parcelInForm.value.recipientName,
      courierName: this.parcelInForm.value.courierName,
      recipientLocCode: '', // Handled by backend
      inTrackingId:0,  // Handled by backend
      recordStatus: '',     // Handled by backend
      createdBy: '',        // Handled by backend
      createdDate: new Date()  // Handled by backend
    };

    this.parcelInService.createParcel(parcelIn).subscribe(
    (response) => {
        this.snackBar.open('Parcel created successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top'
        });
        this.parcelInForm.reset();
      },
      (error: HttpErrorResponse) => {
        // Enhanced error logging
        console.error('Error Status:', error.status); // Logs HTTP status code
        console.error('Status Text:', error.statusText); // Logs status text
        console.error('Error URL:', error.url); // Logs the URL that caused the error
  
        if (error.error instanceof ErrorEvent) {
          // Client-side error (network issue, etc.)
          console.error('Client-side Error:', error.error.message);
        } else {
          // Server-side error
          console.error('Server-side Error:', error.error);
          
          if (error.error.message) {
            console.error('Error Message:', error.error.message);
          }
  
          if (error.error.trace) {
            console.error('Error Trace:', error.error.trace);
          }
  
          if (error.error.errors && Array.isArray(error.error.errors)) {
            console.error('Validation Errors:', error.error.errors);
          }
        }
  
        // Provide user-friendly feedback
        alert('An error occurred while creating the parcel. Please try again later.');
      }
    );

  }  }
