import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgFor, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import{MatDatepickerModule} from  '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@Component({
  selector: 'app-parcel-out',
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
  templateUrl: './parcel-out.component.html',
  styleUrl: './parcel-out.component.css'
})
export class ParcelOutComponent {
  parcelOutForm: FormGroup;
  senders = ['Sender 1', 'Sender 2', 'Sender 3'];
  senderDepartments = ['Department 1', 'Department 2', 'Department 3'];
  recipientLocCodes = ['LocCode 1', 'LocCode 2', 'LocCode 3'];
  recipientDepartments = ['Department 1', 'Department 2', 'Department 3'];
  recipients = ['Recipient 1', 'Recipient 2', 'Recipient 3'];

  constructor(private formBuilder: FormBuilder) {
    this.parcelOutForm = this.formBuilder.group({
      consignmentNumber: ['', Validators.required],
      consignmentDate: ['', Validators.required],
      weight: ['', Validators.required],
      senderDepartment: ['', Validators.required],
      senderName: ['', Validators.required],
      recipientLocCode: ['', Validators.required],
      recipientDepartment: ['', Validators.required],
      recipientName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.parcelOutForm.valid) {
      // Process the form data, e.g., send to backend or display
      console.log(this.parcelOutForm.value);
    }
  }

}
