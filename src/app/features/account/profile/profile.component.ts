import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserSessionService } from '../../../core/services/user-sesion.service';
import { UserModel } from '../../../core/models/entities/user.model';
import { getBrowserCultureLang } from '@jsverse/transloco';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  //SERVICES
  private userSessionService = inject(UserSessionService)
  private fb = inject(FormBuilder)

  //PROPS N VARIABLES
  public currentUser!: UserModel
  editable = false;

  nameFormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)])
  lastnameFormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)])
  emailFormControl = new FormControl('', [Validators.required, Validators.email])

  userForm = this.fb.group({
    username: this.nameFormControl,
    lastname: this.lastnameFormControl,
    email: this.emailFormControl,
  }
  )
  constructor() {
    this.currentUser = this.userSessionService.currentUser();
  }

  //METHODS
  editData() {
    this.editable = !this.editable;
  }

  saveInfo() {
    const formValues = this.userForm.value
  }
}
