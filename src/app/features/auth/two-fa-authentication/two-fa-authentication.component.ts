import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoDirective } from '@jsverse/transloco';
import { FieldErrorRequiredComponent } from '../../../shared/components/form-validation/field-error-required/field-error-required.component';
import { AuthManagementService } from '../../../core/services/auth-management.service';

@Component({
  selector: 'app-two-fa-authentication',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoDirective,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
    FieldErrorRequiredComponent,
  ],
  templateUrl: './two-fa-authentication.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TwoFaAuthenticationComponent {
  private readonly authManagementService = inject(AuthManagementService);

  codeFormControl = new FormControl('', { nonNullable: true, validators: [Validators.minLength(6), Validators.required] })

  factorForm = new FormGroup({
    codeValue: this.codeFormControl
  })

  validate() {
    const values = this.factorForm.value

    if (values.codeValue) {
      this.authManagementService.twoFactorChallenge(values.codeValue)
    }
  }
}
