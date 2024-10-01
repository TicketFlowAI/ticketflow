import { Routes } from '@angular/router';
import {RegisterComponent} from "./features/account/register/register.component";
import {ChangePasswordComponent} from "./features/account/change-password/change-password.component";

export const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  }
];
