import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISpinnerState } from '../../core/models/shared/spinner-state.model';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private globalSpinnerState = new BehaviorSubject<ISpinnerState>({
    show: false,
    fullscreen: true,
    color: '#FF4438',
    size: 100,
    thickness: 4,
    hasBackdrop: true,
  });

  private dialogSpinnerState = new BehaviorSubject<ISpinnerState>({
    show: false,
    fullscreen: true,
    color: '#FF4438',
    size: 100,
    thickness: 4,
    hasBackdrop: true,
  });

  globalSpinnerState$ = this.globalSpinnerState.asObservable();
  dialogSpinnerState$ = this.dialogSpinnerState.asObservable();

  showGlobalSpinner(config: Partial<{ fullscreen: boolean; color: string; size: number; thickness: number; hasBackdrop: boolean; }>): void {
    this.globalSpinnerState.next({ ...this.globalSpinnerState.value, ...config, show: true });
  }

  hideGlobalSpinner(context: 'global' | 'dialog' = 'global'): void {
    this.globalSpinnerState.next({ ...this.globalSpinnerState.value, show: false });
  }

  showDialogSpinner(config: Partial<{ fullscreen: boolean; color: string; size: number; thickness: number; hasBackdrop: boolean; }>): void {
    this.dialogSpinnerState.next({ ...this.dialogSpinnerState.value, ...config, show: true });
  }

  hideDialogSpinner(context: 'global' | 'dialog' = 'global'): void {
    this.dialogSpinnerState.next({ ...this.dialogSpinnerState.value, show: false });
  }
}
