import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoDirective } from '@jsverse/transloco';
import { EmailManagementService } from '../../../../../core/services/email-management.service';
import { FieldErrorRequiredComponent } from '../../../../../shared/components/form-validation/field-error-required/field-error-required.component';
import { ManageEmailTemplateComponent } from '../../email-template/manage-email-template/manage-email-template.component';
import { EmailIntervalModel } from '../../../../../core/models/entities/email-interval.model';
import { EmailTemplateModel } from '../../../../../core/models/entities/email-template.model';
import { notZeroValidator } from '../../../../../shared/validators/custom-validators';
import { FieldErrorRequiredSelectComponent } from "../../../../../shared/components/form-validation/field-error-required-select/field-error-required-select.component";

@Component({
  selector: 'app-manage-email-interval',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoDirective,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    FieldErrorRequiredComponent,
    FieldErrorRequiredSelectComponent
],
  templateUrl: './manage-email-interval.component.html',
  styleUrl: './manage-email-interval.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageEmailIntervalComponent {
  private readonly emailManagementService = inject(EmailManagementService);
  private readonly cdr = inject(ChangeDetectorRef);

  public readonly dialogRef = inject(MatDialogRef<ManageEmailTemplateComponent>);
  public readonly emailIntervalData = inject<EmailIntervalModel>(MAT_DIALOG_DATA);

  emailTemplates: EmailTemplateModel[] = []
  daysFormControl = new FormControl(1, { nonNullable: true, validators: [Validators.required] })
  typeFormControl = new FormControl('', { nonNullable: true, validators: [Validators.required] })
  templateFormControl = new FormControl(0, { nonNullable: true, validators: [notZeroValidator] })

  emailIntervalForm = new FormGroup({
    days: this.daysFormControl,
    type: this.typeFormControl,
    emailId: this.templateFormControl
  })

  ngOnInit(): void {
    this.dialogRef.backdropClick().subscribe(() => {
      this.dialogRef.close(false);
    });
    
    this.loadEmailTemplates()

    if (this.emailIntervalData) {
      this.daysFormControl.setValue(this.emailIntervalData.days)
      this.typeFormControl.setValue(this.emailIntervalData.type)
    }
  }

  loadEmailTemplates() {
    this.emailManagementService.getAllEmailTemplates().subscribe({
      next: (templates) => {
        this.emailTemplates = templates;
        const template = this.emailTemplates.find(item => item.template_name == this.emailIntervalData.template_name)
        this.templateFormControl.setValue(template?.id?? 0)
        this.cdr.markForCheck()
      }
    })
  }

  onSaveClick(): void {
    const formValue = this.emailIntervalForm.value;
    let emailInterval = new EmailIntervalModel(
      0,
      formValue.days,
      formValue.type,
      formValue.emailId
    )

    if (this.emailIntervalData) {
      emailInterval.id = this.emailIntervalData.id

      this.emailManagementService.editEmailInterval(emailInterval)
        .subscribe(() => { this.dialogRef.close(true) })
    }
    else {
      this.emailManagementService.addEmailInterval(emailInterval)
        .subscribe(() => { this.dialogRef.close(true) })
    }
  }
}
