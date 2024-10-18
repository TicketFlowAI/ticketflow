import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CompanyService } from '../../../core/api/servicios-mindsoftdev/company.service';
import { CompanyModel } from '../../../core/models/entities/company.model';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TranslocoDirective } from '@jsverse/transloco';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-companies',
  standalone: true,
  imports: [
    TranslocoDirective,
    MatExpansionModule,
    MatPaginatorModule,
    FormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule
  ],
  templateUrl: './all-companies.component.html',
  styleUrl: './all-companies.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllCompaniesComponent implements OnInit {
  private companyService = inject(CompanyService)
  private cdr = inject(ChangeDetectorRef)
  
  companies: CompanyModel[] = []
  filteredCompanies: CompanyModel[] = [];
  pagedCompanies: CompanyModel[] = [];

  pageSize = 6; // Tamaño de página por defecto
  pageIndex = 0; // Índice de la página actual
  filterText = ''; // Texto de filtro

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe({
      next: (response) => {
        this.companies = response.data;
        this.filteredCompanies = this.companies; // Inicialmente, no hay filtro aplicado
        this.updatePagedCompanies();
        this.cdr.detectChanges();
      }
    });
  }

  onFilterChange(): void {
    // Aplica el filtro por nombre de compañía
    this.filteredCompanies = this.companies.filter(company =>
      company.name.toLowerCase().includes(this.filterText.toLowerCase())
    );
    this.pageIndex = 0; // Reinicia a la primera página al cambiar el filtro
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
}
