import { TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';
import { isDevMode } from '@angular/core';
import { TranslocoHttpLoader } from '../../transloco-loader';
import { EmailService } from '../api/servicios-mindsoftdev/email.service';
import { EmailIntervalService } from '../api/servicios-mindsoftdev/email-interval.service';
import { MessageService } from '../../shared/services/message.service';
import { SpinnerService } from '../../shared/services/spinner.service';
import { EmailTemplateModel } from '../models/entities/email-template.model';
import { EmailIntervalModel } from '../models/entities/email-interval.model';
import { EmailManagementService } from './email-management.service';
import { of, throwError } from 'rxjs';

describe('EmailManagementService', () => {
  let service: EmailManagementService;
  let emailServiceMock: jasmine.SpyObj<EmailService>;
  let emailIntervalServiceMock: jasmine.SpyObj<EmailIntervalService>;
  let messageServiceMock: jasmine.SpyObj<MessageService>;
  let translocoServiceMock: jasmine.SpyObj<TranslocoService>;
  let spinnerServiceMock: jasmine.SpyObj<SpinnerService>;

  const mockEmailTemplate: EmailTemplateModel = new EmailTemplateModel(
    1, // id
    'Template 1', // name
    '<html>Template Content</html>' // content
  );
  const mockEmailTemplates: EmailTemplateModel[] = [mockEmailTemplate];

  const mockEmailInterval: EmailIntervalModel = new EmailIntervalModel(
    1, // id
    3, // days
    'daily', // type
    10, // email_id
    'Daily Summary Template' // template_name
  );
  const mockEmailIntervals: EmailIntervalModel[] = [mockEmailInterval];


  beforeEach(() => {
    const emailSpy = jasmine.createSpyObj('EmailService', [
      'getEmailTemplates',
      'getEmailTemplate',
      'createEmailTemplate',
      'updateEmailTemplate',
      'deleteEmailTemplate',
      'restoreEmailTemplate',
      'getDeletedEmailTemplates'
    ]);
    const emailIntervalSpy = jasmine.createSpyObj('EmailIntervalService', [
      'getEmailIntervals',
      'getEmailInterval',
      'createEmailInterval',
      'updateEmailInterval',
      'deleteEmailInterval',
      'restoreEmailInterval',
      'getDeletedIntervals'
    ]);
    const messageSpy = jasmine.createSpyObj('MessageService', ['addSuccessMessage', 'addErrorMessage']);
    const translocoSpy = jasmine.createSpyObj('TranslocoService', ['translateObject']);
    const spinnerSpy = jasmine.createSpyObj('SpinnerService', ['showGlobalSpinner', 'hideGlobalSpinner', 'showDialogSpinner', 'hideDialogSpinner']);

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
        { provide: EmailIntervalService, useValue: emailIntervalSpy },
        { provide: MessageService, useValue: messageSpy },
        { provide: TranslocoService, useValue: translocoSpy },
        { provide: SpinnerService, useValue: spinnerSpy }
      ]
    });

    service = TestBed.inject(EmailManagementService);
    emailServiceMock = TestBed.inject(EmailService) as jasmine.SpyObj<EmailService>;
    emailIntervalServiceMock = TestBed.inject(EmailIntervalService) as jasmine.SpyObj<EmailIntervalService>;
    messageServiceMock = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
    translocoServiceMock = TestBed.inject(TranslocoService) as jasmine.SpyObj<TranslocoService>;
    spinnerServiceMock = TestBed.inject(SpinnerService) as jasmine.SpyObj<SpinnerService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all email templates successfully', (done) => {
    emailServiceMock.getEmailTemplates.and.returnValue(
      of({ success: true, data: mockEmailTemplates })
    );
  
    service.getAllEmailTemplates().subscribe((emailTemplates) => {
      expect(emailTemplates).toEqual(mockEmailTemplates);
      expect(emailServiceMock.getEmailTemplates).toHaveBeenCalled();
      done();
    });
  });
  
  it('should get one email template successfully', (done) => {
    emailServiceMock.getEmailTemplate.and.returnValue(
      of({ success: true, data: mockEmailTemplate })
    );
  
    service.getOneEmailTemplate(1).subscribe((emailTemplate) => {
      expect(emailTemplate).toEqual(mockEmailTemplate);
      expect(emailServiceMock.getEmailTemplate).toHaveBeenCalledWith(1);
      done();
    });
  });
  
  it('should add a new email template successfully', (done) => {
    emailServiceMock.createEmailTemplate.and.returnValue(
      of(new HttpResponse({ status: 201 }))
    );
  
    service.addEmailTemplate(mockEmailTemplate).subscribe((result) => {
      expect(result).toBeTrue();
      expect(emailServiceMock.createEmailTemplate).toHaveBeenCalledWith(
        mockEmailTemplate
      );
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });
  
  it('should edit an email template successfully', (done) => {
    emailServiceMock.updateEmailTemplate.and.returnValue(
      of(new HttpResponse({ status: 200 }))
    );
  
    service.editEmailTemplate(mockEmailTemplate).subscribe((result) => {
      expect(result).toBeTrue();
      expect(emailServiceMock.updateEmailTemplate).toHaveBeenCalledWith(
        mockEmailTemplate
      );
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });
  
  it('should delete an email template successfully', (done) => {
    emailServiceMock.deleteEmailTemplate.and.returnValue(
      of(new HttpResponse({ status: 200 }))
    );
  
    service.deleteEmailTemplate(1).subscribe((result) => {
      expect(result).toBeTrue();
      expect(emailServiceMock.deleteEmailTemplate).toHaveBeenCalledWith(1);
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });
  
  it('should restore a deleted email template successfully', (done) => {
    emailServiceMock.restoreEmailTemplate.and.returnValue(
      of(new HttpResponse({ status: 200 }))
    );
  
    service.restoreEmailTemplate(1).subscribe((result) => {
      expect(result).toBeTrue();
      expect(emailServiceMock.restoreEmailTemplate).toHaveBeenCalledWith(1);
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });
  
  it('should get all email intervals successfully', (done) => {
    emailIntervalServiceMock.getEmailIntervals.and.returnValue(
      of({ success: true, data: mockEmailIntervals })
    );
  
    service.getAllEmailIntervals().subscribe((emailIntervals) => {
      expect(emailIntervals).toEqual(mockEmailIntervals);
      expect(emailIntervalServiceMock.getEmailIntervals).toHaveBeenCalled();
      done();
    });
  });
  
  it('should get one email interval successfully', (done) => {
    emailIntervalServiceMock.getEmailInterval.and.returnValue(
      of({ success: true, data: mockEmailInterval })
    );
  
    service.getOneEmailIntervals(1).subscribe((emailInterval) => {
      expect(emailInterval).toEqual(mockEmailInterval);
      expect(emailIntervalServiceMock.getEmailInterval).toHaveBeenCalledWith(1);
      done();
    });
  });
  
  it('should add a new email interval successfully', (done) => {
    emailIntervalServiceMock.createEmailInterval.and.returnValue(
      of(new HttpResponse({ status: 201 }))
    );
  
    service.addEmailInterval(mockEmailInterval).subscribe((result) => {
      expect(result).toBeTrue();
      expect(emailIntervalServiceMock.createEmailInterval).toHaveBeenCalledWith(
        mockEmailInterval
      );
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });
  
  it('should edit an email interval successfully', (done) => {
    emailIntervalServiceMock.updateEmailInterval.and.returnValue(
      of(new HttpResponse({ status: 200 }))
    );
  
    service.editEmailInterval(mockEmailInterval).subscribe((result) => {
      expect(result).toBeTrue();
      expect(emailIntervalServiceMock.updateEmailInterval).toHaveBeenCalledWith(
        mockEmailInterval
      );
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });
  
  it('should delete an email interval successfully', (done) => {
    emailIntervalServiceMock.deleteEmailInterval.and.returnValue(
      of(new HttpResponse({ status: 200 }))
    );
  
    service.deleteEmailInterval(1).subscribe((result) => {
      expect(result).toBeTrue();
      expect(emailIntervalServiceMock.deleteEmailInterval).toHaveBeenCalledWith(
        1
      );
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });
  
  it('should restore a deleted email interval successfully', (done) => {
    emailIntervalServiceMock.restoreEmailInterval.and.returnValue(
      of(new HttpResponse({ status: 200 }))
    );
  
    service.restoreEmailInterval(1).subscribe((result) => {
      expect(result).toBeTrue();
      expect(emailIntervalServiceMock.restoreEmailInterval).toHaveBeenCalledWith(
        1
      );
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should get deleted email templates successfully', (done) => {
    emailServiceMock.getDeletedEmailTemplates.and.returnValue(
      of({ success: true, data: mockEmailTemplates })
    );
  
    service.getDeletedEmailtemplates().subscribe((deletedTemplates) => {
      expect(deletedTemplates).toEqual(mockEmailTemplates);
      expect(emailServiceMock.getDeletedEmailTemplates).toHaveBeenCalled();
      done();
    });
  });

  it('should get deleted email intervals successfully', (done) => {
    emailIntervalServiceMock.getDeletedIntervals.and.returnValue(
      of({ success: true, data: mockEmailIntervals })
    );
  
    service.getDeletedEmailIntervals().subscribe((deletedIntervals) => {
      expect(deletedIntervals).toEqual(mockEmailIntervals);
      expect(emailIntervalServiceMock.getDeletedIntervals).toHaveBeenCalled();
      done();
    });
  });
  
  it('should handle error while getting all email templates', (done) => {
    emailServiceMock.getEmailTemplates.and.returnValue(
      throwError(() => new Error('Error fetching email templates'))
    );
  
    service.getAllEmailTemplates().subscribe((emailTemplates) => {
      expect(emailTemplates).toEqual([]);
      expect(emailServiceMock.getEmailTemplates).toHaveBeenCalled();
      done();
    });
  });
  
  it('should handle error while getting one email template', (done) => {
    emailServiceMock.getEmailTemplate.and.returnValue(
      throwError(() => new Error('Error fetching email template'))
    );
  
    service.getOneEmailTemplate(1).subscribe((emailTemplate) => {
      expect(emailTemplate).toBeNull();
      expect(emailServiceMock.getEmailTemplate).toHaveBeenCalledWith(1);
      done();
    });
  });
  
  it('should handle error while adding a new email template', (done) => {
    emailServiceMock.createEmailTemplate.and.returnValue(
      throwError(() => new Error('Error creating email template'))
    );
  
    service.addEmailTemplate(mockEmailTemplate).subscribe((result) => {
      expect(result).toBeFalse();
      expect(emailServiceMock.createEmailTemplate).toHaveBeenCalledWith(mockEmailTemplate);
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });
  
  it('should handle error while editing an email template', (done) => {
    emailServiceMock.updateEmailTemplate.and.returnValue(
      throwError(() => new Error('Error updating email template'))
    );
  
    service.editEmailTemplate(mockEmailTemplate).subscribe((result) => {
      expect(result).toBeFalse();
      expect(emailServiceMock.updateEmailTemplate).toHaveBeenCalledWith(mockEmailTemplate);
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });
  
  it('should handle error while deleting an email template', (done) => {
    emailServiceMock.deleteEmailTemplate.and.returnValue(
      throwError(() => new Error('Error deleting email template'))
    );
  
    service.deleteEmailTemplate(1).subscribe((result) => {
      expect(result).toBeFalse();
      expect(emailServiceMock.deleteEmailTemplate).toHaveBeenCalledWith(1);
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });
  
  it('should handle error while restoring a deleted email template', (done) => {
    emailServiceMock.restoreEmailTemplate.and.returnValue(
      throwError(() => new Error('Error restoring email template'))
    );
  
    service.restoreEmailTemplate(1).subscribe((result) => {
      expect(result).toBeFalse();
      expect(emailServiceMock.restoreEmailTemplate).toHaveBeenCalledWith(1);
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while getting all email intervals', (done) => {
    emailIntervalServiceMock.getEmailIntervals.and.returnValue(
      throwError(() => new Error('Error fetching email intervals'))
    );
  
    service.getAllEmailIntervals().subscribe((emailIntervals) => {
      expect(emailIntervals).toEqual([]);
      expect(emailIntervalServiceMock.getEmailIntervals).toHaveBeenCalled();
      done();
    });
  });
  
  it('should handle error while getting one email interval', (done) => {
    emailIntervalServiceMock.getEmailInterval.and.returnValue(
      throwError(() => new Error('Error fetching email interval'))
    );
  
    service.getOneEmailIntervals(1).subscribe((emailInterval) => {
      expect(emailInterval).toBeNull();
      expect(emailIntervalServiceMock.getEmailInterval).toHaveBeenCalledWith(1);
      done();
    });
  });
  
  it('should handle error while adding a new email interval', (done) => {
    emailIntervalServiceMock.createEmailInterval.and.returnValue(
      throwError(() => new Error('Error creating email interval'))
    );
  
    service.addEmailInterval(mockEmailInterval).subscribe((result) => {
      expect(result).toBeFalse();
      expect(emailIntervalServiceMock.createEmailInterval).toHaveBeenCalledWith(mockEmailInterval);
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });
  
  it('should handle error while editing an email interval', (done) => {
    emailIntervalServiceMock.updateEmailInterval.and.returnValue(
      throwError(() => new Error('Error updating email interval'))
    );
  
    service.editEmailInterval(mockEmailInterval).subscribe((result) => {
      expect(result).toBeFalse();
      expect(emailIntervalServiceMock.updateEmailInterval).toHaveBeenCalledWith(mockEmailInterval);
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });
  
  it('should handle error while deleting an email interval', (done) => {
    emailIntervalServiceMock.deleteEmailInterval.and.returnValue(
      throwError(() => new Error('Error deleting email interval'))
    );
  
    service.deleteEmailInterval(1).subscribe((result) => {
      expect(result).toBeFalse();
      expect(emailIntervalServiceMock.deleteEmailInterval).toHaveBeenCalledWith(1);
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });
  
  it('should handle error while restoring a deleted email interval', (done) => {
    emailIntervalServiceMock.restoreEmailInterval.and.returnValue(
      throwError(() => new Error('Error restoring email interval'))
    );
  
    service.restoreEmailInterval(1).subscribe((result) => {
      expect(result).toBeFalse();
      expect(emailIntervalServiceMock.restoreEmailInterval).toHaveBeenCalledWith(1);
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });
});
