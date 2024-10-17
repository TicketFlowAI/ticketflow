import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CompanyService } from '../../../core/api/servicios-mindsoftdev/company.service';
import { CompanyModel } from '../../../core/models/entities/company.model';
import {MatExpansionModule} from '@angular/material/expansion';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-all-companies',
  standalone: true,
  imports: [
    TranslocoDirective,
    MatExpansionModule,
  ],
  templateUrl: './all-companies.component.html',
  styleUrl: './all-companies.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllCompaniesComponent implements OnInit {
  private companyService = inject(CompanyService)
  private cdr = inject(ChangeDetectorRef)
  
  companies: CompanyModel[] = []

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe({
      next: (response) => {
        this.companies = response.data;
        this.cdr.detectChanges()
      }
    })
  }
}
