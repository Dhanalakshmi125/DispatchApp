import { Component } from '@angular/core';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
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
    NgFor,
    MatToolbarModule,
    CommonModule,
    MatTableModule,
    MatToolbarModule

    
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  displayedColumns: string[] = ['id', 'senderName', 'recipientName', 'date'];
  historyData = [
    {id: 1, senderName: 'John Doe', recipientName: 'Jane Smith', date: new Date()},
    {id: 2, senderName: 'Alice Brown', recipientName: 'Bob White', date: new Date()},
    // Add more data here
  ];
  parcelsIn: [] = [];
  parcelsOut: [] = [];

  constructor() { }

  ngOnInit(): void {
  }
}
