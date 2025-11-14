import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Tela de boas-vindas centralizada -->
    <div class="welcome-container">
      <!-- Imagem de fundo sutil -->
      <div class="background-image"></div>

      <!-- Conteúdo centralizado -->
      <div class="container h-100 d-flex align-items-center">
        <div class="row w-100 justify-content-center">
          <div class="col-md-8 col-lg-6">
            <div class="welcome-card text-center">
              <!-- Logo Ford -->
              <div class="logo-container mb-4">
                <img src="/ford.png" alt="Ford" class="welcome-logo" />
              </div>

              <!-- Mensagem de boas-vindas -->
              <h1 class="welcome-title mb-3">
                Bem-vindo ao<br />
                <span class="brand-highlight">Ford Dashboard</span>
              </h1>

              <p class="welcome-subtitle mb-4">
                Sistema de gestão estratégica para monitoramento de veículos
                Ford. Tenha acesso a dados em tempo real sobre vendas,
                conectividade e muito mais.
              </p>

              <!-- Botões de ação -->
              <div class="action-buttons">
                <button
                  type="button"
                  class="btn btn-dashboard mb-3"
                  (click)="goToDashboard()"
                >
                  <i class="bi bi-graph-up me-2"></i>
                  Acessar Dashboard
                </button>

                <button
                  type="button"
                  class="btn btn-secondary mb-3"
                  (click)="logout()"
                >
                  <i class="bi bi-box-arrow-right me-2"></i>
                  Sair do Sistema
                </button>
              </div>

              <!-- Menu de navegação inferior -->
              <div class="nav-menu mt-4">
                <div class="nav-buttons">
                  <button class="nav-btn active" (click)="goHome()">
                    <i class="bi bi-house-door"></i>
                    <span>Home</span>
                  </button>
                  <button class="nav-btn" (click)="goToDashboard()">
                    <i class="bi bi-graph-up"></i>
                    <span>Dashboard</span>
                  </button>
                  <button class="nav-btn" (click)="logout()">
                    <i class="bi bi-box-arrow-right"></i>
                    <span>Sair</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .welcome-container {
        min-height: 100vh;
        background: linear-gradient(135deg, #003478 0%, #002855 100%);
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .background-image {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url('/mustang.png');
        background-size: cover;
        background-position: center;
        opacity: 0.1;
        z-index: 1;
      }

      .welcome-card {
        background: rgba(255, 255, 255, 0.98);
        border-radius: 20px;
        padding: 3rem 2.5rem;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        backdrop-filter: blur(15px);
        position: relative;
        z-index: 2;
        max-width: 500px;
        width: 100%;
      }

      .welcome-logo {
        height: 60px;
        filter: brightness(0);
        margin-bottom: 1rem;
      }

      .welcome-title {
        font-size: 2.8rem;
        font-weight: 700;
        color: #003478;
        line-height: 1.1;
        margin-bottom: 1.5rem;
      }

      .brand-highlight {
        display: block;
        color: #003478;
        text-shadow: 0 2px 4px rgba(0, 52, 120, 0.2);
      }

      .welcome-subtitle {
        font-size: 1.1rem;
        color: #6c757d;
        line-height: 1.6;
        max-width: 400px;
        margin: 0 auto 2rem;
      }

      .action-buttons {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .btn {
        padding: 1rem 2rem;
        font-size: 1.1rem;
        font-weight: 600;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        transition: all 0.3s ease;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        min-height: 50px;
      }

      .btn-dashboard {
        background: linear-gradient(135deg, #003478 0%, #002855 100%);
        color: white;
        box-shadow: 0 4px 15px rgba(0, 52, 120, 0.3);
      }

      .btn-dashboard:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(0, 52, 120, 0.4);
      }

      .btn-secondary {
        background: rgba(108, 117, 125, 0.1);
        color: #6c757d;
        border: 2px solid rgba(108, 117, 125, 0.3);
      }

      .btn-secondary:hover {
        background: rgba(108, 117, 125, 0.2);
        color: #495057;
        transform: translateY(-2px);
      }

      .nav-menu {
        border-top: 1px solid rgba(233, 236, 241, 0.5);
        padding-top: 2rem;
        margin-top: 2rem;
      }

      .nav-buttons {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
      }

      .nav-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        background: none;
        border: none;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
        min-width: 80px;
        color: #6c757d;
      }

      .nav-btn:hover {
        background: rgba(0, 52, 120, 0.1);
        color: #003478;
        transform: translateY(-2px);
      }

      .nav-btn.active {
        background: rgba(0, 52, 120, 0.15);
        color: #003478;
      }

      .nav-btn i {
        font-size: 1.5rem;
        margin-bottom: 0.25rem;
      }

      .nav-btn span {
        font-size: 0.8rem;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      /* Responsividade */
      @media (max-width: 768px) {
        .welcome-card {
          padding: 2rem 1.5rem;
          margin: 1rem;
        }

        .welcome-title {
          font-size: 2.2rem;
        }

        .nav-buttons {
          gap: 1rem;
        }

        .nav-btn {
          min-width: 60px;
          padding: 0.75rem 0.5rem;
        }
      }

      @media (max-width: 480px) {
        .welcome-title {
          font-size: 1.8rem;
        }

        .action-buttons {
          gap: 0.5rem;
        }

        .btn {
          padding: 0.875rem 1.5rem;
          font-size: 1rem;
        }
      }
    `,
  ],
})
export class HomeComponent {
  constructor(private router: Router) {}

  goHome() {
    // Já estamos na home
    this.router.navigate(['/home']);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/']);
  }
}
