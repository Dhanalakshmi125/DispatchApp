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
import { IoclEmployeeComponent } from '../../../ioclEmp/components/iocl-employee/iocl-employee.component';
@Component({
  selector: 'app-iocl-emp',
  standalone: true,
  imports: [
    IoclEmployeeComponent,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
  ],
  templateUrl: './iocl-emp.component.html',
  styleUrl: './iocl-emp.component.css'
})
export class IoclEmpComponent {
  loginForm: FormGroup;
  hide = true;
  captchaText: string='';

  constructor(private fb: FormBuilder,private router: Router) {
    this.loginForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required],
      captchaInput: ['', Validators.required]
    });
    this.generateCaptcha();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { userId, password, captchaInput } = this.loginForm.value;
      if (captchaInput === this.captchaText) {
        // Handle successful login
        console.log(`Logging in with IOCL ID: ${userId}, Password: ${password}`);
        this.router.navigate(['/ioclEmployee']);

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
