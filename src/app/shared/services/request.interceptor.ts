import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { InterceptorConfigService } from './interceptor-config.service';
import { LoaderService } from './loader.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(
    private config: InterceptorConfigService,
    private loaderService: LoaderService 
  ) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    try {
      const skipLoader =
      //   request.url.includes('/api/chatbot') ||
      //   request.url.includes('/download-image?fileName'); 
      // if (!skipLoader) {
      //   this.loaderService.show();
      // }
      this.loaderService.show();
      const modifiedRequest = this.setHeaders(request);
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // Server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
          console.error(errorMessage);
          return throwError(() => new Error(errorMessage));
        }),
        finalize(() => {
        //  if (!skipLoader) {
        // } // Hide loader when request completes
        this.loaderService.hide(); // Hide loader only if it was shown
        })
      );
    } catch (error) {
      console.error('An error occurred in the interceptor:', error);
      return throwError(() => error);
    }
  }

  private setHeaders(request: HttpRequest<any>): HttpRequest<any> | null {
    if (this.config.headers) {
      let headers = request.headers.set('Content-Type', 'application/json');
      for (const [key, value] of Object.entries(this.config.headers)) {
        headers = headers.set(key, value); // Update headers iteratively
      }
      return request.clone({ headers });
    }
    return null;
  }
}

export interface InterceptorConfig {
  maxRetries: number;
  retryDelay: number;
  retryStatusCodes: number[];
  headers?: { [key: string]: string };
}
