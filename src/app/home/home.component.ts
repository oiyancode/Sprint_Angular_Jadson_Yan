import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  menuOpen: boolean = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  goHome() {
    // Já estamos na home
    this.router.navigate(['/home']);
    this.menuOpen = false;
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
    this.menuOpen = false;
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/']);
    this.menuOpen = false;
  }
}
