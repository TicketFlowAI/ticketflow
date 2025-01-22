import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoDirective } from '@jsverse/transloco';
import { FieldErrorRequiredComponent } from '../../../shared/components/form-validation/field-error-required/field-error-required.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AuthManagementService } from '../../../core/services/auth-management.service';
import { GlobalSpinnerComponent } from '../../../shared/components/global-spinner/global-spinner.component';

@Component({
  selector: 'app-two-fa-set-up',
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
    GlobalSpinnerComponent
  ],
  templateUrl: './two-fa-set-up.component.html',
  styleUrl: './two-fa-set-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TwoFaSetUpComponent {
  private readonly authManagementService = inject(AuthManagementService);
  private readonly fb = inject(FormBuilder);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly cdr = inject(ChangeDetectorRef);

  isPasswordStep = true; // Controla la etapa de confirmación de contraseña
  isCodeStep = false; // Controla si estamos en la etapa de verificación
  qrCodeSvg: SafeHtml = ''; // Contenido SVG del código QR
  passwordForm: FormGroup;
  verificationForm: FormGroup;
  recoveryCodes: string[] = []
  constructor() {
    this.passwordForm = this.fb.group({
      password: new FormControl('', [Validators.required]),
    });
    this.verificationForm = this.fb.group({
      code: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
      ]),
    });
  }

  getPasswordFormControl() {
    return this.passwordForm.get('password') as FormControl;
  }

  getCodeFormControl() {
    return this.verificationForm.get('code') as FormControl;
  }

  confirmPassword() {
    if (this.passwordForm.valid) {
      const password = this.getPasswordFormControl().value;
      this.authManagementService.confirmPassword(password).subscribe({
        next: (response) => {
          if(response) {
            this.isPasswordStep = false; // Cambia a la etapa del QR
            this.isCodeStep = false; // Asegúrate de que no esté en la etapa de código
            this.loadQrCode();
            this.loadRecoveryCodes()
          }
          
        },
        error: () => {
          // Manejo de error (agregar mensajes si es necesario)
        },
      });
    }
  }

  loadQrCode() {
    this.authManagementService.getTwoFactorQrCode().subscribe({
      next: (response) => {
        this.qrCodeSvg = this.sanitizer.bypassSecurityTrustHtml(response?.svg ?? '');
        this.cdr.markForCheck(); // Fuerza la detección de cambios
      },
      error: () => {
        // Manejo de errores si es necesario
      },
    });
  }

  loadRecoveryCodes() {
    this.authManagementService.getRecoveryCodes().subscribe({
      next: (response) => {
        this.recoveryCodes = response
        this.cdr.markForCheck(); // Fuerza la detección de cambios
      },
      error: () => {
        // Manejo de errores si es necesario
      },
    });
  }

  goToCodeStep() {
    this.isCodeStep = true; // Cambia a la etapa de ingreso de código
  }

  goToQrStep() {
    this.isCodeStep = false; // Regresa al paso del QR
  }

  verifyCode() {
    if (this.verificationForm.valid) {
      const code = this.getCodeFormControl().value;
      this.authManagementService.confirmTwoFactorAuth(code);
    }
  }
}
