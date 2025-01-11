import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faPencil, faX, faPlus, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { RouterLink } from '@angular/router';
import { ServiceContractModel } from '../../../../core/models/entities/service-contract.model';
import { DialogManagerService } from '../../../../core/services/dialog-manager.service';
import { ServiceContractManagementService } from '../../../../core/services/service-contract-management.service';
import { concatMap, of, tap } from 'rxjs';
import { ServiceContractDialogData } from '../../../../core/models/dialogs/service-contact-dialog-data.model';
import { GlobalSpinnerComponent } from "../../../../shared/components/global-spinner/global-spinner.component";
import { UserManagementService } from '../../../../core/services/user-management.service';


@Component({
  selector: 'app-all-service-contracts',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TranslocoDirective,
    MatExpansionModule,
    MatPaginatorModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FaIconComponent,
    GlobalSpinnerComponent
],
  templateUrl: './all-service-contracts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllServiceContractsComponent {
  @Input() companyId!: string;

  protected readonly faPencil = faPencil;
  protected readonly faInfoCircle = faInfoCircle;
  protected readonly faPlus = faPlus;
  protected readonly faX = faX;

  private readonly serviceContractManagementService = inject(ServiceContractManagementService)
  private readonly userManagementService = inject(UserManagementService)
  private readonly dialogManagerService = inject(DialogManagerService)

  private readonly cdr = inject(ChangeDetectorRef)
  private readonly translocoService = inject(TranslocoService)

  serviceContracts: ServiceContractModel[] = []
  filteredServiceContracts: ServiceContractModel[] = [];
  pagedServiceContracts: ServiceContractModel[] = [];

  isAdmin: boolean = false;
  isTechnician: boolean = false;

  pageSize = 6; // Tamaño de página por defecto
  pageIndex = 0; // Índice de la página actual
  filterText = ''; // Texto de filtro

  ngOnInit() {
    this.loadServiceContracts()
    this.isAdmin = this.userManagementService.isUserAdmin();
    this.isTechnician = this.userManagementService.isUserTechnician();
  }

  loadServiceContracts() {
    const serviceContracts$ = this.companyId ? this.serviceContractManagementService.getAllServiceContractsFromCompany(parseInt(this.companyId)) : this.serviceContractManagementService.getAllServiceContracts();

    serviceContracts$.subscribe(
      {
        next: (response) => {
          this.serviceContracts = response;
          this.filteredServiceContracts = this.serviceContracts;
          this.updatePagedServiceContracts();
          this.cdr.detectChanges();
        }
      }
    );
  }

  onFilterChange(): void {
    const filterText = this.filterText.toLowerCase();

    this.filteredServiceContracts = this.serviceContracts.filter(service =>
      service.company.toLowerCase().includes(filterText) ||
      service.service.toLowerCase().includes(filterText) ||
      service.service_term.toLowerCase().includes(filterText) ||
      service.price.toString().toLowerCase().includes(filterText)
    );
    this.pageIndex = 0;
    this.updatePagedServiceContracts();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedServiceContracts();
  }

  private updatePagedServiceContracts(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedServiceContracts = this.filteredServiceContracts.slice(startIndex, endIndex);
  }

  deleteServiceContract(serviceContractId: number) {
    const deleteMessage = this.translocoService.translateObject(
      'SHARED.DIALOGS.CONFIRMATION.DELETE-SERVICE-CONTRACT'
    );

    this.dialogManagerService
      .openActionConfirmationDialog(deleteMessage)
      .pipe(
        concatMap((result) =>
          result ? this.handleDeleteServiceContract(serviceContractId) : this.handleCancelDelete()
        )
      )
      .subscribe();
  }

  private handleDeleteServiceContract(serviceContractId: number) {
    return this.serviceContractManagementService
      .deleteServiceContract(serviceContractId)
      .pipe(
        tap(() => {
          this.loadServiceContracts();
        })
      );
  }

  private handleCancelDelete() {
    return of(null);
  }

  openServiceContractInfoDialog(serviceContract: ServiceContractModel) {
    this.dialogManagerService.openServiceContractInfoDialog(serviceContract)
  }

  openServiceContractManageDialog(serviceContract: ServiceContractModel | null) {
    let data: ServiceContractDialogData = {
      serviceContract,
      companyId: this.companyId ? parseInt(this.companyId) : null
    }
    this.dialogManagerService.openManageServiceContractDialog(data).subscribe({
      next: (response) => {
         if(response) this.loadServiceContracts() 
      }
    })
  }
}
