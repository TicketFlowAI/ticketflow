import { Routes } from '@angular/router';
import { AllCompaniesComponent } from './features/company/all-companies/all-companies.component';
import { AllServicesComponent } from './features/services/service/all-services/all-services.component';
import { AllServiceCategoriesComponent } from './features/services/service-category/all-service-categories/all-service-categories.component';
import { AllServiceTaxesComponent } from './features/services/service-tax/all-service-taxes/all-service-taxes.component';
import { AllUsersComponent } from './features/users/all-users/all-users.component';
import { AllTicketsComponent } from './features/tickets/ticket/all-tickets/all-tickets.component';
import { AllServiceContractsComponent } from './features/service-contracts/service-contract/all-service-contracts/all-service-contracts.component';
import { AllServiceContractTermsComponent } from './features/service-contracts/service-contract-term/all-service-contract-terms/all-service-contract-terms.component';
import { AllTicketMessagesComponent } from './features/tickets/ticket-message/all-ticket-messages/all-ticket-messages.component';
import { GeneralSettingsComponent } from './features/settings/general-settings/general-settings.component';
import { ReportComponent } from './features/reports/report/report.component';
import { adminRoleGuard } from './core/guards/admin-role.guard';
import { teamRoleGuard } from './core/guards/team-role.guard';
import { ReportByTechnicianComponent } from './features/reports/report-by-technician/report-by-technician.component';

export const routes: Routes = [
  {
    path: 'settings',
    component: GeneralSettingsComponent,
    canActivate: [adminRoleGuard]
  },
  {
    path: 'companies',
    component: AllCompaniesComponent
  },
  {
    path: 'service-contract',
    component: AllServiceContractsComponent,
    
  },
  {
    path: 'service-contract/:companyId',
    component: AllServiceContractsComponent
  },
  {
    path: 'service-contract-term',
    component: AllServiceContractTermsComponent,
    canActivate: [teamRoleGuard]
  },
  {
    path: 'services',
    component: AllServicesComponent,
    canActivate: [teamRoleGuard]
  },
  {
    path: 'service-categories',
    component: AllServiceCategoriesComponent,
    canActivate: [teamRoleGuard]
  },
  {
    path: 'service-taxes',
    component: AllServiceTaxesComponent,
    canActivate: [teamRoleGuard]
  },
  {
    path: 'users',
    component: AllUsersComponent,
    canActivate: [teamRoleGuard]
  },
  {
    path: 'tickets',
    component: AllTicketsComponent
  },
  {
    path: 'ticket-message/:ticketId',
    component: AllTicketMessagesComponent
  },
  {
    path: 'report',
    component: ReportComponent,
    canActivate: [adminRoleGuard]
  },
  {
    path: 'technician-report/:companyId',
    component: ReportByTechnicianComponent,
    canActivate: [teamRoleGuard]
  },
];
