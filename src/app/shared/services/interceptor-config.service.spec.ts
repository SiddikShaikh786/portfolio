import { TestBed } from '@angular/core/testing';
import { InterceptorConfigService } from './interceptor-config.service';

describe('InterceptorConfigService', () => {
  let service: InterceptorConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterceptorConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
