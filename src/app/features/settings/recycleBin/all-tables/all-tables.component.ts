import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { TranslocoDirective } from '@jsverse/transloco';
import { GlobalSpinnerComponent } from '../../../../shared/components/global-spinner/global-spinner.component';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { MatExpansionModule } from '@angular/material/expansion';
import { UserManagementService } from '../../../../core/services/user-management.service';
import { ServiceManagementService } from '../../../../core/services/service-management.service';
import { ServiceContractManagementService } from '../../../../core/services/service-contract-management.service';
import { EmailManagementService } from '../../../../core/services/email-management.service';
import { TicketManagementService } from '../../../../core/services/ticket-management.service';
import { UserModel } from '../../../../core/models/entities/user.model';
import { CompanyManagementService } from '../../../../core/services/company-management.service';
import { CompanyModel } from '../../../../core/models/entities/company.model';
import { ServiceContractModel } from '../../../../core/models/entities/service-contract.model';
import { ServiceContractTermModel } from '../../../../core/models/entities/service-contract-term.model';
import { ServiceModel } from '../../../../core/models/entities/service.model';
import { ServiceCategoryModel } from '../../../../core/models/entities/service-category.model';
import { ServiceTaxModel } from '../../../../core/models/entities/service-tax.model';
import { TicketModel } from '../../../../core/models/entities/ticket.model';
import { EmailTemplateModel } from '../../../../core/models/entities/email-template.model';
import { EmailIntervalModel } from '../../../../core/models/entities/email-interval.model';
import { UserRoleModel } from '../../../../core/models/entities/user-role.model';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { SurveyQuestionModel } from '../../../../core/models/entities/survey-question.model';
import { SurveyManagementService } from '../../../../core/services/survey-management.service';


@Component({
  selector: 'app-all-tables',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TranslocoDirective,
    FaIconComponent,
    GlobalSpinnerComponent,
    MatExpansionModule,
    FormsModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './all-tables.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllTablesComponent {
  protected readonly faArrowLeft = faArrowLeft;

  private userManagementService = inject(UserManagementService)
  private companyManagementService = inject(CompanyManagementService)
  private serviceContractManagementService = inject(ServiceContractManagementService)
  private serviceManagementService = inject(ServiceManagementService)
  private emailManagementService = inject(EmailManagementService)
  private ticketManagementService = inject(TicketManagementService)
  private surveyManagementService = inject(SurveyManagementService)

  private cdr = inject(ChangeDetectorRef)

  public users: UserModel[] = []
  public companies: CompanyModel[] = []
  public serviceContracts: ServiceContractModel[] = []
  public serviceContractTerms: ServiceContractTermModel[] = []
  public services: ServiceModel[] = []
  public serviceCategories: ServiceCategoryModel[] = []
  public servicetaxes: ServiceTaxModel[] = []
  public tickets: TicketModel[] = []
  public emailTemplates: EmailTemplateModel[] = []
  public emailIntervals: EmailIntervalModel[] = []
  public surveyQuestions: SurveyQuestionModel[] = []

  public usersFiltered: UserModel[] = []

  public companiesFiltered: CompanyModel[] = []
  public serviceContractsFiltered: ServiceContractModel[] = []
  public serviceContractTermsFiltered: ServiceContractTermModel[] = []
  public servicesFiltered: ServiceModel[] = []
  public serviceCategoriesFiltered: ServiceCategoryModel[] = []
  public servicetaxesFiltered: ServiceTaxModel[] = []
  public ticketsFiltered: TicketModel[] = []
  public emailTemplatesFiltered: EmailTemplateModel[] = []
  public emailIntervalsFiltered: EmailIntervalModel[] = []
  public surveyQuestionsFiltered: SurveyQuestionModel[] = []

  filterText: string = ''

  filterTexts: Record<string, string> = {
    users: '',
    companies: '',
    serviceContracts: '',
    serviceContractTerms: '',
    services: '',
    serviceCategories: '',
    servicetaxes: '',
    tickets: '',
    emailTemplates: '',
    emailIntervals: '',
    surveyQuestions: '',
  };

  onFilterChange(tableName: string): void {
    const filterText = this.filterTexts[tableName].toLowerCase();

    switch (tableName) {
      case 'users':
        this.usersFiltered = this.users.filter(user =>
          user.name.toLowerCase().includes(filterText) ||
          user.email.toLowerCase().includes(filterText)
        );
        break;

      case 'companies':
        this.companiesFiltered = this.companies.filter(company =>
          company.name.toLowerCase().includes(filterText)
        );
        break;

      case 'serviceContracts':
        this.serviceContractsFiltered = this.serviceContracts.filter(serviceContract =>
          serviceContract.company.toLowerCase().includes(filterText) ||
          serviceContract.price.toString().toLowerCase().includes(filterText) ||
          serviceContract.service.toLowerCase().includes(filterText)
        );
        break;

      case 'serviceContractTerms':
        this.serviceContractTermsFiltered = this.serviceContractTerms.filter(term =>
          term.term.toLowerCase().includes(filterText) ||
          term.months.toString().includes(filterText)
        );
        break;

      case 'services':
        this.servicesFiltered = this.services.filter(service =>
          service.details.toLowerCase().includes(filterText)
        );
        break;

      case 'serviceCategories':
        this.serviceCategoriesFiltered = this.serviceCategories.filter(category =>
          category.category.toLowerCase().includes(filterText)
        );
        break;

      case 'serviceTaxes':
        this.servicetaxesFiltered = this.servicetaxes.filter(tax =>
          tax.description.toLowerCase().includes(filterText) ||
          tax.value.toString().toLowerCase().includes(filterText)
        );
        break;

      case 'tickets':
        this.ticketsFiltered = this.tickets.filter(ticket =>
          ticket.title.toLowerCase().includes(filterText)
        );
        break;

      case 'emailTemplates':
        this.emailTemplatesFiltered = this.emailTemplates.filter(template =>
          template.template_name.toLowerCase().includes(filterText)
        );
        break;

      case 'emailIntervals':
        this.emailIntervalsFiltered = this.emailIntervals.filter(interval =>
          interval.type.toLowerCase().includes(filterText) ||
          interval.days.toString().includes(filterText)
        );
        break;
      case 'surveyQuestions':
        this.surveyQuestionsFiltered = this.surveyQuestions.filter(question =>
          question.question.toLowerCase().includes(filterText)
        );
        break;

      default:
        break;
    }
  }

  loadUsersTable() {
    this.userManagementService.getDeletedUsers().subscribe({
      next: (response) => {
        console.log('Datos de usuarios:', response); // Para depurar
        this.users = response
        this.usersFiltered = this.users
        this.cdr.markForCheck()
      },
    });
  }


  loadCompaniesTable() {
    this.companyManagementService.getDeletedCompanies().subscribe({
      next: (response) => {
        this.companies = response
        this.companiesFiltered = this.companies
        this.cdr.markForCheck()
      },
    });
  }

  loadServiceContractsTable() {
    this.serviceContractManagementService.getDeletedServiceContracts().subscribe({
      next: (response) => {
        this.serviceContracts = response
        this.serviceContractsFiltered = this.serviceContracts
        this.cdr.markForCheck()
      },
    });
  }

  loadServiceContractTermsTable() {
    this.serviceContractManagementService.getDeletedServiceContractTerms().subscribe({
      next: (response) => {
        this.serviceContractTerms = response
        this.serviceContractTermsFiltered = this.serviceContractTerms
        this.cdr.markForCheck()
      },
    });
  }

  loadServicesTable() {
    this.serviceManagementService.getDeletedServices().subscribe({
      next: (response) => {
        this.services = response
        this.servicesFiltered = this.services
        this.cdr.markForCheck()
      },
    });
  }

  loadServiceCategoriesTable() {
    this.serviceManagementService.getDeletedServiceCategories().subscribe({
      next: (response) => {
        this.serviceCategories = response
        this.serviceCategoriesFiltered = this.serviceCategories
        this.cdr.markForCheck()
      },
    });
  }

  loadServiceTaxesTable() {
    this.serviceManagementService.getDeletedServiceTaxes().subscribe({
      next: (response) => {
        this.servicetaxes = response
        this.servicetaxesFiltered = this.servicetaxes
        this.cdr.markForCheck()
      },
    });
  }

  loadTicketsTable() {
    this.ticketManagementService.getDeletedTickets().subscribe({
      next: (response) => {
        this.tickets = response
        this.ticketsFiltered = this.tickets
        this.cdr.markForCheck()
      },
    });
  }

  loadEmailIntervalsTable() {
    this.emailManagementService.getDeletedEmailIntervals().subscribe({
      next: (response) => {
        this.emailIntervals = response
        this.emailIntervalsFiltered = this.emailIntervals
        this.cdr.markForCheck()
      },
    });
  }

  loadEmailTemplatesTable() {
    this.emailManagementService.getDeletedEmailtemplates().subscribe({
      next: (response) => {
        this.emailTemplates = response
        this.emailTemplatesFiltered = this.emailTemplates
        this.cdr.markForCheck()
      },
    });
  }

  loadSurveyQuestionsTable() {
    this.surveyManagementService.getDeletedSurveyQuestions().subscribe({
      next: (response) => {
        this.surveyQuestions = response
        this.surveyQuestionsFiltered = this.surveyQuestions
        this.cdr.markForCheck()
      },
    });
  }

  restore(id: number, table: string) {
    if (table === 'users') {
      this.userManagementService.restoreDeletedUser(id).subscribe({
        next: () => {
          this.loadUsersTable()
        },
      });
    }
    if (table === 'companies') {
      this.companyManagementService.restoreDeletedCompany(id).subscribe({
        next: () => {
          this.loadCompaniesTable()
        },
      });
    }
    if (table === 'serviceContracts') {
      this.serviceContractManagementService.restoreServiceContract(id).subscribe({
        next: () => {
          this.loadServiceContractsTable()
        },
      });
    }
    if (table === 'serviceContractTerms') {
      this.serviceContractManagementService.restoreServiceContractTerm(id).subscribe({
        next: () => {
          this.loadServiceContractTermsTable()
        },
      });
    }
    if (table === 'services') {
      this.serviceManagementService.restoreService(id).subscribe({
        next: () => {
          this.loadServicesTable()
        },
      });
    }
    if (table === 'serviceCategories') {
      this.serviceManagementService.restoreServiceCategory(id).subscribe({
        next: () => {
          this.loadServiceCategoriesTable()
        },
      });
    }
    if (table === 'serviceTaxes') {
      this.serviceManagementService.restoreServiceTax(id).subscribe({
        next: () => {
          this.loadServiceTaxesTable()
        },
      });
    }
    if (table === 'tickets') {
      this.ticketManagementService.restoreTicket(id).subscribe({
        next: () => {
          this.loadTicketsTable()
        },
      });
    }
    if (table === 'emailTemplates') {
      this.emailManagementService.restoreEmailTemplate(id).subscribe({
        next: () => {
          this.loadEmailTemplatesTable()
        },
      });
    }
    if (table === 'emailIntervals') {
      this.emailManagementService.restoreEmailInterval(id).subscribe({
        next: () => {
          this.loadEmailIntervalsTable()
        },
      });
    }
    if (table === 'surveyQuestions') {
      this.surveyManagementService.restoreSurveyQuestion(id).subscribe({
        next: () => {
          this.loadSurveyQuestionsTable()
        },
      });
    }
  }
}
