import { TestBed } from '@angular/core/testing';
import { SpinnerService } from './spinner.service';
import { ISpinnerState } from '../../core/models/shared/spinner-state.model';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default global spinner state', (done) => {
    service.globalSpinnerState$.subscribe((state: ISpinnerState) => {
      expect(state).toEqual({
        show: false,
        fullscreen: true,
        color: '#FF4438',
        size: 100,
        thickness: 4,
        hasBackdrop: true,
      });
      done();
    });
  });

  it('should have default dialog spinner state', (done) => {
    service.dialogSpinnerState$.subscribe((state: ISpinnerState) => {
      expect(state).toEqual({
        show: false,
        fullscreen: true,
        color: '#FF4438',
        size: 100,
        thickness: 4,
        hasBackdrop: true,
      });
      done();
    });
  });

  it('should show global spinner with custom configuration', (done) => {
    const customConfig = { color: '#000000', size: 150 };
    service.showGlobalSpinner(customConfig);

    service.globalSpinnerState$.subscribe((state: ISpinnerState) => {
      expect(state).toEqual({
        show: true,
        fullscreen: true,
        color: '#000000',
        size: 150,
        thickness: 4,
        hasBackdrop: true,
      });
      done();
    });
  });

  it('should hide global spinner', (done) => {
    service.hideGlobalSpinner();

    service.globalSpinnerState$.subscribe((state: ISpinnerState) => {
      expect(state.show).toBe(false);
      done();
    });
  });

  it('should show dialog spinner with custom configuration', (done) => {
    const customConfig = { color: '#123456', hasBackdrop: false };
    service.showDialogSpinner(customConfig);

    service.dialogSpinnerState$.subscribe((state: ISpinnerState) => {
      expect(state).toEqual({
        show: true,
        fullscreen: true,
        color: '#123456',
        size: 100,
        thickness: 4,
        hasBackdrop: false,
      });
      done();
    });
  });

  it('should hide dialog spinner', (done) => {
    service.hideDialogSpinner();

    service.dialogSpinnerState$.subscribe((state: ISpinnerState) => {
      expect(state.show).toBe(false);
      done();
    });
  });
});
