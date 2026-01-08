import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)},
    {path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)},
    {path: 'projects', loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent)},
    {path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)},
    {path: 'skills', loadComponent: () => import('./pages/skills/skills.component').then(m => m.SkillsComponent)},
    {path: 'experience', loadComponent: () => import('./pages/experience/experience.component').then(m => m.ExperienceComponent)},
    {path: '**', redirectTo: 'home'}
];
