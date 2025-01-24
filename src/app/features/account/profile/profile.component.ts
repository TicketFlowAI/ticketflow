import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserModel } from '../../../core/models/entities/user.model';
import { UserManagementService } from '../../../core/services/user-management.service';
import { TranslocoDirective } from '@jsverse/transloco';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MessageService } from '../../../shared/services/message.service';
import { FieldErrorRequiredComponent } from "../../../shared/components/form-validation/field-error-required/field-error-required.component";
import { FieldErrorEmailComponent } from "../../../shared/components/form-validation/field-error-email/field-error-email.component";

@Component({
  selector: 'app-profile',
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
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  //SERVICES
  private readonly userManagementService = inject(UserManagementService)
  private readonly messageService = inject(MessageService)

  private cdr = inject(ChangeDetectorRef)
  private readonly fb = inject(FormBuilder)

  //PROPS N VARIABLES
  public currentUser: UserModel
  editable = false;

  nameFormControl = new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(3), Validators.maxLength(30)]})
  lastnameFormControl = new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(3), Validators.maxLength(30)]})
  emailFormControl = new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.email]})
  passwordFormControl = new FormControl('', {nonNullable: true})
  confirmPasswordFormControl = new FormControl('', {nonNullable: true})

  userForm = this.fb.group({
    username: this.nameFormControl,
    lastname: this.lastnameFormControl,
    email: this.emailFormControl,
    password: this.passwordFormControl,
    confirmPassword: this.confirmPasswordFormControl,
  }
  )

  constructor() {
    this.currentUser = this.userManagementService.currentUser()?? new UserModel();

    if(this.currentUser) {
      this.nameFormControl.setValue(this.currentUser.name);
      this.lastnameFormControl.setValue(this.currentUser.lastname);
      this.emailFormControl.setValue(this.currentUser.email);
    }
  }

  saveInfo() {
    const formValues = this.userForm.value

    if(formValues.password != formValues.confirmPassword) {
      this.messageService.addWarningMessage("Las contraseñas no coinciden")
      return
    }

    const twoFactor = this.currentUser?.twoFactorEnabled
    const userEdit : UserModel = {
      id: this.currentUser.id,
      name: formValues.username?? '',
      lastname: formValues.lastname?? '',
      email: formValues.email?? '',
      company_id: this.currentUser.company_id,
      company_name: this.currentUser.company_name,
      role: this.currentUser.role,
      password: formValues.password?? '',
      twoFactorEnabled: twoFactor
    }

    this.userManagementService.editUser(userEdit).subscribe({
      next: () => {
        this.userManagementService.getMyUser(). subscribe({
          next: (user) => {
            if(user) {
              this.userManagementService.currentUser.set(user)
              this.cdr.markForCheck()
            }
          }
        })
      }
    })
  }
}
