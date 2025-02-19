import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TotemPhraseService {
  private defaultPhrase = "Tout Travail est noblesse";
  private totemPhraseSubject = new BehaviorSubject<string>(
    localStorage.getItem('totemPhrase') || this.defaultPhrase
  );

  totemPhrase$ = this.totemPhraseSubject.asObservable();

  setTotemPhrase(phrase: string) {
    localStorage.setItem('totemPhrase', phrase);
    this.totemPhraseSubject.next(phrase);
  }

  verifyTotemPhrase(phrase: string): boolean {
    return phrase === this.totemPhraseSubject.value;
  }

  getDefaultPhrase(): string {
    return this.defaultPhrase;
  }
} 