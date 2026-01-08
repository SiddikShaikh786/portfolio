import { Component } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { RouterModule,} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  animations: [
    trigger('staggerFadeIn', [
      transition(':enter', [
        query('.animate-item', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('100ms', [
            animate('600ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class DashboardComponent {
  phoneNumber = '917338095158';
  message = "Hi Siddik, I'm interested in working with you!";

  // Career started March 2022
  private startDate = new Date(2022, 2, 1); // Months are 0-indexed, 2 = March

  get experienceCount(): string {
    const today = new Date();
    let years = today.getFullYear() - this.startDate.getFullYear();
    let months = today.getMonth() - this.startDate.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    return `${years}.${months}`;
  }

  get whatsappUrl(): string {
    return `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(this.message)}`;
  }
}
