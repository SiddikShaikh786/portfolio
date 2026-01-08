import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let createElementSpy: jasmine.Spy;
  let appendChildSpy: jasmine.Spy;
  let removeChildSpy: jasmine.Spy;
  let mockNotification: HTMLElement;

  beforeEach(() => {
    jasmine.clock().install();
    const messageDiv = document.createElement('div');
    mockNotification = document.createElement('div');
    mockNotification.appendChild(messageDiv);
    createElementSpy = spyOn(document, 'createElement').and.callFake(
      (tag: string) => {
        if (tag === 'div') {
          return mockNotification.cloneNode(true) as HTMLElement;
        }
        return document.createElement(tag);
      }
    );

    // Spy on document.body methods (real DOM, but tracked)
    appendChildSpy = spyOn(document.body, 'appendChild').and.callThrough();
    removeChildSpy = spyOn(document.body, 'removeChild').and.callThrough();

    TestBed.configureTestingModule({
      providers: [NotificationService],
    });
    service = TestBed.inject(NotificationService);
  });

  afterEach(() => {
    jasmine.clock().uninstall();
    document.body.innerHTML = '';
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create notification with correct class and message', () => {
    const message = 'Test message';
    service.showNotification(message, 'success');

    expect(createElementSpy).toHaveBeenCalledTimes(2);
    expect(createElementSpy).toHaveBeenCalledWith('div');

    const notification = appendChildSpy.calls.mostRecent()
      .args[0] as HTMLElement;
    expect(notification.className).toBe('notification notification-success');
    expect(notification.textContent).toContain(message);
  });

  it('should apply correct inline styles for success', () => {
    service.showNotification('Saved', 'success');
    const el = appendChildSpy.calls.mostRecent().args[0] as HTMLElement;

    const s = el.style;
    expect(s.position).toBe('fixed');
    expect(s.top).toBe('20px');
    expect(s.right).toBe('20px');
    expect(s.padding).toBe('16px 24px');
    expect(s.borderRadius).toBe('8px');
    expect(s.color).toBe('white');
    expect(s.fontWeight).toBe('500');
    expect(s.zIndex).toBe('10000');
    expect(s.maxWidth).toBe('400px');
    expect(s.boxShadow).toBe('rgba(0, 0, 0, 0.3) 0px 4px 12px');
    expect(s.transition).toBe('0.3s');
    expect(s.backgroundColor).toBe('rgb(16, 185, 129)');
    expect(s.fontSize).toBe('16px');
    expect(s.lineHeight).toBe('1.4');
  });

  it('should use error color for error type', () => {
    service.showNotification('Failed', 'error');
    const el = appendChildSpy.calls.mostRecent().args[0] as HTMLElement;
    expect(el.style.backgroundColor).toBe('rgb(239, 68, 68)');
  });

  it('should append notification to document.body', () => {
    service.showNotification('Test', 'success');
    expect(appendChildSpy).toHaveBeenCalledWith(jasmine.any(HTMLElement));
  });

  it('should fade out after 5s and remove after 300ms transition', () => {
    service.showNotification('Auto remove', 'success');
    const notification = appendChildSpy.calls.mostRecent()
      .args[0] as HTMLElement;
    jasmine.clock().tick(5000);
    expect(notification.style.opacity).toBe('0');
    expect(notification.style.transform).toBe('translateX(100%)');
    jasmine.clock().tick(300);
    expect(removeChildSpy).toHaveBeenCalledWith(notification);
  });

  it('should safely skip removal if parentNode is null', () => {
    service.showNotification('Edge case', 'error');
    const notification = appendChildSpy.calls.mostRecent()
      .args[0] as HTMLElement;
    notification.parentNode?.removeChild(notification);
    jasmine.clock().tick(5000);
    jasmine.clock().tick(300);
    expect(removeChildSpy).toHaveBeenCalledTimes(1);
  });
});
