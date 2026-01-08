import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
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
export class AboutComponent {
  stats = [
    { icon: 'business_center', value: '3.8+', label: 'Years Experience' },
    { icon: 'code', value: '15+', label: 'Projects Delivered' },
    { icon: 'verified', value: '85-90%', label: 'Code Coverage' },
    { icon: 'school', value: 'IIT', label: 'DevOps Certified' }
  ];
}
