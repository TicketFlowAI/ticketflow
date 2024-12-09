import { TestBed } from '@angular/core/testing';

import { EmailManagementService } from './email-management.service';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';
import { isDevMode } from '@angular/core';
import { TranslocoHttpLoader } from '../../transloco-loader';
import { EmailService } from '../api/servicios-mindsoftdev/email.service';
import { MessageService } from '../../shared/services/message.service';
import { EmailTemplateModel } from '../models/entities/email-template.model';
import { of, throwError } from 'rxjs';

describe('EmailManagementService', () => {
  let service: EmailManagementService;
  let emailServiceMock: jasmine.SpyObj<EmailService>;
  let messageServiceMock: jasmine.SpyObj<MessageService>;
  let translocoServiceMock: jasmine.SpyObj<TranslocoService>;

  const mockEmailTemplate = new EmailTemplateModel(1, 'Template 1', '<html>1<html/>');
  const mockEmailTemplates = [mockEmailTemplate];

  beforeEach(() => {
    const emailSpy = jasmine.createSpyObj('EmailService', ['getEmailTemplates', 'getEmailTemplate', 'createEmailTemplate', 'updateEmailTemplate', 'deleteEmailTemplate']);
    const messageSpy = jasmine.createSpyObj('MessageService', ['addSuccessMessage', 'addErrorMessage']);
    const translocoSpy = jasmine.createSpyObj('TranslocoService', ['translateObject']);

    TestBed.configureTestingModule({
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
        { provide: EmailService, useValue: emailSpy },
        { provide: MessageService, useValue: messageSpy },
        { provide: TranslocoService, useValue: translocoSpy },
      ]
    });
    service = TestBed.inject(EmailManagementService);
    emailServiceMock = TestBed.inject(EmailService) as jasmine.SpyObj<EmailService>;
    messageServiceMock = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
    translocoServiceMock = TestBed.inject(TranslocoService) as jasmine.SpyObj<TranslocoService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all email templates successfully', (done) => {
    emailServiceMock.getEmailTemplates.and.returnValue(of({ success: true, data: mockEmailTemplates }));

    service.getAllEmailTemplates().subscribe((emailTemplates) => {
      expect(emailTemplates).toEqual(mockEmailTemplates);
      expect(emailServiceMock.getEmailTemplates).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while getting all email templates', (done) => {
    emailServiceMock.getEmailTemplates.and.returnValue(throwError(() => new Error('Error fetching all email tempaltes')));

    service.getAllEmailTemplates().subscribe((emailTemplates) => {
      expect(emailTemplates).toEqual([]);
      expect(emailServiceMock.getEmailTemplates).toHaveBeenCalled();
      done();
    });
  });

  it('should get one email template successfully', (done) => {
    emailServiceMock.getEmailTemplate.and.returnValue(of({ success: true, data: mockEmailTemplate }));


    service.getOneEmailTemplate(1).subscribe((emailTemplate) => {
      expect(emailTemplate).toEqual(mockEmailTemplate);
      expect(emailServiceMock.getEmailTemplate).toHaveBeenCalledWith(1);
      done();
    });
  });

  it('should handle error while getting one email template', (done) => {
    emailServiceMock.getEmailTemplate.and.returnValue(throwError(() => new Error('Error fetching email template')));

    service.getOneEmailTemplate(1).subscribe((emailTemplate) => {
      expect(emailTemplate).toBeNull();
      expect(emailServiceMock.getEmailTemplate).toHaveBeenCalledWith(1);
      done();
    });
  });

  it('should add a email template successfully', (done) => {
    emailServiceMock.createEmailTemplate.and.returnValue(of(new HttpResponse({ status: 201 })));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.addEmailTemplate(mockEmailTemplate).subscribe((result) => {
      expect(result).toBeTrue();
      expect(emailServiceMock.createEmailTemplate).toHaveBeenCalledWith(mockEmailTemplate);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while adding a email template', (done) => {
    emailServiceMock.createEmailTemplate.and.returnValue(throwError(() => new Error('Error creating email template')));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.addEmailTemplate(mockEmailTemplate).subscribe((result) => {
      expect(result).toBeFalse();
      expect(emailServiceMock.createEmailTemplate).toHaveBeenCalledWith(mockEmailTemplate);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should edit a email template successfully', (done) => {
    emailServiceMock.updateEmailTemplate.and.returnValue(of(new HttpResponse({ status: 200 })));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.editEmailTemplate(mockEmailTemplate).subscribe((result) => {
      expect(result).toBeTrue();
      expect(emailServiceMock.updateEmailTemplate).toHaveBeenCalledWith(mockEmailTemplate);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while editing a email template', (done) => {
    emailServiceMock.updateEmailTemplate.and.returnValue(throwError(() => new Error('Error updating email template')));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.editEmailTemplate(mockEmailTemplate).subscribe((result) => {
      expect(result).toBeFalse();
      expect(emailServiceMock.updateEmailTemplate).toHaveBeenCalledWith(mockEmailTemplate);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should delete a email template successfully', (done) => {
    emailServiceMock.deleteEmailTemplate.and.returnValue(of(new HttpResponse({ status: 200 })));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.deleteEmailTemplate(1).subscribe((result) => {
      expect(result).toBeTrue();
      expect(emailServiceMock.deleteEmailTemplate).toHaveBeenCalledWith(1);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while deleting a email template', (done) => {
    emailServiceMock.deleteEmailTemplate.and.returnValue(throwError(() => new Error('Error deleting email template')));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.deleteEmailTemplate(1).subscribe((result) => {
      expect(result).toBeFalse();
      expect(emailServiceMock.deleteEmailTemplate).toHaveBeenCalledWith(1);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });
});
