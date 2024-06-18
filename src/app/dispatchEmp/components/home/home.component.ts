import { Component } from '@angular/core';
import { DisEmpComponent } from '../../../login/components/dis-emp/dis-emp.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    DisEmpComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  userId:string='';
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['ioclId'];
    });
  }
 
}
