import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserModel } from '../../../core/models/entities/user.model';
import { UserManagementService } from '../../../core/services/user-management.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  //SERVICES
  private userManagementService = inject(UserManagementService)
  private fb = inject(FormBuilder)

  //PROPS N VARIABLES
  public currentUser: UserModel | null = null
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
    this.currentUser = this.userManagementService.currentUser();
  }

  //METHODS
  editData() {
    this.editable = !this.editable;
  }

  saveInfo() {
    const formValues = this.userForm.value
  }
}
