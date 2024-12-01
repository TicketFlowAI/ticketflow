import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { ISpinnerState } from '../../../core/models/shared/spinner-state.model';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-dialog-spinner',
  standalone: true,
  templateUrl: './dialog-spinner.component.html',
  styleUrl: './dialog-spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogSpinnerComponent {
  private spinnerService = inject(SpinnerService)
  private cdr = inject(ChangeDetectorRef)

  spinnerState: ISpinnerState = {
    show: false,
    fullscreen: true,
    color: '#FF4438',
    size: 50,
    thickness: 10,
    hasBackdrop: true,
  };
  
  ngOnInit(): void {
    this.spinnerService.dialogSpinnerState$.subscribe((state) => {
        this.spinnerState = state;
        this.cdr.markForCheck();
    });
  }
}
