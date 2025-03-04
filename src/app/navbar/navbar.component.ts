import { Component, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('balanceChange', [
      transition('* => *', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('iconHover', [
      state('inactive', style({ transform: 'scale(1)' })),
      state('active', style({ transform: 'scale(1.2)' })),
      transition('inactive <=> active', animate('100ms ease-in-out'))
    ])
  ]
})
export class NavbarComponent implements OnInit {
  balance: number = 1000;
  isDarkMode: boolean = false;
  isMenuCollapsed = true;
  @Output() darkModeChanged = new EventEmitter<boolean>();

  constructor(
    private renderer: Renderer2,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    this.updateTheme();
    this.simulateBalanceChange();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    this.updateTheme();
    this.darkModeChanged.emit(this.isDarkMode);
  }

  updateTheme() {
    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark-mode');
    } else {
      this.renderer.removeClass(document.body, 'dark-mode');
    }
  }

  simulateBalanceChange() {
    setInterval(() => {
      this.balance = Math.floor(Math.random() * 10000);
    }, 5000);
  }

  login() {
    const success = this.authService.login('admin', 'password');
    if (success) {
      console.log('Connexion réussie !');
    } else {
      console.log('Échec de la connexion.');
    }
  }

  logout() {
    this.authService.logout();
    console.log('Déconnecté.');
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get userData(): any {
    return this.authService.getUserData();
  }
}
