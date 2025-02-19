import { Component, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgbModule, CommonModule, RouterLink],
  template: `
    <nav class="navbar navbar-expand-lg fixed-top cyberpunk-nav">
      <div class="container-fluid">
        <a routerLink="/" class="btn home-btn cyber-btn">
          <i class="bi bi-house-door-fill"></i> 
          <span class="btn-text">Accueil</span>
          <span class="btn-glitch"></span>
        </a>
        
        <span class="navbar-text cyber-text">
          <strong>Solde:</strong> 
          <span class="balance" [@balanceChange]="balance">
            {{balance | currency:'EUR'}}
            <span class="cyber-glow"></span>
          </span>
        </span>
        
        <ul class="navbar-nav cyber-nav">
          <li class="nav-item">
            <a class="nav-link cyber-icon" routerLink="/gestion-account" [@iconHover]="'inactive'" routerLinkActive="active">
              <i class="bi bi-credit-card-fill"></i>
              <span class="icon-glow"></span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link cyber-icon" routerLink="/security" [@iconHover]="'inactive'" routerLinkActive="active">
              <i class="bi bi-shield-lock-fill"></i>
              <span class="icon-glow"></span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link cyber-icon" routerLink="/support" [@iconHover]="'inactive'" routerLinkActive="active">
              <i class="bi bi-question-circle-fill"></i>
              <span class="icon-glow"></span>
            </a>
          </li>
        </ul>
        
        <button class="btn theme-toggle cyber-btn" (click)="toggleTheme()">
          <i [ngClass]="{'bi bi-moon-fill': !isDarkMode, 'bi bi-sun-fill': isDarkMode}"></i>
          <span class="btn-glitch"></span>
        </button>
      </div>
    </nav>
  `,
  styles: [`
    .cyberpunk-nav {
      background: linear-gradient(180deg, rgba(0,0,0,0.9) 0%, var(--sidemenu-bg) 100%);
      border-bottom: 2px solid var(--sidemenu-border);
      box-shadow: 0 2px 15px rgba(0, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      height: 60px;
    }

    .cyber-text {
      color: var(--sidemenu-color);
      text-shadow: 0 0 5px var(--sidemenu-color);
      margin-right: 2rem;
      position: relative;
      font-family: 'Orbitron', sans-serif;
    }

    .balance {
      font-weight: bold;
      color: #0ff;
      text-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
      position: relative;
      padding: 0 10px;
    }

    .cyber-btn {
      position: relative;
      color: var(--sidemenu-color);
      border: 1px solid var(--sidemenu-border);
      background: rgba(0,0,0,0.5);
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .btn-glitch {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, transparent 65%, rgba(0,255,255,0.1) 70%, transparent 75%);
      animation: glitch 3s infinite;
    }

    .cyber-icon {
      position: relative;
      color: var(--sidemenu-color) !important;
      font-size: 1.5rem;
      margin: 0 1rem;
      transition: all 0.3s ease;
    }

    .icon-glow {
      position: absolute;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, rgba(0,255,255,0.2) 0%, transparent 70%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .cyber-icon:hover .icon-glow {
      opacity: 1;
    }

    .cyber-icon.active {
      color: #0ff !important;
      text-shadow: 0 0 15px rgba(0,255,255,0.8);
    }

    @keyframes glitch {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }

    .cyber-btn:hover {
      color: #0ff;
      border-color: #0ff;
      box-shadow: 0 0 20px rgba(0,255,255,0.4);
      transform: scale(1.05);
    }
  `],
  animations: [
    trigger('balanceChange', [
      transition('* => *', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('iconHover', [
      state('inactive', style({
        transform: 'scale(1)'
      })),
      state('active', style({
        transform: 'scale(1.2)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class NavbarComponent implements OnInit {
  balance: number = 1000;
  isDarkMode: boolean = false;
  @Output() darkModeChanged = new EventEmitter<boolean>(); // Ajout de l'Output

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    this.updateTheme();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    this.updateTheme();
    this.darkModeChanged.emit(this.isDarkMode); // Émission de l'événement
  }

  updateTheme() {
    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark-mode');
    } else {
      this.renderer.removeClass(document.body, 'dark-mode');
    }
  }

  // Simuler un changement de solde toutes les 5 secondes
  ngAfterViewInit() {
    setInterval(() => {
      this.balance = Math.floor(Math.random() * 10000);
    }, 5000);
  }
}
