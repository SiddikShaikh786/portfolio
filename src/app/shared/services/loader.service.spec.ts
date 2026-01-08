import { TestBed } from '@angular/core/testing';
import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderService],
    });
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit true when show is called', (done) => {
    service.isLoading.subscribe((value) => {
      expect(value).toBe(true);
      done();
    });
    service.show();
  });

  it('should emit false when hide is called', (done) => {
    service.isLoading.subscribe((value) => {
      expect(value).toBe(false);
      done();
    });
    service.hide();
  });

  it('should emit breadcrumbs when broadcastBreadCrumbs is called', (done) => {
    const testBreadCrumbs = { label: 'Home', url: '/' };
    service.breadCrumbs$.subscribe((value) => {
      expect(value).toEqual(testBreadCrumbs);
      done();
    });
    service.broadcastBreadCrumbs(testBreadCrumbs);
  });

  it('should return false when no HTTP requests are pending', () => {
    expect(service['isAnyHttpRequestPending']()).toBe(false);
  });

  it('should return true when there are pending HTTP requests', () => {
    service['inFlightHttpCalls'].push('test-url');
    expect(service['isAnyHttpRequestPending']()).toBe(true);
  });

  it('should add an HTTP request and show the loader', () => {
    spyOn(service, 'show').and.callThrough();
    service.serviceStarted('test-url');
    expect(service['inFlightHttpCalls']).toContain('test-url');
    expect(service.show).toHaveBeenCalled();
  });

  it('should not show the loader if there are already pending requests', () => {
    spyOn(service, 'show').and.callThrough();
    service['inFlightHttpCalls'].push('existing-url');
    service.serviceStarted('test-url');
    expect(service['inFlightHttpCalls']).toContain('test-url');
    expect(service.show).not.toHaveBeenCalled();
  });

  it('should remove an HTTP request and hide the loader if no requests are pending', () => {
    spyOn(service, 'hide').and.callThrough();
    service['inFlightHttpCalls'].push('test-url');
    service.serviceCompleted('test-url');
    expect(service['inFlightHttpCalls']).not.toContain('test-url');
    expect(service.hide).toHaveBeenCalled();
  });

  it('should not hide the loader if there are still pending requests', () => {
    spyOn(service, 'hide').and.callThrough();
    service['inFlightHttpCalls'].push('test-url1');
    service['inFlightHttpCalls'].push('test-url2');
    service.serviceCompleted('test-url1');
    expect(service['inFlightHttpCalls']).toContain('test-url2');
    expect(service.hide).not.toHaveBeenCalled();
  });
});
