import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {TranslocoDirective} from "@jsverse/transloco";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

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
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private dialogRef = inject(MatDialogRef<LoginComponent>);
  private fb = inject(FormBuilder)

  hide = signal(true);

  emailFormControl = new FormControl('', [Validators.required, Validators.email])
  passwordFormControl = new FormControl('', [Validators.required])

  loginFrom = this.fb.group({
    email: this.emailFormControl,
    password: this.passwordFormControl
  })

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submitLoginForm(){

  }
}
