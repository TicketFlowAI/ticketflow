import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TranslocoDirective } from '@jsverse/transloco';
import { ServiceModel } from '../../../../core/models/entities/service.model';

@Component({
  selector: 'app-service-info',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoDirective,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './service-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceInfoComponent {
  public readonly dialogRef = inject(MatDialogRef<ServiceInfoComponent>);
  readonly service = inject<ServiceModel>(MAT_DIALOG_DATA);

  onReturnClick(): void {
    this.dialogRef.close();
  }
}
