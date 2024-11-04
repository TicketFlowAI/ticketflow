import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TranslocoDirective } from '@jsverse/transloco';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faPencil, faX, faPlus, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { RouterLink } from '@angular/router';
import { ServiceContractModel } from '../../../../core/models/entities/service-contract.model';
import { DialogManagerService } from '../../../../core/services/dialog-manager.service';
import { ServiceContractManagementService } from '../../../../core/services/service-contract-management.service';


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

  private serviceContractManagementService = inject(ServiceContractManagementService)
  private dialogManagerService = inject(DialogManagerService)
  private cdr = inject(ChangeDetectorRef)

  serviceContracts: ServiceContractModel[] = []
  filteredServiceContracts: ServiceContractModel[] = [];
  pagedServiceContracts: ServiceContractModel[] = [];

  pageSize = 6; // Tamaño de página por defecto
  pageIndex = 0; // Índice de la página actual
  filterText = ''; // Texto de filtro
  
  ngOnInit() {
    if(this.companyId) {
      this.serviceContractManagementService.getAllServiceContractsFromCompany(parseInt(this.companyId)).subscribe({
        next: (response) => {
          this.serviceContracts = response;
          this.filteredServiceContracts = this.serviceContracts;
          this.updatePagedServiceContracts();
          this.cdr.detectChanges();
        }
      });
    }
    else {
      this.serviceContractManagementService.getAllServiceContracts().subscribe({
        next: (response) => {
          this.serviceContracts = response;
          this.filteredServiceContracts = this.serviceContracts;
          this.updatePagedServiceContracts();
          this.cdr.detectChanges();
        }
      });
    }
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

  openConfirmationDialog() {
    this.dialogManagerService.openActionConfrimationDialog("¿Está seguro que desea eliminar este servicio contratado del listado?")
  }

  openServiceContractInfoDialog(serviceContract: ServiceContractModel) {
    this.dialogManagerService.openServiceContractInfoDialog(serviceContract)
  }

  openServiceContractManageDialog(serviceContract: ServiceContractModel | null) {
    this.dialogManagerService.openManageServiceContractDialog(serviceContract)
  }
}
