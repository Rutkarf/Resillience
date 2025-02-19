import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-gestion-account',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatCardModule
  ],
  templateUrl: './gestion-account.component.html',
  styleUrls: ['./gestion-account.component.css']
})
export class GestionAccountComponent {
  accounts = [
    { type: 'EUR', balance: 1000, lastModified: new Date(), address: 'FR76XXXXXXXXXXXXXXX' },
    { type: 'BTC', balance: 0.5, lastModified: new Date(), address: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2' },
  ];

  transactions = [
    { type: 'EUR', amount: 500, date: new Date(), counterparty: 'John Doe', address: 'FR76XXXXXXXXXXXXXXX' },
    { type: 'BTC', amount: 0.1, date: new Date(), counterparty: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2', address: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy' },
  ];

  totalBalance = 10000; // Example value

  accountColumns = ['type', 'balance', 'lastModified', 'address'];
  transactionColumns = ['type', 'amount', 'date', 'counterparty', 'address'];
}