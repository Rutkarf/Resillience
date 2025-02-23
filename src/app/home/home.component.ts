// home.component.ts
import { Component, ViewContainerRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenRaveComponent } from '../token-rave/token-rave.component';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TokenRaveComponent],
  template: `

        <app-token-rave></app-token-rave>
      
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private viewContainerRef: ViewContainerRef) {}

  async ngAfterViewInit() {
    try {
      const { TokenRaveComponent } = await import('../token-rave/token-rave.component');
      
      // Créez dynamiquement le composant
      const componentRef = this.viewContainerRef.createComponent(TokenRaveComponent);
    } catch (error) {
      console.error('Erreur lors du chargement du TokenRaveComponent:', error);
    }
  }
}
