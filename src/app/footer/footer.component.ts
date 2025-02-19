import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TotemPhraseService } from '../services/totem-phrase.service';
import { trigger, state, style, animate, transition } from '@angular/animations';







@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  animations: [
    trigger('iconState', [
      state('normal', style({
        transform: 'scale(1)'
      })),
      state('hovered', style({
        transform: 'scale(1.2)',
        color: '#0ff',
        textShadow: '0 0 10px rgba(0,255,255,0.8)'
      })),
      transition('normal <=> hovered', animate('200ms ease-in-out'))
    ])
  ]
})
export class FooterComponent implements OnInit {
  @Input() isDarkMode: boolean = false;
  @HostBinding('class.dark-mode') get darkMode() { return this.isDarkMode; }

  totemPhrase: string = '';
  tempTotemPhrase: string = '';
  editingTotem: boolean = false;

  socialIcons = [
    { name: 'facebook', state: 'normal' },
    { name: 'mastodon', state: 'normal' },
    { name: 'instagram', state: 'normal' },
    { name: 'reddit', state: 'normal' }
  ];

  constructor(private totemPhraseService: TotemPhraseService) {}

  ngOnInit() {
    this.totemPhraseService.totemPhrase$.subscribe(phrase => {
      this.totemPhrase = phrase;
      this.tempTotemPhrase = phrase;
    });
  }

  toggleTotemEdit() {
    this.editingTotem = !this.editingTotem;
    if (this.editingTotem) {
      setTimeout(() => {
        const input = document.querySelector('.cyber-input') as HTMLInputElement;
        if (input) input.focus();
      }, 0);
    }
  }

  saveTotemPhrase() {
    if (this.tempTotemPhrase.trim()) {
      this.totemPhraseService.setTotemPhrase(this.tempTotemPhrase.trim());
    }
    this.editingTotem = false;
  }
}