import { formatNumber } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-parcel-in',
  standalone: true,
  imports: [
    MatButtonModule,MatCardModule,FormsModule,ReactiveFormsModule,NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
  ],
  templateUrl: './parcel-in.component.html',
  styleUrl: './parcel-in.component.css'
})
export class ParcelInComponent {
  parcelInForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.parcelInForm = this.formBuilder.group({
      senderName: ['', Validators.required],
      senderAddress: ['', Validators.required],
      recipientName: ['', Validators.required],
      recipientAddress: ['', Validators.required],
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
