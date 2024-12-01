import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';
import { ISpinnerState } from '../../../core/models/shared/spinner-state.model';

@Component({
  selector: 'app-global-spinner',
  standalone: true,
  templateUrl: './global-spinner.component.html',
  styleUrl: './global-spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalSpinnerComponent {
  private spinnerService = inject(SpinnerService)
  private cdr = inject(ChangeDetectorRef)

  spinnerState: ISpinnerState = {
    show: false,
    fullscreen: true,
    color: '#FF4438',
    size: 50,
    thickness: 8,
    hasBackdrop: true,
  };
  
  ngOnInit(): void {
    this.spinnerService.globalSpinnerState$.subscribe((state) => {
        this.spinnerState = state;
        this.cdr.markForCheck();
    });
  }
}
