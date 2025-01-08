import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { EmailTemplateModel } from '../../../../../core/models/entities/email-template.model';
import { EmailManagementService } from '../../../../../core/services/email-management.service';
import { FormControl, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoDirective } from '@jsverse/transloco';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-manage-email-template',
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
    MatButtonModule
  ],
  templateUrl: './manage-email-template.component.html',
  styleUrl: './manage-email-template.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageEmailTemplateComponent {
  private readonly emailManagementService = inject(EmailManagementService);
  private readonly cdr = inject(ChangeDetectorRef);

  public readonly dialogRef = inject(MatDialogRef<ManageEmailTemplateComponent>);
  public readonly emailTemplateData = inject<EmailTemplateModel>(MAT_DIALOG_DATA);

  templateNameFormControl = new FormControl('', { nonNullable: true, validators: [Validators.required] })
  bodyFormControl = new FormControl('', { nonNullable: true, validators: [Validators.required] })

  emailTemplateForm = new FormGroup({
    templateName: this.templateNameFormControl,
    body: this.bodyFormControl
  })

  copyIcon: string = 'content_copy';
  service: EmailTemplateModel | null = null;

  ngOnInit(): void {
    this.dialogRef.backdropClick().subscribe(() => {
      this.dialogRef.close(false);
    });
    
    if (this.emailTemplateData) {
      this.service = this.emailTemplateData
      this.templateNameFormControl.setValue(this.emailTemplateData.template_name)
      this.bodyFormControl.setValue(this.emailTemplateData.body)
    }
  }

  onSaveClick(): void {
    const formValue = this.emailTemplateForm.value;
    let emailTemplate = new EmailTemplateModel(
      0,
      formValue.templateName,
      formValue.body,
    )

    if (this.emailTemplateData) {
      emailTemplate.id = this.emailTemplateData.id

      this.emailManagementService.editEmailTemplate(emailTemplate)
      .subscribe( () => { this.dialogRef.close(true) })
    }
    else {
      this.emailManagementService.addEmailTemplate(emailTemplate)
      .subscribe( () => { this.dialogRef.close(true) })
    }
  }
  
  copyToClipboard(event: MouseEvent): void {
    const valueToCopy = this.bodyFormControl.value || '';
    navigator.clipboard.writeText(valueToCopy).then(() => {
      this.copyIcon = 'check'; 
      this.cdr.markForCheck(); 

      setTimeout(() => {
        this.copyIcon = 'content_copy'; 
        this.cdr.markForCheck();
      }, 2000); 
    }).catch(() => {
      console.error('Failed to copy text to clipboard');
    });
  }

  openEditor(): void {
    const codepenData = {
      title: `Plantilla de Correo: ${this.templateNameFormControl.value}`,
      html: this.bodyFormControl.value,
      js: this.extractVariables(this.bodyFormControl.value),
    };
  
    const form = document.createElement('form');
    form.action = 'https://codepen.io/pen/define';
    form.method = 'POST';
    form.target = '_blank';
  
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'data';
    input.value = JSON.stringify(codepenData);
  
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  }

  extractVariables(template: string): string[] {
    const regex = /(\{\{\s*.*?\s*\}\})/g; 
    let match: RegExpExecArray | null;
    const variables: string[] = [];

    while ((match = regex.exec(template)) !== null) {
      variables.push(match[1]);
    }

    return variables;
  }
}
