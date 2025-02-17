import { inject, Injectable } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { LoginComponent } from "../../features/auth/login/login.component";
import { ActionConfirmationComponent } from '../../shared/components/action-confirmation/action-confirmation.component';
import { map, Observable } from 'rxjs';
import { ManageServiceCategoryComponent } from '../../features/services/service-category/manage-service-category/manage-service-category.component';
import { ManageServiceTaxComponent } from '../../features/services/service-tax/manage-service-tax/manage-service-tax.component';
import { ManageServiceComponent } from '../../features/services/service/manage-service/manage-service.component';
import { ServiceModel } from '../models/entities/service.model';
import { ServiceCategoryModel } from '../models/entities/service-category.model';
import { ServiceTaxModel } from '../models/entities/service-tax.model';
import { CompanyModel } from '../models/entities/company.model';
import { CompanyInfoComponent } from '../../features/company/company-info/company-info.component';
import { ManageCompanyComponent } from '../../features/company/manage-company/manage-company.component';
import { ServiceInfoComponent } from '../../features/services/service/service-info/service-info.component';
import { UserModel } from '../models/entities/user.model';
import { ManageUserComponent } from '../../features/users/manage-user/manage-user.component';
import { UserInfoComponent } from '../../features/users/user-info/user-info.component';
import { ServiceContractModel } from '../models/entities/service-contract.model';
import { ServiceContractInfoComponent } from '../../features/service-contracts/service-contract/service-contract-info/service-contract-info.component';
import { ManageServiceContractComponent } from '../../features/service-contracts/service-contract/manage-service-contract/manage-service-contract.component';
import { ManageServiceContractTermComponent } from '../../features/service-contracts/service-contract-term/manage-service-contract-term/manage-service-contract-term.component';
import { ServiceContractTermModel } from '../models/entities/service-contract-term.model';
import { TicketModel } from '../models/entities/ticket.model';
import { ManageTicketComponent } from '../../features/tickets/ticket/manage-ticket/manage-ticket.component';
import { TicketInfoComponent } from '../../features/tickets/ticket/ticket-info/ticket-info.component';
import { TicketDialogData } from '../models/dialogs/ticket-dialog-data.model';
import { ServiceContractDialogData } from '../models/dialogs/service-contact-dialog-data.model';
import { EmailTemplateModel } from '../models/entities/email-template.model';
import { ManageEmailTemplateComponent } from '../../features/settings/email/email-template/manage-email-template/manage-email-template.component';
import { TechnicianHistoryComponent } from '../../features/tickets/ticket/technician-history/technician-history.component';
import { UserRoleModel } from '../models/entities/user-role.model';
import { ManageUserRoleComponent } from '../../features/users/user-roles/manage-user-role/manage-user-role.component';
import { UserRoleInfoComponent } from '../../features/users/user-roles/user-role-info/user-role-info.component';
import { EmailParametersComponent } from '../../features/settings/email/email-parameters/email-parameters.component';
import { EmailIntervalModel } from '../models/entities/email-interval.model';
import { ManageEmailIntervalComponent } from '../../features/settings/email/email-interval/manage-email-interval/manage-email-interval.component';
import { SurveyQuestionModel } from '../models/entities/survey-question.model';
import { ManageSurveyQuestionComponent } from '../../features/settings/survey/manage-survey-question/manage-survey-question.component';
import { ServiceRequestComponent } from '../../features/service-contracts/service-contract/service-request/service-request.component';
import { SatisfactionSurveyComponent } from '../../features/tickets/survey/satisfaction-survey/satisfaction-survey.component';
import { SatisfactionSurveyInfoComponent } from '../../features/tickets/survey/satisfaction-survey-info/satisfaction-survey-info.component';
import { AiClassifierModel } from '../models/entities/ai-classifier.model';
import { AiManageClassifiersComponent } from '../../features/settings/ai/ai-manage-classifiers/ai-manage-classifiers.component';
import { ServiceContractRequest } from '../models/dialogs/service-contract-request-model';

@Injectable({
  providedIn: 'root'
})
export class DialogManagerService {
  private readonly dialogService: MatDialog = inject(MatDialog)

  openLoginDialog() {
    const enterAnimationDuration = '100ms'
    const exitAnimationDuration = '100ms'

    this.dialogService.open(LoginComponent, {
      width: '500px',
      height: '450px',
      enterAnimationDuration,
      exitAnimationDuration
    });
  }

  openActionConfirmationDialog(message: string): Observable<boolean> {
    const enterAnimationDuration = '200ms'
    const exitAnimationDuration = '200ms'

    const dialogRef = this.dialogService.open(ActionConfirmationComponent, {
      width: '450px',
      height: '200',
      enterAnimationDuration,
      exitAnimationDuration,
      data: message
    });

    return dialogRef.afterClosed().pipe(
      map((result) => {
        if(result)
          return true;
        else
          return false;
      })
    )
  }

  openManageCompanyDialog(company: CompanyModel | null) {
    const enterAnimationDuration = '100ms'
    const exitAnimationDuration = '100ms'

    const dialogRef = this.dialogService.open(ManageCompanyComponent, {
      width: '800px',
      maxWidth: '100vw',
      height: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: company
    });

    return dialogRef.afterClosed().pipe(
      map((result) => {return result})
    )
  }

  openCompanyInfoDialog(company: CompanyModel) {
    const enterAnimationDuration = '100ms'
    const exitAnimationDuration = '100ms'

    this.dialogService.open(CompanyInfoComponent, {
      width: '600px',
      maxWidth: '100vw',
      height: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: company
    });
  }

  openManageTicketDialog(data: TicketDialogData) {
    const enterAnimationDuration = '100ms'
    const exitAnimationDuration = '100ms'

    const dialogRef = this.dialogService.open(ManageTicketComponent, {
      width: '800px',
      maxWidth: '100vw',
      height: data.ticket? '460px' : '570px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: data
    });

    return dialogRef.afterClosed().pipe(
      map((result) => {return result})
    )
  }

  openTicketInfoDialog(ticket: TicketModel) {
    const enterAnimationDuration = '100ms'
    const exitAnimationDuration = '100ms'

    this.dialogService.open(TicketInfoComponent, {
      width: '600px',
      maxWidth: '100vw',
      height: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: ticket
    });
  }

  openTicketTechnicianHistory(ticket: TicketModel) {
    const enterAnimationDuration = '100ms'
    const exitAnimationDuration = '100ms'

    this.dialogService.open(TechnicianHistoryComponent, {
      width: '600px',
      maxWidth: '100vw',
      height: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: ticket
    });
  }

  openServiceInfoDialog(service: ServiceModel) {
    const enterAnimationDuration = '100ms'
    const exitAnimationDuration = '100ms'

    this.dialogService.open(ServiceInfoComponent, {
      width: '500px',
      height: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: service
    });
  }

  openManageServiceDialog(service: ServiceModel | null) {
    const enterAnimationDuration = '100ms'
    const exitAnimationDuration = '100ms'

    const dialogRef = this.dialogService.open(ManageServiceComponent, {
      width: '500px',
      height: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: service
    });

    return dialogRef.afterClosed().pipe(
      map((result) => {return result})
    )
  }

  openManageServiceCategoryDialog(serviceCategory: ServiceCategoryModel | null) {
    const enterAnimationDuration = '100ms'
    const exitAnimationDuration = '100ms'

    const dialogRef = this.dialogService.open(ManageServiceCategoryComponent, {
      width: '500px',
      height: '230px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: serviceCategory
    });

    return dialogRef.afterClosed().pipe(
      map((result) => {return result})
    )
  }

  openManageServiceTaxDialog(serviceTax: ServiceTaxModel | null) {
    const enterAnimationDuration = '100ms'
    const exitAnimationDuration = '100ms'

    const dialogRef = this.dialogService.open(ManageServiceTaxComponent, {
      width: '500px',
      height: '310px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: serviceTax
    });

    return dialogRef.afterClosed().pipe(
      map((result) => {return result})
    )
  }

  openServiceContractInfoDialog(serviceContract: ServiceContractModel) {
    const enterAnimationDuration = '100ms'
    const exitAnimationDuration = '100ms'

    this.dialogService.open(ServiceContractInfoComponent, {
      width: '500px',
      height: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: serviceContract
    });
  }

  openManageServiceContractDialog(data: ServiceContractDialogData) {
    const enterAnimationDuration = '100ms'
    const exitAnimationDuration = '100ms'

    const dialogRef = this.dialogService.open(ManageServiceContractComponent, {
      width: '500px',
      height: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: data
    });

    return dialogRef.afterClosed().pipe(
      map((result) => {return result})
    )
  }

  openServiceContractRequestDialog(serviceContractData: ServiceContractRequest) {
    const enterAnimationDuration = '100ms'
    const exitAnimationDuration = '100ms'

    const dialogRef = this.dialogService.open(ServiceRequestComponent, {
      width: '500px',
      height: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: serviceContractData
    });

    return dialogRef.afterClosed().pipe(
      map((result) => {return result})
    )
  }

  openManageServiceContractTermDialog(serviceContractTerm: ServiceContractTermModel | null) {
    const enterAnimationDuration = '100ms'
    const exitAnimationDuration = '100ms'

    const dialogRef = this.dialogService.open(ManageServiceContractTermComponent, {
      width: '500px',
      height: '310px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: serviceContractTerm
    });

    return dialogRef.afterClosed().pipe(
      map((result) => {return result})
    )
  }

  openUserInfoDialog(user: UserModel) {
    const enterAnimationDuration = '100ms'
    const exitAnimationDuration = '100ms'

    this.dialogService.open(UserInfoComponent, {
      width: '600px',
      maxWidth: '100vw',
      height: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: user
    });
  }

  openManageUserDialog(user: UserModel | null) {
    const enterAnimationDuration = '100ms'
    const exitAnimationDuration = '100ms'

    const dialogRef = this.dialogService.open(ManageUserComponent, {
      width: '600px',
      maxWidth: '100vw',
      height: '460px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: user
    });

    return dialogRef.afterClosed().pipe(
      map((result) => {return result})
    )
  }

  openManageUserRoleDialog(user: UserRoleModel | null) {
    const enterAnimationDuration = '100ms'
    const exitAnimationDuration = '100ms'

    const dialogRef = this.dialogService.open(ManageUserRoleComponent, {
      width: '600px',
      maxWidth: '100vw',
      height: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: user
    });

    return dialogRef.afterClosed().pipe(
      map((result) => {return result})
    )
  }

  openUserRoleInfoDialog(userRole: UserRoleModel) {
    const enterAnimationDuration = '100ms'
    const exitAnimationDuration = '100ms'

    this.dialogService.open(UserRoleInfoComponent, {
      width: '600px',
      maxWidth: '100vw',
      height: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: userRole.id
    });
  }

  openManageEmailTemplateDialog(emailTemplate: EmailTemplateModel | null) {
    const enterAnimationDuration = '100ms'
    const exitAnimationDuration = '100ms'

    const dialogRef = this.dialogService.open(ManageEmailTemplateComponent, {
      width: '600px',
      maxWidth: '100vw',
      height: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: emailTemplate
    });

    return dialogRef.afterClosed().pipe(
      map((result) => {return result})
    )
  }

  openEmailParametersInfoDialog() {
    const enterAnimationDuration = '100ms'
    const exitAnimationDuration = '100ms'

    this.dialogService.open(EmailParametersComponent, {
      width: '600px',
      maxWidth: '100vw',
      height: '400px',
      enterAnimationDuration,
      exitAnimationDuration
    });
  }

  openManageEmailIntervalDialog(emailInterval: EmailIntervalModel | null) {
    const enterAnimationDuration = '100ms'
    const exitAnimationDuration = '100ms'

    const dialogRef = this.dialogService.open(ManageEmailIntervalComponent, {
      width: '600px',
      maxWidth: '100vw',
      height: '425px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: emailInterval
    });

    return dialogRef.afterClosed().pipe(
      map((result) => {return result})
    )
  }

  openManageSurveyQuestionDialog(surveyQuestion: SurveyQuestionModel| null) {
    const enterAnimationDuration = '100ms'
    const exitAnimationDuration = '100ms'

    const dialogRef = this.dialogService.open(ManageSurveyQuestionComponent, {
      width: '700px',
      maxWidth: '100vw',
      height: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: surveyQuestion
    });

    return dialogRef.afterClosed().pipe(
      map((result) => {return result})
    )
  }

  openTicketSurveyDialog(ticket: TicketModel) {
    const enterAnimationDuration = '100ms'
    const exitAnimationDuration = '100ms'

    const dialogRef = this.dialogService.open(SatisfactionSurveyComponent, {
      width: '700px',
      maxWidth: '100vw',
      height: '600px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: ticket
    });

    return dialogRef.afterClosed().pipe(
      map((result) => {return result})
    )
  }

  openTicketSurveyInfoDialog(ticket: TicketModel) {
    const enterAnimationDuration = '100ms'
    const exitAnimationDuration = '100ms'

    const dialogRef = this.dialogService.open(SatisfactionSurveyInfoComponent, {
      width: '700px',
      maxWidth: '100vw',
      height: '600px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: ticket
    });

    return dialogRef.afterClosed().pipe(
      map((result) => {return result})
    )
  }

  openAiClaassifierSelection(classifiers: AiClassifierModel[]) {
    const enterAnimationDuration = '100ms'
    const exitAnimationDuration = '100ms'

    this.dialogService.open(AiManageClassifiersComponent, {
      width: '700px',
      maxWidth: '100vw',
      height: '325px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: classifiers
    });
  }
}
