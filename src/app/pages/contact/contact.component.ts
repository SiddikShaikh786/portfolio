import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  animations: [
    trigger('staggerFadeIn', [
      transition(':enter', [
        query('.animate-item', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    message: ''
  };

  phoneNumber = '917338095158';
  whatsappMessage = "Hi Siddik, I'm interested in working with you!";

  get whatsappUrl(): string {
    return `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(this.whatsappMessage)}`;
  }

  constructor(private notificationService: NotificationService) { }

  onSubmit() {
    console.log('Form Submitted', this.formData);
    // Add logic here to send the email or show a success message
    this.notificationService.showNotification('Submitted successfully, will get back to you!', 'success');
    this.formData = { name: '', email: '', message: '' };
  }
}
