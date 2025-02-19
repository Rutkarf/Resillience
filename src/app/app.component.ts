import { Component } from '@angular/core';
import { CommonModule, NgClass, AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

import { SidemenuService } from './services/sidemenu.service';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { ParticulBGComponent } from './particul-bg/particul-bg.component'; // Import correct

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ParticulBGComponent, // Ajout du composant ici
    CommonModule,
    NavbarComponent,
    FooterComponent,
    NgClass,
    SidemenuComponent,
    RouterOutlet,
    AsyncPipe
  ],
  template: `
    <!-- Background Particles -->
    <app-particul-bg></app-particul-bg>

    <!-- Navbar -->
    <app-navbar (darkModeChanged)="onDarkModeChanged($event)"></app-navbar>

    <!-- Main Content -->
    <div class="main-container" [ngClass]="{'dark-mode': isDarkMode}">
      <app-sidemenu *ngIf="showSidemenu$ | async"></app-sidemenu>
      <main [ngClass]="{'bg-dark text-light': isDarkMode, 'with-sidemenu': showSidemenu$ | async}">
        <router-outlet></router-outlet>
      </main>
    </div>

    <!-- Footer -->
    <app-footer [isDarkMode]="isDarkMode"></app-footer>
  `,
})
export class AppComponent {
  isDarkMode: boolean = false; // Tracks whether dark mode is enabled
  showSidemenu$: Observable<boolean>; // Tracks visibility of the side menu

  constructor(private sidemenuService: SidemenuService) {
    this.showSidemenu$ = this.sidemenuService.showSidemenu$;
  }

  /**
   * Handles dark mode toggle.
   * @param isDarkMode - Whether dark mode is enabled.
   */
  onDarkModeChanged(isDarkMode: boolean) {
    this.isDarkMode = isDarkMode;

    // Apply dark mode styles to the body
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.body.style.setProperty('--background-color', isDarkMode ? '#333' : '#fff');
  }
}
