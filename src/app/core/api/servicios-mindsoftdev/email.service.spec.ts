import { TestBed } from '@angular/core/testing';

import { EmailService } from './email.service';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmailTemplateModel, IEmailTemplateApiResponse, IEmailTemplatesApiResponse } from '../../models/entities/email-template.model';
import { environment } from '../../../../environments/environment';

describe('EmailService', () => {
  let service: EmailService;
  let httpTestingController: HttpTestingController;

  const mockEmailTemplatesResponse: IEmailTemplatesApiResponse = {
    success: true,
    data: [
      new EmailTemplateModel(1, 'Template 1', '<html>1<html/>'),
      new EmailTemplateModel(2, 'Template 2', '<html>1<html/>'),
    ],
  };

  const mockEmailTemplateResponse: IEmailTemplateApiResponse = {
    success: true,
    data: new EmailTemplateModel(2, 'Template 2', '<html>1<html/>')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmailService],
    });
    service = TestBed.inject(EmailService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get email templates', () => {
    service.getEmailTemplates().subscribe((response) => {
      expect(response).toEqual(mockEmailTemplatesResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/emails`);
    expect(req.request.method).toBe('GET');
    req.flush(mockEmailTemplatesResponse);
  });

  it('should get a email template by ID', () => {
    const emailTemplateId = 1;

    service.getEmailTemplate(emailTemplateId).subscribe((response) => {
      expect(response).toEqual(mockEmailTemplateResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/emails/${emailTemplateId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockEmailTemplateResponse);
  });

  it('should create a email template', () => {
    const newEmailTemplate = new EmailTemplateModel(0, 'Template 3', '<html>3<html/>')

    service.createEmailTemplate(newEmailTemplate).subscribe((response) => {
      expect(response.status).toBe(201);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/emails`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newEmailTemplate);

    req.flush(null, { status: 201, statusText: 'Created' });
  });

  it('should update a email template', () => {
    const updatedEmailTemplate = new EmailTemplateModel(4, 'Template 4', '<html>4<html/>')
    service.updateEmailTemplate(updatedEmailTemplate).subscribe((response) => {
      expect(response.status).toBe(200);
    });
    
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/emails/${updatedEmailTemplate.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedEmailTemplate);

    req.flush(new HttpResponse({ status: 200, statusText: 'OK' }));
  });

  it('should delete a email template by ID', () => {
    const emailTemplateId = 1;

    service.deleteEmailTemplate(emailTemplateId).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/emails/${emailTemplateId}`);
    expect(req.request.method).toBe('DELETE');

    req.flush(new HttpResponse({ status: 200, statusText: 'OK' }));
  });
});
