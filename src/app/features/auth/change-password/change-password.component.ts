import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, input } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslocoDirective } from '@jsverse/transloco';
import { FieldErrorEmailComponent } from '../../../shared/components/form-validation/field-error-email/field-error-email.component';
import { FieldErrorRequiredComponent } from '../../../shared/components/form-validation/field-error-required/field-error-required.component';
import { AuthManagementService } from '../../../core/services/auth-management.service';
import { ResetPasswordRequestModel } from '../../../core/models/requests/password.request';
import { MessageService } from '../../../shared/services/message.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OpenLoginDirective } from '../../../shared/directives/open-login.directive';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    TranslocoDirective,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FieldErrorRequiredComponent,
    OpenLoginDirective,
    RouterLink
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePasswordComponent {
  token: string | null = null;
  email: string | null = null;

  private readonly authManagementService = inject(AuthManagementService)
  private readonly messageService = inject(MessageService)
  private readonly fb = inject(FormBuilder)
  private readonly route = inject(ActivatedRoute)
  private readonly cdr = inject(ChangeDetectorRef)

  showSuccess: boolean = false
  passwordFormControl = new FormControl('', { nonNullable: true, validators: [Validators.required]})
  confirmPasswordFormControl = new FormControl('', { nonNullable: true, validators: [Validators.required] })

  changeForm = this.fb.group({
    password: this.passwordFormControl,
    confirmPassword: this.confirmPasswordFormControl,
  }
  )

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((queryParams) => {
      this.token = queryParams.get('token');
      this.email = queryParams.get('email');
      console.log('Token:', this.token);
      console.log('Email:', this.email);
    });
  }

  onSave() {
    const formValues = this.changeForm.value

    if (!this.email || !this.token) {
      this.messageService.addWarningMessage('Faltan parámetros necesarios para restablecer la contraseña.');
      return;
    }

    if (formValues.password != formValues.confirmPassword) {
      this.messageService.addWarningMessage("Las contraseñas no coinciden")
      return
    }

    const resetRequest: ResetPasswordRequestModel = new ResetPasswordRequestModel()
    resetRequest.email = this.email;
    resetRequest.password = formValues.password?? "",
    resetRequest.password_confirmation = formValues.confirmPassword?? "",
    resetRequest.token = this.token
      

    this.authManagementService.resetPassword(resetRequest).subscribe({
      next: (response) => {
        this.showSuccess = response; // Manejo del resultado (true o false)
        this.cdr.markForCheck(); // Asegura que el cambio se refleje en la vista
      },
      error: (err) => {
        console.error('Error resetting password:', err);
      }
    });
    
  }
}
