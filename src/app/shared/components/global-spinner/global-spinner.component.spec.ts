import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSpinnerComponent } from './global-spinner.component';
import { SpinnerService } from '../../services/spinner.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('GlobalSpinnerComponent', () => {
  let component: GlobalSpinnerComponent;
  let fixture: ComponentFixture<GlobalSpinnerComponent>;
  let spinnerServiceMock: jasmine.SpyObj<SpinnerService>;

  beforeEach(async () => {
    spinnerServiceMock = jasmine.createSpyObj('SpinnerService', ['globalSpinnerState$']);
    spinnerServiceMock.globalSpinnerState$ = of({
      show: true,
      fullscreen: true,
      color: '#FF4438',
      size: 50,
      thickness: 10,
      hasBackdrop: true,
    });

    await TestBed.configureTestingModule({
      imports: [GlobalSpinnerComponent],
      providers: [
        { provide: SpinnerService, useValue: spinnerServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GlobalSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render spinner when spinnerState.show is true', () => {
    fixture.detectChanges();
    const spinnerContainer = fixture.debugElement.query(By.css('.spinner-container'));
    expect(spinnerContainer).toBeTruthy();
    expect(spinnerContainer.classes['fullscreen']).toBeTrue();
  });

  it('should not render spinner when spinnerState.show is false', () => {
    spinnerServiceMock.dialogSpinnerState$ = of({
      show: false,
      fullscreen: true,
      color: '#FF4438',
      size: 50,
      thickness: 10,
      hasBackdrop: true,
    });
  
    fixture.detectChanges();
  
    const spinnerContainer = fixture.debugElement.query(By.css('.spinner-container'));
    expect(spinnerContainer).toBeTruthy(); // El contenedor existe
    expect(spinnerContainer.nativeElement.style.display).toBe('');
  });  

  it('should render backdrop if spinnerState.hasBackdrop is true', () => {
    fixture.detectChanges();
    const backdrop = fixture.debugElement.query(By.css('.backdrop'));
    expect(backdrop).toBeTruthy();
  });

  it('should apply styles based on spinnerState', () => {
    spinnerServiceMock.dialogSpinnerState$ = of({
      show: true,
      fullscreen: true,
      color: '#FF4438',
      size: 50,
      thickness: 10,
      hasBackdrop: true,
    });
  
    fixture.detectChanges();
  
    const spinner = fixture.debugElement.query(By.css('.spinner'));
    expect(spinner).toBeTruthy();
    expect(spinner.styles['width']).toBe('50px');
    expect(spinner.styles['height']).toBe('50px');
  
    const computedColor = window.getComputedStyle(spinner.nativeElement).borderTopColor;
    expect(computedColor).toBe('rgb(255, 68, 56)'); // Comparar con RGB
    expect(spinner.styles['borderWidth']).toBe('10px');
  });
});
