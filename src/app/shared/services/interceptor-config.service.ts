import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InterceptorConfigService implements InterceptorConfig {
  maxRetries: number = 3;
  retryDelay: number = 1000;
  retryStatusCodes: number[] = [500, 502, 503, 504];
  headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
  };
}

export interface InterceptorConfig {
  maxRetries: number;
  retryDelay: number;
  retryStatusCodes: number[];
  headers?: { [key: string]: string };
}
