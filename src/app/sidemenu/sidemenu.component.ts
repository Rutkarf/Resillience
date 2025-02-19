import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  menuItems: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateMenuItems();
    });

    // Initialisation du menu
    this.updateMenuItems();
  }

  private updateMenuItems() {
    const currentRoute = this.router.url;

    if (currentRoute === '/profil-user') {
      this.menuItems = [
        { label: 'Changer d\'avatar', route: '/profil-user/avatar', icon: 'bi-person-circle' },
        { label: 'Changer de numéro de téléphone', route: '/profil-user/phone', icon: 'bi-phone' },
        { label: 'Changer d\'adresse', route: '/profil-user/address', icon: 'bi-house' },
        { label: 'Changer d\'username', route: '/profil-user/username', icon: 'bi-person' },
        { label: 'Supprimer le compte', route: '/profil-user/delete', icon: 'bi-trash' }
      ];
    } else if (currentRoute === '/security') {
      this.menuItems = [
        { label: 'Signaler une FRAUDE', route: '/security/fraud', icon: 'bi-exclamation-circle' },
        { label: 'Signaler une carte Perdue', route: '/security/lost-card', icon: 'bi-card-list' },
        { label: 'Signaler un Appareil perdu', route: '/security/lost-device', icon: 'bi-device-hub' },
        { label: 'Signaler un virement Suspect', route: '/security/suspicious-transfer', icon: 'bi-arrow-right' },
        { label: 'Bloquer le compte', route: '/security/block-account', icon: 'bi-lock' }
      ];
    } else if (currentRoute === '/support') {
      this.menuItems = [
        { label: 'Forum de Support', route: '/support', icon: 'bi-question-circle' }
      ];
    } else {
      this.menuItems = [
        { label: 'Gestion des comptes', route: '/gestion-account', icon: 'bi-wallet2' },
        { label: 'Profil', route: '/profil-user', icon: 'bi-person-circle' },
        { label: 'Sécurité', route: '/security', icon: 'bi-shield-lock' },
        { label: 'Support', route: '/support', icon: 'bi-question-circle' }
      ];
    }
  }
}




