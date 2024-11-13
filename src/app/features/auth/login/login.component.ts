import {ChangeDetectionStrategy, Component, effect, inject, signal} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {TranslocoDirective} from "@jsverse/transloco";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import { AuthService } from '../../../core/services/auth.service';
import { LoginRequest } from '../../../core/models/requests/login.request';
import { UserManagementService } from '../../../core/services/user-management.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    TranslocoDirective,
    MatFormField,
    ReactiveFormsModule,
    MatError,
    MatLabel,
    MatInput,
    MatIcon,
    MatIconButton,
    MatButton,
    MatDialogContent,
    MatDialogActions,
    RouterLink
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  //SERVICES
  public readonly dialogRef = inject(MatDialogRef<LoginComponent>);
  private readonly authService = inject(AuthService);
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
      if(this.userManagementService.currentUser()) this.dialogRef.close();
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

  submitLoginForm(){
    const loginFormValue = this.loginFrom.value;
    const loginRequest = new LoginRequest();
    loginRequest.email = loginFormValue.email?? ''
    loginRequest.password = loginFormValue.password?? ''

    this.authService.login(loginRequest)
  }
}
