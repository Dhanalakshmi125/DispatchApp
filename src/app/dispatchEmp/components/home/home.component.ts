import { Component } from '@angular/core';
import { DisEmpComponent } from '../../../login/components/dis-emp/dis-emp.component';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
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
  selector: 'app-home',
  standalone: true,
  imports: [
    DisEmpComponent,

    MatButtonModule,MatCardModule,NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    NgFor,
    MatToolbarModule,
   CommonModule,
   MatTableModule,
   MatToolbarModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // userId:string='';
  // constructor(private route: ActivatedRoute) { }

  // ngOnInit(): void {
  //   this.route.params.subscribe(params => {
  //     this.userId = params['ioclId'];
  //   });
  // }
  parcelsData = new MatTableDataSource([
    { total: 150, in: 100, out: 50 }, // Example data, replace with actual data
]);
displayedColumns: string[] = ['total', 'in', 'out'];
}
