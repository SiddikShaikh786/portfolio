import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  animations: [
    trigger('staggerFadeIn', [
      transition(':enter', [
        query('.animate-item', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('50ms', [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class ProjectsComponent {
  keyProjects = [
    {
      title: 'HP – AI Chatbot & PPT Generator',
      description: 'Built a conversational interface enabling HP sales teams to generate client-specific proposal decks with PptxGenJS, LLM integration, and Vector DB.',
      tech: ['Angular', 'PptxGenJS', 'LLM', 'Vector DB'],
      icon: 'smart_toy',
      isCurrent: true
    },
    {
      title: 'CORE-GENAI Platform',
      description: 'Developed Angular dashboards for HR Bot, Data Processing, and Synthetic Data workflows with OCR pipelines and REST APIs for LLM data validation.',
      tech: ['Angular', 'OCR', 'REST APIs', 'Jasmine'],
      icon: 'psychology',
       isCurrent: true
    },
    {
      title: 'AIPO – AI-powered Operations',
      description: 'Built dashboards for chatbot insights, fraud scoring, and compliance monitoring with ML/AI models for risk prediction.',
      tech: ['Angular', 'ML/AI', 'Analytics', 'Compliance'],
      icon: 'security'
    },
    {
      title: 'Pathfinder',
      description: 'Designed ML benchmarking visualizations and analytics insights dashboards with IDP/KYC auto-extraction modules.',
      tech: ['Angular', 'ML', 'IDP/KYC', 'Analytics'],
      icon: 'trending_up'
    }
  ];

  pocs = [
    { title: 'HP RAG UI', description: 'Enables HP sales team to access up-to-date MJF knowledge through AI chatbot and automated PPT generation.', icon: 'auto_awesome', hasIndicator: true },
    { title: 'Smart RAG Dashboard', description: 'Conversational RAG platform for large documents with automatic answer evaluation and optimized retrieval selection.', icon: 'dashboard_customize', hasIndicator: true },
    { title: 'Centene IVR Automation', description: 'Automates call handling and responses using AI-driven IVR systems.', icon: 'forum' },
    { title: 'Amazon Health Scribe', description: 'Converts doctor–patient conversations into structured clinical documents using AI and AWS services.', icon: 'description' },
    { title: 'Contact Centre Dashboard', description: 'Real-time insights into customer interactions, call volumes, and agent performance.', icon: 'groups' },
    { title: 'Claim Review', description: 'Claim patients claims review system for healthcare compliance and audit analysis.', icon: 'security' },
    { title: 'IDP KYC', description: 'Automates document extraction and verification to streamline customer onboarding.', icon: 'description' },
    { title: 'Bot Gauge', description: 'Measures chatbot performance based on conversation quality and test cases.', icon: 'precision_manufacturing' },
    { title: 'Ground Truth Validation', description: 'Ensures AI response accuracy by comparing against verified answers.', icon: 'electric_bolt' },
    { title: 'Teams HR Bot', description: 'Microsoft Teams app handling employee HR queries efficiently.', icon: 'chat' },
    { title: 'Citibank Card Management', description: 'UI for tracking credit card requests and fraud alerts using ML-based APIs.', icon: 'credit_card' },
    { title: 'Paper Digitization', description: 'OCR-powered UI for digitizing, editing, and reviewing scanned forms.', icon: 'description' },
    { title: 'Prompt Versioning', description: 'Angular interface to compare and manage LLM prompts with real-time previews.', icon: 'psychology' },
    { title: 'Competitive Analysis', description: 'Evaluates products against market competitors to identify strengths and gaps.', icon: 'analytics' }
  ];

  capstoneProjects = [
    { title: 'Seafolly Diagnostic System', description: 'Analytical dashboard improving report interpretation accuracy by 30%.' },
    { title: 'Tesla Clone', description: '95% accurate UI simulation with optimized animations.' },
    { title: 'OTT Movie App', description: 'Full-stack app with search, playlists, and 10K+ record handling.' },
    { title: 'Healthcare Blockchain', description: 'Decentralized patient record flow with smart contract auditability.' }
  ];

  education = [
    {
      title: 'Bachelor of Engineering',
      specialization: 'Computer Science and Engineering',
      institution: 'Karavali Institute of Technology',
      period: '2018 – 2021',
      icon: 'school'
    },
    {
      title: 'Advanced Certification in DevOps',
      specialization: 'IIT Roorkee / Intellipaat',
      institution: 'Comprehensive DevOps training covering CI/CD, containerization, and cloud infrastructure',
      period: '2023 – 2024',
      icon: 'verified'
    }
  ];
}
