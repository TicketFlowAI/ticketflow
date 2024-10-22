import { Routes } from '@angular/router';
import {ChangePasswordComponent} from "./features/account/change-password/change-password.component";
import { AllCompaniesComponent } from './features/company/all-companies/all-companies.component';
import { AllServicesComponent } from './features/services/all-services/all-services.component';

export const routes: Routes = [
  {
    path: 'companies',
    component: AllCompaniesComponent
  },
  {
    path: 'services',
    component: AllServicesComponent
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  },
];
