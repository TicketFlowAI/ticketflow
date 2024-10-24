import { Routes } from '@angular/router';
import {ChangePasswordComponent} from "./features/account/change-password/change-password.component";
import { AllCompaniesComponent } from './features/company/all-companies/all-companies.component';
import { AllServicesComponent } from './features/services/service/all-services/all-services.component';
import { AllServiceCategoriesComponent } from './features/services/service-category/all-service-categories/all-service-categories.component';
import { AllServiceTaxesComponent } from './features/services/service-tax/all-service-taxes/all-service-taxes.component';

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
    path: 'service-categories',
    component: AllServiceCategoriesComponent
  },
  {
    path: 'service-taxes',
    component: AllServiceTaxesComponent
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  },
];
