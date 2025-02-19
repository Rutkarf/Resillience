import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GestionAccountComponent } from './gestion-account/gestion-account.component';
import { ProfilUserComponent } from './profil-user/profil-user.component';
import { SecurityComponent } from './security/security.component';
import { SupportComponent } from './support/support.component';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    data: { showSidemenu: true } 
  },
  { 
    path: 'gestion-account', 
    component: GestionAccountComponent,
    data: { showSidemenu: false }
  },
  { 
    path: 'profil-user', 
    component: ProfilUserComponent,
    data: { showSidemenu: true }
  },
  { 
    path: 'security', 
    component: SecurityComponent,
    data: { showSidemenu: true }
  },
  { 
    path: 'support', 
    component: SupportComponent,
    data: { showSidemenu: true }
  },
  // Redirection par défaut
  { path: '**', redirectTo: '' }
];
