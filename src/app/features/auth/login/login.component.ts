import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef } from "@angular/material/dialog";
import { TranslocoDirective } from "@jsverse/transloco";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatInput } from "@angular/material/input";
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";
import { Router, RouterLink } from "@angular/router";
import { AuthManagementService } from '../../../core/services/auth-management.service';
import { LoginRequest } from '../../../core/models/requests/login.request';
import { UserManagementService } from '../../../core/services/user-management.service';
import { DialogSpinnerComponent } from '../../../shared/components/dialog-spinner/dialog-spinner.component';
import { FieldErrorEmailComponent } from '../../../shared/components/form-validation/field-error-email/field-error-email.component';
import { FieldErrorRequiredComponent } from '../../../shared/components/form-validation/field-error-required/field-error-required.component';
import { UserRoles } from '../../../core/models/entities/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    TranslocoDirective,
    MatFormField,
    ReactiveFormsModule,
    MatLabel,
    MatInput,
    MatIcon,
    MatIconButton,
    MatDialogContent,
    MatDialogActions,
    RouterLink,
    DialogSpinnerComponent,
    FieldErrorEmailComponent,
    FieldErrorRequiredComponent
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  //SERVICES
  public readonly dialogRef = inject(MatDialogRef<LoginComponent>);
  public readonly router = inject(Router);
  private readonly authManagementService = inject(AuthManagementService);
  private readonly userManagementService = inject(UserManagementService);
  private readonly fb = inject(FormBuilder)

  //PROPS N VARS
  emailFormControl = new FormControl('', [Validators.required, Validators.email])
  passwordFormControl = new FormControl('', [Validators.required])
  loginFrom = this.fb.group({
    email: this.emailFormControl,
    password: this.passwordFormControl
  })

  hide = signal(true);

  //CONSTRUCTOR
  constructor() {
    effect(() => {
      if (this.userManagementService.currentUser()) this.dialogRef.close();
    })
  }

  //METHODS
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submitLoginForm() {
    if (this.loginFrom.valid) {
      const loginFormValue = this.loginFrom.value;
      const loginRequest = new LoginRequest();
      loginRequest.email = loginFormValue.email ?? '';
      loginRequest.password = loginFormValue.password ?? '';

      this.authManagementService.login(loginRequest).subscribe({
        next: (response) => {
          if (response) {
            //Comentar esto para quitar el 2FA
            this.userManagementService.getMyUser().subscribe({
              next: (user) => {
                this.userManagementService.currentUser.set(user);
                this.router.navigateByUrl('/');
              }
            });

            //Descomentar Todo esto
            /*
            if (response.two_factor) {
              this.router.navigateByUrl('/2fa-authenticate');
            } else {
              this.userManagementService.getMyUser().subscribe({
                next: (user) => {
                  if (user) {
                    if (user.role === UserRoles.Client) {
                      this.userManagementService.currentUser.set(user);
                      this.router.navigateByUrl('/');
                    }
                    else {
                      this.router.navigateByUrl('/2fa-setup');
                    }
                  }
                }
              });
            }
            */
            this.dialogRef.close();

          }
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
