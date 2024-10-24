import {inject, Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../../features/auth/login/login.component";
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

@Injectable({
  providedIn: 'root'
})
export class DialogManagerService {
  private readonly dialogService: MatDialog = inject(MatDialog)


  openLoginDialog(){
    const enterAnimationDuration = '0ms'
    const exitAnimationDuration = '0ms'

    this.dialogService.open(LoginComponent, {
      width: '500px',
      height: '400px',
      enterAnimationDuration,
      exitAnimationDuration
    });
  }

  openActionConfrimationDialog(message: string): Observable<boolean>
  {
    const enterAnimationDuration = '200ms'
    const exitAnimationDuration = '200ms'

    const dialogRef = this.dialogService.open(ActionConfirmationComponent, {
      width: '450px',
      height: '200',
      enterAnimationDuration,
      exitAnimationDuration,
      data: message
    });

    dialogRef.afterClosed().pipe(
      map(result => console.log(result))
    );

    return dialogRef.afterClosed().pipe(
      map(result => result)
    );
  }

  openManageCompanyDialog(company: CompanyModel | null){
    const enterAnimationDuration = '0ms'
    const exitAnimationDuration = '0ms'
    
    this.dialogService.open(ManageCompanyComponent, {
      width: '800px',
      maxWidth: '100vw',
      height: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: company
    });
  }

  openCompanyInfoDialog(company: CompanyModel){
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

  openServiceInfoDialog(service: ServiceModel){
    const enterAnimationDuration = '0ms'
    const exitAnimationDuration = '0ms'
    
    this.dialogService.open(ServiceInfoComponent, {
      width: '500px',
      height: '325px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: service
    });
  }

  openManageServiceDialog(service: ServiceModel | null){
    const enterAnimationDuration = '0ms'
    const exitAnimationDuration = '0ms'
    
    this.dialogService.open(ManageServiceComponent, {
      width: '500px',
      height: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: service
    });
  }

  openManageServiceCategoryDialog(serviceCategory: ServiceCategoryModel | null){
    const enterAnimationDuration = '0ms'
    const exitAnimationDuration = '0ms'

    this.dialogService.open(ManageServiceCategoryComponent, {
      width: '500px',
      height: '230px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: serviceCategory
    });
  }

  openManageServiceTaxDialog(serviceTax: ServiceTaxModel | null){
    const enterAnimationDuration = '0ms'
    const exitAnimationDuration = '0ms'
    
    this.dialogService.open(ManageServiceTaxComponent, {
      width: '500px',
      height: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: serviceTax
    });
  }

  openNewTicketDialog(){
    const enterAnimationDuration = '0ms'
    const exitAnimationDuration = '0ms'

    this.dialogService.open(LoginComponent, {
      width: '500px',
      height: '400px',
      enterAnimationDuration,
      exitAnimationDuration
    });
  }
}
