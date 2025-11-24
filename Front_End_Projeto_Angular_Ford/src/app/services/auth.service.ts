import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AUTH_KEY = 'isLoggedIn';
  private readonly VALID_CREDENTIALS = {
    nome: 'admin',
    senha: '123456',
  };

  constructor(private router: Router) {}

  login(credentials: { nome: string; senha: string }): boolean {
    if (this.isValidCredentials(credentials)) {
      localStorage.setItem(this.AUTH_KEY, 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.AUTH_KEY) === 'true';
  }

  private isValidCredentials(credentials: {
    nome: string;
    senha: string;
  }): boolean {
    return (
      credentials.nome === this.VALID_CREDENTIALS.nome &&
      credentials.senha === this.VALID_CREDENTIALS.senha
    );
  }
}
