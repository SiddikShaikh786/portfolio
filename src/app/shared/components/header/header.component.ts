import { Component, HostListener, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterModule,
  RouterLink,
  RouterLinkActive,
  Router,
} from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

interface NavItem {
  label: string;
  path: string;
  icon?: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('slideDown', [
      state(
        'void',
        style({
          opacity: 0,
          transform: 'translateY(-100%)',
        })
      ),
      state(
        '*',
        style({
          opacity: 1,
          transform: 'translateY(0)',
        })
      ),
      transition('void => *', animate('600ms cubic-bezier(0.35, 0, 0.25, 1)')),
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate(
          '400ms 200ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
    trigger('slideInFromLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('250ms ease-in', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('200ms ease-in', style({ opacity: 0 }))]),
    ]),
    trigger('staggerMenu', [
      transition('* => *', [
        style({ opacity: 0, transform: 'translateX(20px)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
    ]),
  ],
})
export class HeaderComponent {
  isDarkMode = signal(false);
  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  activeSection = signal('home');

  navItems: NavItem[] = [
    { label: 'Home', path: '/home', icon: 'home' },
    { label: 'About', path: '/about', icon: 'person' },
    { label: 'Skills', path: '/skills', icon: 'psychology' },
    { label: 'Experience', path: '/experience', icon: 'work' },
    { label: 'Projects', path: '/projects', icon: 'terminal' },
    { label: 'Contact', path: '/contact', icon: 'alternate_email' },
  ];

  constructor(private router: Router) {
    // Initialize theme from localStorage or system preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;

      if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        this.isDarkMode.set(true);
        document.documentElement.classList.add('dark');
      }
    }

    // Apply theme changes
    effect(() => {
      if (typeof document !== 'undefined') {
        if (this.isDarkMode()) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        }
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (typeof window !== 'undefined') {
      this.isScrolled.set(window.pageYOffset > 20);
    }
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    // Close mobile menu on desktop resize
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      this.closeMobileMenu();
    }
  }

  toggleTheme() {
    this.isDarkMode.update((value) => !value);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update((value) => !value);

    // Prevent body scroll when menu is open
    if (typeof document !== 'undefined') {
      if (this.isMobileMenuOpen()) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  onNavItemClick(item: NavItem) {
    this.closeMobileMenu();
    this.router.navigate([item.path]);
  }

  scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
