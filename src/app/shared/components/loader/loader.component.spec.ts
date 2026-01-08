import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderComponent } from './loader.component';
import { of, Subject } from 'rxjs';
import { LoaderService } from '../../services/loader.service';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let isLoadingSubject: Subject<boolean>;
  let loaderServiceMock: any;

  beforeEach(() => {
    isLoadingSubject = new Subject<boolean>(); // Create a Subject to mock isLoading observable

    loaderServiceMock = {
      isLoading: isLoadingSubject.asObservable()
    };

    TestBed.configureTestingModule({
      imports: [LoaderComponent],
      providers: [{ provide: LoaderService, useValue: loaderServiceMock }]
    });

    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have isLoading as false by default', () => {
    isLoadingSubject.next(false); // Set the observable value to false
    fixture.detectChanges();
    expect(component.isLoading).toBeFalse();
  });

  it('should update isLoading based on LoaderService', () => {
    isLoadingSubject.next(true); // Set the observable value to true
    fixture.detectChanges();
    expect(component.isLoading).toBeTrue();
  });
});
