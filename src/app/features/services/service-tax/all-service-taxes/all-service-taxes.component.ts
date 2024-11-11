import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { ServiceManagementService } from '../../../../core/services/service-management.service';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faPencil, faX, faPlus, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import { DialogManagerService } from '../../../../core/services/dialog-manager.service';
import { ServiceTaxModel } from '../../../../core/models/entities/service-tax.model';
import { RouterLink } from '@angular/router';
import { concatMap, of } from 'rxjs';

@Component({
  selector: 'app-all-service-taxes',
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
  templateUrl: './all-service-taxes.component.html',
  styleUrl: './all-service-taxes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllServiceTaxesComponent {
  protected readonly faArrowLeft = faArrowLeft;
  protected readonly faPencil = faPencil;
  protected readonly faPlus = faPlus;
  protected readonly faX = faX;

  private readonly serviceManagementService = inject(ServiceManagementService)
  private readonly dialogManagerService = inject(DialogManagerService)

  private readonly cdr = inject(ChangeDetectorRef)
  private readonly translocoService = inject(TranslocoService)

  serviceTaxes: ServiceTaxModel[] = []
  filteredServiceTaxes: ServiceTaxModel[] = [];
  pagedServiceTaxes: ServiceTaxModel[] = [];

  pageSize = 6; // Tamaño de página por defecto
  pageIndex = 0; // Índice de la página actual
  filterText = ''; // Texto de filtro

  ngOnInit(): void {
    this.loadServiceTaxes();
  }

  loadServiceTaxes() {
    this.serviceManagementService.getAllServiceTaxes().subscribe({
      next: (response) => {
        this.serviceTaxes = response;
        this.filteredServiceTaxes = this.serviceTaxes;
        this.updatePagedServiceTaxes();
        this.cdr.detectChanges();
      }
    });
  }

  onFilterChange(): void {
    const filterText = this.filterText.toLowerCase();

    this.filteredServiceTaxes = this.serviceTaxes.filter(serviceTax =>
      serviceTax.description.toLowerCase().includes(filterText) ||
      serviceTax.value.toString().toLowerCase().includes(filterText)
    );
    this.pageIndex = 0;
    this.updatePagedServiceTaxes();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedServiceTaxes();
  }

  private updatePagedServiceTaxes(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedServiceTaxes = this.filteredServiceTaxes.slice(startIndex, endIndex);
  }
  
  deleteServiceTax(serviceTaxId: number) {
    const deleteMessage = this.translocoService.translateObject('SHARED.DIALOGS.CONFIRMATION.DELETE-SERVICE-TAX');
    
    this.dialogManagerService.openActionConfirmationDialog(deleteMessage).pipe(
      concatMap((result) => {
        if(result)
          return this.serviceManagementService.deleteServiceTax(serviceTaxId)
        else
          return of(null)
      })
    ).subscribe( (result) => { if(result) this.loadServiceTaxes() } )
  }

  openServiceTaxManageDialog(serviceTax: ServiceTaxModel | null) {
    this.dialogManagerService.openManageServiceTaxDialog(serviceTax).subscribe(
      () => { this.loadServiceTaxes() }
    )
  }
}
