import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TranslocoDirective } from '@jsverse/transloco';
import { CompanyModel } from '../../../core/models/entities/company.model';

@Component({
  selector: 'app-company-info',
  standalone: true,
  imports: [
    TranslocoDirective,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './company-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyInfoComponent {
  private readonly dialogRef = inject(MatDialogRef<CompanyInfoComponent>);
  public readonly company = inject<CompanyModel>(MAT_DIALOG_DATA);

  onReturnClick(): void {
    this.dialogRef.close();
  }
}
