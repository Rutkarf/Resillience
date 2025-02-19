import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SidemenuService {
  private showSidemenu = new BehaviorSubject<boolean>(true);
  showSidemenu$ = this.showSidemenu.asObservable();

  constructor(private router: Router) {
    // Initialiser l'état du sidemenu
    this.updateSidemenuVisibility();

    // Écouter les changements de route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateSidemenuVisibility();
    });
  }

  private updateSidemenuVisibility() {
    const currentUrl = this.router.url;
    const hiddenRoutes = ['/gestion-account'];
    const shouldShow = !hiddenRoutes.includes(currentUrl);
    this.showSidemenu.next(shouldShow);
  }

  toggleSidemenu(show: boolean) {
    this.showSidemenu.next(show);
  }
}