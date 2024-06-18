import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { RouterModule ,Router} from '@angular/router';
import { IoclEmpComponent } from '../iocl-emp/iocl-emp.component';
import { DispatchEmployeeComponent } from '../../../dispatchEmp/components/dispatch-employee/dispatch-employee.component';
import { routes } from '../../../app.routes';

@Component({
  selector: 'app-dis-emp',
  standalone: true,
  imports: [
    MatButtonModule,MatCardModule,FormsModule,ReactiveFormsModule,NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    DispatchEmployeeComponent,
  ],
  templateUrl: './dis-emp.component.html',
  styleUrl: './dis-emp.component.css'
})
export class DisEmpComponent {
  loginForm: FormGroup;
  hide = true;
  captchaText: string='';
  userId:string='';
  constructor(private fb: FormBuilder,private router: Router) {
    this.loginForm = this.fb.group({
      ioclId: ['', Validators.required],
      password: ['', Validators.required],
      captchaInput: ['', Validators.required]
    });
    this.generateCaptcha();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { ioclId, password, captchaInput } = this.loginForm.value;
      if (captchaInput === this.captchaText) {
        // Handle successful login
        console.log(`Logging in with IOCL ID: ${ioclId}, Password: ${password}`);
        
        this.router.navigate(['/dispatchEmployee']);

      } else {
        // Handle captcha validation failure
        alert('Invalid captcha. Please try again.');
        this.reloadCaptcha();
      }
    }
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  generateCaptcha() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    this.captchaText = result;
  }

  reloadCaptcha() {
    this.generateCaptcha();
  }

}
