import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent {
  questions: Question[] = [
    {
      text: 'Comment réinitialiser mon mot de passe ?', answers: ['Pour réinitialiser votre mot de passe, allez dans les paramètres de votre compte et cliquez sur "Réinitialiser le mot de passe".'],
      id: 0
    },
    {
      text: 'Comment contacter le support technique ?', answers: ['Vous pouvez contacter le support technique par email à support@example.com.'],
      id: 0
    },
    {
      text: 'Quels sont les délais de réponse du support ?', answers: ['Le délai de réponse moyen est de 24 à 48 heures.'],
      id: 0
    },
    {
      text: 'Comment puis-je modifier mes informations personnelles ?', answers: ['Vous pouvez modifier vos informations personnelles dans la section "Mon compte".'],
      id: 0
    }
  ];
  
  searchQuery: string = '';

  contactSupport() {
    console.log('Contacting support...');
  }

  showAllTopics() {
    console.log('Showing all topics...');
  }
}

interface Question {
  id: number;
  text: string;
  answers: string[];
}
