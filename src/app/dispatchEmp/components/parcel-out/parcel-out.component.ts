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
  selector: 'app-parcel-out',
  standalone: true,
  imports: [
    MatButtonModule,MatCardModule,FormsModule,ReactiveFormsModule,NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
  ],
  templateUrl: './parcel-out.component.html',
  styleUrl: './parcel-out.component.css'
})
export class ParcelOutComponent {
  parcelOutForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.parcelOutForm = this.formBuilder.group({
      senderName: ['', Validators.required],
      senderAddress: ['', Validators.required],
      recipientName: ['', Validators.required],
      recipientAddress: ['', Validators.required],
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
