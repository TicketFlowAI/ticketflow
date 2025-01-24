import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { isDevMode } from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { EmailTemplateModel } from '../../../../core/models/entities/email-template.model';
import { TranslocoHttpLoader } from '../../../../transloco-loader';
import { ManageEmailTemplateComponent } from '../../../settings/email/email-template/manage-email-template/manage-email-template.component';

describe('ManageEmailTemplateComponent', () => {
  let component: ManageEmailTemplateComponent;
  let fixture: ComponentFixture<ManageEmailTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageEmailTemplateComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideTransloco({
          config: {
            availableLangs: ['es', 'en'],
            defaultLang: 'es',
            reRenderOnLangChange: true,
            prodMode: !isDevMode(),
          },
          loader: TranslocoHttpLoader
        }),
        {
          provide: MatDialogRef,
          useValue: {
            close: jasmine.createSpy('close'), // Mock del método close
            backdropClick: jasmine.createSpy('backdropClick').and.returnValue(of(new MouseEvent('click'))), // Mock del método backdropClick
          },
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: new EmailTemplateModel(1, 'Template Example', 'Subject Example', '<html><body></body></html>'),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageEmailTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with data from MAT_DIALOG_DATA', () => {
    expect(component.emailTemplateForm.value).toEqual({
      templateName: 'Template Example',
      subject: 'Subject Example',
      body: '<html><body></body></html>',
    });
  });

  it('should call dialogRef.close with false on backdrop click', () => {
    component.dialogRef.backdropClick().subscribe(() => {
      expect(component.dialogRef.close).toHaveBeenCalledWith(false);
    });

    component.ngOnInit();
  });

  it('should save a new email template and close dialog', () => {
    const emailManagementServiceSpy = jasmine.createSpyObj('EmailManagementService', ['addEmailTemplate']);
    emailManagementServiceSpy.addEmailTemplate.and.returnValue(of({}));
    (component as any).emailManagementService = emailManagementServiceSpy;

    component.emailTemplate = null; // Simula un nuevo email template
    component.onSaveClick();

    expect(emailManagementServiceSpy.addEmailTemplate).toHaveBeenCalled();
    expect(component.dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should edit an existing email template and close dialog', () => {
    const emailManagementServiceSpy = jasmine.createSpyObj('EmailManagementService', ['editEmailTemplate']);
    emailManagementServiceSpy.editEmailTemplate.and.returnValue(of({}));
    (component as any).emailManagementService = emailManagementServiceSpy;

    component.onSaveClick();

    expect(emailManagementServiceSpy.editEmailTemplate).toHaveBeenCalled();
    expect(component.dialogRef.close).toHaveBeenCalledWith(true);
  });
});
