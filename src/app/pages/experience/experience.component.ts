import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
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
export class ExperienceComponent {
  experiences = [
    {
      role: 'Senior Associate Engineer',
      company: 'Ascendion (AEPL)',
      location: 'Bengaluru',
      period: 'May 2023 – Present',
      description: [
        'Designed and enhanced enterprise Angular applications with improved UI/UX, responsive layouts, and optimized performance using Tailwind CSS',
        'Integrated 100% of REST API endpoints for AI-driven services such as Conversation AI, HR Chatbot, and Data Preprocessing systems',
        'Implemented modules for Paper Digitization, OCR Pipelines, LLM Validation, and Synthetic Data Generation',
        'Refactored legacy Angular modules, reducing technical debt by 50%',
        'Increased code coverage to 85–90% through systematic unit tests using Jasmine & Karma',
        'Collaborated cross-functionally with AI, Backend, and Cloud teams'
      ]
    },
    {
      role: 'Associate Software Engineer',
      company: 'Testyantra Software Solutions',
      location: 'Bengaluru',
      period: 'Mar 2022 – Apr 2023',
      description: [
        'Developed responsive dashboards for financial and compliance applications using Angular, Material, and Highcharts',
        'Implemented PoCs for LLM-based prompt workflows, document digitization, and AI-driven validation tools',
        'Improved overall app performance by optimizing change detection cycles and implementing lazy loading',
        'Participated in peer reviews and wrote unit tests to ensure maintainable code quality'
      ]
    },
    {
      role: 'Intern – MEAN Stack Development',
      company: 'Testyantra Software Solutions',
      location: 'Bengaluru',
      period: 'Dec 2021 – Mar 2022',
      description: [
        'Developed Angular UI components and integrated ML services for dashboards and analytics visualization',
        'Worked on Node.js APIs, authentication modules, and database operations'
      ]
    }
  ];
}
