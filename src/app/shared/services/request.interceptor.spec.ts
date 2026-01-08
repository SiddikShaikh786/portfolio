import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RequestInterceptor } from './request.interceptor';
import { LoaderService } from './loader.service';
import { InterceptorConfigService } from './interceptor-config.service';

describe('RequestInterceptor', () => {
  let interceptor: RequestInterceptor;
  let loaderService: LoaderService;
  let configService: InterceptorConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RequestInterceptor,
        LoaderService,
        { provide: 'InterceptorConfig', useValue: { maxRetries: 3, retryDelay: 1000, retryStatusCodes: [500] } },
        InterceptorConfigService,
      ],
    });

    interceptor = TestBed.inject(RequestInterceptor);
    loaderService = TestBed.inject(LoaderService);
    configService = TestBed.inject(InterceptorConfigService);
  });

  it('should create an instance', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should show loader when intercepting request', () => {
    spyOn(loaderService, 'show');
    const request = new HttpRequest('GET', 'https://example.com');
    interceptor.intercept(request, {} as HttpHandler);
    expect(loaderService.show).toHaveBeenCalled();
  });

  it('should hide loader when request completes with an error', fakeAsync(() => {
    spyOn(loaderService, 'hide');
    const request = new HttpRequest('GET', 'https://example.com');
    const handler: HttpHandler = {
      handle: () => throwError(new HttpErrorResponse({})),
    };
    interceptor
      .intercept(request, handler)
      .pipe(catchError(() => of(undefined)))
      .subscribe(() => {
        expect(loaderService.hide).toHaveBeenCalled();
      });
    tick(); // Complete asynchronous operations
  }));

  it('should handle error in interceptor try-catch block', fakeAsync(() => {
    spyOn(console, 'error');
    const request = new HttpRequest('GET', 'https://example.com');
    const handler: HttpHandler = {
      handle: () => {
        throw new Error('Interceptor error');
      },
    };
    interceptor
      .intercept(request, handler)
      .pipe(
        catchError((error: Error) => {
          expect(console.error).toHaveBeenCalledWith('An error occurred in the interceptor:', error);
          return of(undefined);
        })
      )
      .subscribe();
    tick();
  }));

  it('should set headers when config headers are provided', () => {
    const request = new HttpRequest('GET', 'https://example.com');
    configService.headers = { 'Custom-Header': 'TestValue' };
    const result = (interceptor as any).setHeaders(request);
    expect(result).not.toBeNull();
    expect(result.headers.get('Custom-Header')).toBe('TestValue');
    expect(result.headers.get('Content-Type')).toBe('application/json');
  });
});
