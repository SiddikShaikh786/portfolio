import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { RequestInterceptor } from './shared/services/request.interceptor';
import { LoaderService } from './shared/services/loader.service';
import { InterceptorConfigService } from './shared/services/interceptor-config.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    LoaderService,
    InterceptorConfigService,
  ]
};
