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
      height: '400px',
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
      map(() => {return true;})
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
      map(() => {return true;})
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

  openServiceInfoDialog(service: ServiceModel) {
    const enterAnimationDuration = '100ms'
    const exitAnimationDuration = '100ms'

    this.dialogService.open(ServiceInfoComponent, {
      width: '500px',
      height: '325px',
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
      height: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: service
    });

    return dialogRef.afterClosed().pipe(
      map(() => {return true;})
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
      map(() => {return true;})
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
      map(() => {return true;})
    )
  }

  openServiceContractInfoDialog(serviceContract: ServiceContractModel) {
    const enterAnimationDuration = '100ms'
    const exitAnimationDuration = '100ms'

    this.dialogService.open(ServiceContractInfoComponent, {
      width: '500px',
      height: '325px',
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
      map(() => {return true;})
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
      map(() => {return true;})
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
      map(() => {return true;})
    )
  }

  openManageEmailTemplateDialog(emailTemplate: EmailTemplateModel | null) {
    const enterAnimationDuration = '100ms'
    const exitAnimationDuration = '100ms'

    const dialogRef = this.dialogService.open(ManageEmailTemplateComponent, {
      width: '600px',
      maxWidth: '100vw',
      height: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: emailTemplate
    });

    return dialogRef.afterClosed().pipe(
      map(() => {return true;})
    )
  }
}
