import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Fournit ce service à l'ensemble de l'application
})
export class AuthService {
  private loggedIn = false; // Indique si l'utilisateur est connecté
  private userData: any = null; // Stocke les données de l'utilisateur connecté (optionnel)

  constructor() {}

  /**
   * Simule une connexion utilisateur.
   * Vous pouvez remplacer cette logique par un appel API réel.
   */
  login(username: string, password: string): boolean {
    // Exemple de vérification (vous pouvez remplacer par un appel HTTP)
    if (username === 'admin' && password === 'password') {
      this.loggedIn = true;
      this.userData = { username }; // Stocke les données utilisateur
      localStorage.setItem('loggedIn', 'true'); // Sauvegarde l'état dans localStorage
      localStorage.setItem('userData', JSON.stringify(this.userData)); // Sauvegarde les données utilisateur
      return true;
    }
    return false;
  }

  /**
   * Déconnecte l'utilisateur.
   */
  logout(): void {
    this.loggedIn = false;
    this.userData = null;
    localStorage.removeItem('loggedIn'); // Supprime l'état de connexion
    localStorage.removeItem('userData'); // Supprime les données utilisateur
  }

  /**
   * Vérifie si l'utilisateur est connecté.
   * @returns {boolean} - Retourne `true` si connecté, sinon `false`.
   */
  isLoggedIn(): boolean {
    // Vérifie si l'utilisateur est connecté en mémoire ou via localStorage
    const savedState = localStorage.getItem('loggedIn');
    this.loggedIn = savedState === 'true';
    return this.loggedIn;
  }

  /**
   * Retourne les données de l'utilisateur connecté.
   * @returns {any} - Les données utilisateur ou `null` si non connecté.
   */
  getUserData(): any {
    if (!this.userData) {
      const savedUserData = localStorage.getItem('userData');
      this.userData = savedUserData ? JSON.parse(savedUserData) : null;
    }
    return this.userData;
  }
}

