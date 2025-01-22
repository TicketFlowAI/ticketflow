import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslocoDirective } from '@jsverse/transloco';
import { FieldErrorEmailComponent } from '../../../shared/components/form-validation/field-error-email/field-error-email.component';
import { FieldErrorRequiredComponent } from '../../../shared/components/form-validation/field-error-required/field-error-required.component';
import { AuthManagementService } from '../../../core/services/auth-management.service';

@Component({
  selector: 'app-change-password-request',
  standalone: true,
  imports: [
    TranslocoDirective,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FieldErrorRequiredComponent,
    FieldErrorEmailComponent
  ],
  templateUrl: './change-password-request.component.html',
  styleUrl: './change-password-request.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePasswordRequestComponent {
  private authManagementService = inject(AuthManagementService)
  private cdr = inject(ChangeDetectorRef)
  private readonly fb = inject(FormBuilder)

  emailFormControl = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] })

  showSuccess: boolean = false;
  changePasswordRequestForm = this.fb.group({
    email: this.emailFormControl,
  }
  )


  sendEmail( ){
    const form = this.changePasswordRequestForm.value
    this.authManagementService.requestPasswordReset(form.email?? '').subscribe({
      next: (response) => {
        this.showSuccess = response
        this.cdr.markForCheck()
      }
    })
  }
}
