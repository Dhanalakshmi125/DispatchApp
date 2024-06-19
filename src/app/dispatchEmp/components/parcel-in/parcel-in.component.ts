import { NgFor, formatNumber } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import{MatDatepickerModule} from  '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@Component({
  selector: 'app-parcel-in',
  standalone: true,
  imports: [
    MatButtonModule,MatCardModule,FormsModule,ReactiveFormsModule,NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgFor
  ],
  templateUrl: './parcel-in.component.html',
  styleUrl: './parcel-in.component.css'
})
export class ParcelInComponent {
  parcelInForm: FormGroup;
  senders = ['Sender 1', 'Sender 2', 'Sender 3'];
  recipients = ['Recipient 1', 'Recipient 2', 'Recipient 3'];
  departments = ['Department 1', 'Department 2', 'Department 3'];
  locationCodes = ['LocCode 1', 'LocCode 2', 'LocCode 3'];
  couriers = ['Courier 1', 'Courier 2', 'Courier 3'];

  constructor(private formBuilder: FormBuilder) {
    this.parcelInForm = this.formBuilder.group({
      consignmentNo:['', Validators.required],
      consignmentDate: ['', Validators.required],
      receivedDate: ['', Validators.required],
      senderLocCode: ['', Validators.required],
      senderDepartment: ['', Validators.required],
      senderName: ['', Validators.required],
      recipientDepartment: ['', Validators.required],
      recipientName: ['', Validators.required],
      courierName: ['', Validators.required],
      // recipientDepartment: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.parcelInForm.valid) {
      // Process the form data, e.g., send to backend or display
      console.log(this.parcelInForm.value);
    }
  }

}
