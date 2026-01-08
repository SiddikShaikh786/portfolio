import { Injectable } from '@angular/core';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private container: HTMLElement | null = null;

  private getContainer(): HTMLElement {
    if (!this.container) {
      this.container = document.createElement('div');
      Object.assign(this.container.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: '10000',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        pointerEvents: 'none' as const,
      });
      document.body.appendChild(this.container);
    }
    return this.container!;
  }

  showNotification(
    message: string,
    type: NotificationType = 'info',
    duration = 5000
  ): void {
    const container = this.getContainer();
    const color = this.getColor(type);

    const notification = document.createElement('div');
    Object.assign(notification.style, {
      background: 'white',
      color: '#1f2937',
      padding: '16px 20px',
      borderRadius: '12px',
      boxShadow:
        '0 10px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
      maxWidth: '420px',
      minWidth: '320px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      opacity: '0',
      transform: 'translateX(120%)',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      pointerEvents: 'all' as const,
      borderLeft: `6px solid ${color}`,
      fontWeight: '500',
    });

    notification.innerHTML = `
      ${this.getIcon(type, color)}
      <div style="flex: 1; font-size: 15px; line-height: 1.5;">${message}</div>
      <button type="button" style="
        background:none;
        border:none;
        font-size:28px;
        line-height:1;
        cursor:pointer;
        color:#94a3b8;
        width:32px;
        height:32px;
        border-radius:50%;
        display:flex;
        align-items:center;
        justify-content:center;
        margin-top:-8px;
      ">×</button>
    `;

    const closeBtn = notification.querySelector('button');
    closeBtn?.addEventListener('click', () => this.dismiss(notification));

    container.appendChild(notification);

    // Enter animation
    requestAnimationFrame(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(0)';
    });

    const timer = setTimeout(() => this.dismiss(notification), duration);

    // Click on notification (except close button) = dismiss early
    notification.addEventListener('click', (e) => {
      if (e.target === closeBtn) return;
      clearTimeout(timer);
      this.dismiss(notification);
    });
  }

  private dismiss(el: HTMLElement) {
    el.style.opacity = '0';
    el.style.transform = 'translateX(120%)';

    el.addEventListener(
      'transitionend',
      () => {
        el.remove();

        if (this.container && this.container.children.length === 0) {
          this.container.remove();
          this.container = null;
        }
      },
      { once: true }
    );
  }

  private getColor(type: NotificationType): string {
    const colors: Record<NotificationType, string> = {
      success: '#10b981', // your original green
      error: '#ef4444', // your original red
      info: '#3b82f6',
      warning: '#f59e0b',
    };
    return colors[type];
  }

  private getIcon(type: NotificationType, color: string): string {
    const icons: Record<NotificationType, string> = {
      success: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/></svg>`,

      error: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>`,

      info: `<svg width="24" height="24" viewBox="0 0 24 24" fill="${color}"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="8" r="1.5" fill="white"/><rect x="11" y="11" width="2" height="7" rx="1" fill="white"/></svg>`,

      warning: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5"><path d="M12 2L2 22h20L12 2z"/><circle cx="12" cy="16" r="1"/><path d="M12 9v5"/></svg>`,
    };

    return icons[type];
  }
}
