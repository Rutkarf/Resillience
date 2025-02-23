import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-profil-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.css'],
  encapsulation: ViewEncapsulation.None // Ajoutez cette ligne
})
export class ProfilUserComponent {
  // ...
}
