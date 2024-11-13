import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TranslocoDirective } from '@jsverse/transloco';
import { ServiceContractModel } from '../../../../core/models/entities/service-contract.model';

@Component({
  selector: 'app-service-contract-info',
  standalone: true,
  imports: [
    TranslocoDirective,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './service-contract-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceContractInfoComponent {
  public readonly dialogRef = inject(MatDialogRef<ServiceContractInfoComponent>);
  public readonly serviceContract = inject<ServiceContractModel>(MAT_DIALOG_DATA);

  onReturnClick(): void {
    this.dialogRef.close();
  }
}
