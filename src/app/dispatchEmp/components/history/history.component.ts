import { Component } from '@angular/core';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    MatButtonModule,MatCardModule,FormsModule,ReactiveFormsModule,NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    FormsModule,
    NgFor
    
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  parcelInHistory: string[] = [
    'Parcel In 1 - Date/Time',
    'Parcel In 2 - Date/Time',
    'Parcel In 3 - Date/Time',
    // Add more ParcelIn history items as needed
  ];

  parcelOutHistory: string[] = [
    'Parcel Out 1 - Date/Time',
    'Parcel Out 2 - Date/Time',
    'Parcel Out 3 - Date/Time',
    // Add more ParcelOut history items as needed
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
