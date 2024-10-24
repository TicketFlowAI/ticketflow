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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-company-info',
  standalone: true,
  imports: [
    TranslocoDirective,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './company-info.component.html',
  styleUrl: './company-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyInfoComponent {
  readonly dialogRef = inject(MatDialogRef<CompanyInfoComponent>);
  readonly company = inject<CompanyModel>(MAT_DIALOG_DATA);

  onReturnClick(): void {
    this.dialogRef.close();
  }
}
