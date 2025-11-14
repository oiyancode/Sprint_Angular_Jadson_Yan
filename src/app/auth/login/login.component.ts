import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      nome: ['', [Validators.required]],
      senha: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { nome, senha } = this.loginForm.value;

      // Validação simples conforme especificado no PDF
      if (nome === 'admin' && senha === '123456') {
        // Login bem-sucedido
        localStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['/home']);
      } else {
        this.loginError = 'Credenciais inválidas';
      }
    }
  }
}
