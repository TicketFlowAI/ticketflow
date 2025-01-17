import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CompanyModel } from '../../../core/models/entities/company.model';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faFileContract, faFilePen, faBuilding, faPlus, faX, faUsersLine } from "@fortawesome/free-solid-svg-icons";
import { MatIconModule } from '@angular/material/icon';
import { DialogManagerService } from '../../../core/services/dialog-manager.service';
import { CompanyManagementService } from '../../../core/services/company-management.service';
import { concatMap, of, tap } from 'rxjs';
import { GlobalSpinnerComponent } from '../../../shared/components/global-spinner/global-spinner.component';
import { UserManagementService } from '../../../core/services/user-management.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-companies',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoDirective,
    MatExpansionModule,
    MatPaginatorModule,
    FormsModule,
    RouterLink,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FaIconComponent,
    GlobalSpinnerComponent
],
  templateUrl: './all-companies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllCompaniesComponent implements OnInit {
  
  protected readonly faFileContract = faFileContract;
  protected readonly faFilePen = faFilePen;
  protected readonly faBuilding = faBuilding;
  protected readonly faPlus = faPlus;
  protected readonly faX = faX;
  protected readonly faUsersLine = faUsersLine;

  private readonly companyManagementService = inject(CompanyManagementService)
  private readonly userManagementService = inject(UserManagementService)
  private readonly dialogManagerService = inject(DialogManagerService)

  private readonly cdr = inject(ChangeDetectorRef)
  private readonly translocoService = inject(TranslocoService)

  companies: CompanyModel[] = []
  filteredCompanies: CompanyModel[] = [];
  pagedCompanies: CompanyModel[] = [];

  isAdmin: boolean = false;
  isTech: boolean = false;

  pageSize = 6; // Tamaño de página por defecto
  pageIndex = 0; // Índice de la página actual
  filterText = ''; // Texto de filtro

  ngOnInit(): void {
    this.loadCompanies();

    this.isAdmin = this.userManagementService.isUserAdmin()
    this.isTech = this.userManagementService.isUserTechnician()
  }

  loadCompanies() {
    this.companyManagementService.getAllCompanies().subscribe({
      next: (companies) => {
        this.companies = companies;
        this.filteredCompanies = this.companies;
        this.updatePagedCompanies();
        this.cdr.detectChanges();
      }
    });
  }

  onFilterChange(): void {
    const filterText = this.filterText.toLowerCase();

    this.filteredCompanies = this.companies.filter(company =>
      company.name.toLowerCase().includes(filterText) ||
      company.address.toLowerCase().includes(filterText) ||
      company.idNumber.toLowerCase().includes(filterText) ||
      company.phone.toLowerCase().includes(filterText)
    );
    this.pageIndex = 0;
    this.updatePagedCompanies();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedCompanies();
  }

  private updatePagedCompanies(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedCompanies = this.filteredCompanies.slice(startIndex, endIndex);
  }

  deleteCompany(companyId: number) {
    const deleteMessage = this.translocoService.translateObject('SHARED.DIALOGS.CONFIRMATION.DELETE-COMPANY');
    
    this.dialogManagerService.openActionConfirmationDialog(deleteMessage).pipe(
      concatMap((result) => result ? this.handleDeleteCompany(companyId) : this.handleCancelDelete())
    ).subscribe();
  }
  
  private handleDeleteCompany(companyId: number) {
    return this.companyManagementService.deleteCompany(companyId).pipe(
      tap(() => this.loadCompanies())
    );
  }
  
  private handleCancelDelete() {
    return of(null);
  }

  openCompanyInfoDialog(company: CompanyModel) {
    this.dialogManagerService.openCompanyInfoDialog(company)
  }

  openCompanyManageDialog(company: CompanyModel | null) {
    this.dialogManagerService.openManageCompanyDialog(company).subscribe({
      next: (response) => {
         if(response) this.loadCompanies() 
      }
    })
  }
}
