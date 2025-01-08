import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { faArrowLeft, faPencil, faPlus, faX } from '@fortawesome/free-solid-svg-icons';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { concatMap, tap, of } from 'rxjs';
import { EmailTemplateModel } from '../../../../../core/models/entities/email-template.model';
import { DialogManagerService } from '../../../../../core/services/dialog-manager.service';
import { EmailManagementService } from '../../../../../core/services/email-management.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-all-email-templates',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoDirective,
    MatPaginatorModule,
    MatExpansionModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FaIconComponent,
],
  templateUrl: './all-email-templates.component.html',
  styleUrl: './all-email-templates.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllEmailTemplatesComponent {
  protected readonly faArrowLeft = faArrowLeft;
  protected readonly faPencil = faPencil;
  protected readonly faPlus = faPlus;
  protected readonly faX = faX;

  private readonly emailManagementService = inject(EmailManagementService)
  private readonly dialogManagerService = inject(DialogManagerService)

  private readonly cdr = inject(ChangeDetectorRef)
  private readonly translocoService = inject(TranslocoService)

  emailTemplates: EmailTemplateModel[] = []
  filteredEmailTemplates: EmailTemplateModel[] = [];
  pagedEmailTemplates: EmailTemplateModel[] = [];

  pageSize = 6; // Tamaño de página por defecto
  pageIndex = 0; // Índice de la página actual
  filterText = ''; // Texto de filtro

  ngOnInit(): void {
    this.loadEmailTemplates();
  }

  loadEmailTemplates() {
    this.emailManagementService.getAllEmailTemplates().subscribe({
      next: (response) => {
        this.emailTemplates = response;
        this.filteredEmailTemplates = this.emailTemplates;
        this.updatePagedEmailTemplates();
        this.cdr.detectChanges();
      }
    });
  }

  onFilterChange(): void {
    const filterText = this.filterText.toLowerCase();

    this.filteredEmailTemplates = this.emailTemplates.filter(emailTemplate =>
      emailTemplate.template_name.toLowerCase().includes(filterText) ||
      emailTemplate.body.toString().toLowerCase().includes(filterText)
    );

    this.pageIndex = 0;
    this.updatePagedEmailTemplates();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedEmailTemplates();
  }

  private updatePagedEmailTemplates(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedEmailTemplates = this.filteredEmailTemplates.slice(startIndex, endIndex);
  }
  
  deleteEmailTemplate(emailTemplateId: number) {
    const deleteMessage = this.translocoService.translateObject('SHARED.DIALOGS.CONFIRMATION.DELETE-EMAIL-TEMPLATE');
  
    this.dialogManagerService.openActionConfirmationDialog(deleteMessage).pipe(
      concatMap((result) => 
        result 
          ? this.handleDeleteEmailTemplate(emailTemplateId) 
          : this.handleCancelDelete()
      )
    ).subscribe();
  }
  
  private handleDeleteEmailTemplate(emailTemplateId: number) {
    return this.emailManagementService.deleteEmailTemplate(emailTemplateId).pipe(
      tap(() => this.loadEmailTemplates())
    );
  }
  
  private handleCancelDelete() {
    return of(null);
  }  

  openManageEmailTemplateDialog(emailTemplate: EmailTemplateModel | null) {
    this.dialogManagerService.openManageEmailTemplateDialog(emailTemplate).subscribe({
      next: (response) => {
         if(response) this.loadEmailTemplates() 
      }
    })
  }
}
