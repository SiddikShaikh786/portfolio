import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
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
export class SkillsComponent {
  skillCategories = [
    {
      name: 'Frontend',
      skills: ['Angular', 'TypeScript', 'JavaScript (ES6+)', 'RxJS', 'NgRx', 'Angular Material', 'Tailwind CSS', 'SCSS', 'Bootstrap', 'PrimeNG']
    },
    {
      name: 'Backend',
      skills: ['Node.js', 'Express.js', 'Middleware', 'Routes & Controllers', 'JWT Auth', 'RESTful APIs']
    },
    {
      name: 'Database',
      skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'Oracle']
    },
    {
      name: 'Testing',
      skills: ['Jasmine', 'Karma', 'Unit Testing']
    },
    {
      name: 'CI/CD & Cloud',
      skills: ['AWS (EC2, S3, Lambda, CloudWatch)', 'Azure AD Auth', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform']
    },
    {
      name: 'Other',
      skills: ['Highcharts', 'AG-Grid', 'ML/LLM Integration', 'Git', 'Agile', 'PptxGenJS']
    }
  ];
}
