import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { DialogManagerService } from './dialog-manager.service';
import { ManageServiceContractTermComponent } from '../../features/service-contracts/service-contract-term/manage-service-contract-term/manage-service-contract-term.component';
import { ServiceRequestComponent } from '../../features/service-contracts/service-contract/service-request/service-request.component';
import { AiManageClassifiersComponent } from '../../features/settings/ai/ai-manage-classifiers/ai-manage-classifiers.component';
import { EmailParametersComponent } from '../../features/settings/email/email-parameters/email-parameters.component';
import { SatisfactionSurveyInfoComponent } from '../../features/tickets/survey/satisfaction-survey-info/satisfaction-survey-info.component';
import { SatisfactionSurveyComponent } from '../../features/tickets/survey/satisfaction-survey/satisfaction-survey.component';
import { TechnicianHistoryComponent } from '../../features/tickets/ticket/technician-history/technician-history.component';

describe('DialogManagerService', () => {
  let service: DialogManagerService;
  let matDialogMock: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      providers: [
        DialogManagerService,
        { provide: MatDialog, useValue: dialogSpy },
      ],
    });

    service = TestBed.inject(DialogManagerService);
    matDialogMock = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open the LoginComponent dialog', () => {
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) } as any);
    service.openLoginDialog();
    expect(matDialogMock.open).toHaveBeenCalledWith(jasmine.any(Function), {
      width: '500px',
      height: '450px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  });

  it('should open the ActionConfirmationComponent dialog and return true when confirmed', (done) => {
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) } as any);
    service.openActionConfirmationDialog('Are you sure?').subscribe((result) => {
      expect(result).toBeTrue();
      done();
    });
    expect(matDialogMock.open).toHaveBeenCalledWith(jasmine.any(Function), {
      width: '450px',
      height: '200',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
      data: 'Are you sure?',
    });
  });

  it('should open the ActionConfirmationComponent dialog and return false when canceled', (done) => {
    matDialogMock.open.and.returnValue({ afterClosed: () => of(false) } as any);
    service.openActionConfirmationDialog('Are you sure?').subscribe((result) => {
      expect(result).toBeFalse();
      done();
    });
    expect(matDialogMock.open).toHaveBeenCalledWith(jasmine.any(Function), {
      width: '450px',
      height: '200',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
      data: 'Are you sure?',
    });
  });

  it('should open the ManageCompanyComponent dialog and return true after closing', (done) => {
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) } as any);
    service.openManageCompanyDialog(null).subscribe((result) => {
      expect(result).toBeTrue();
      done();
    });
    expect(matDialogMock.open).toHaveBeenCalledWith(jasmine.any(Function), {
      width: '800px',
      maxWidth: '100vw',
      height: '500px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: null,
    });
  });

  it('should open the CompanyInfoComponent dialog', () => {
    const mockCompany = { id: 1, name: 'Company A' };
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) } as any);
    service.openCompanyInfoDialog(mockCompany as any);
    expect(matDialogMock.open).toHaveBeenCalledWith(jasmine.any(Function), {
      width: '600px',
      maxWidth: '100vw',
      height: '450px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: mockCompany,
    });
  });

  it('should open the ManageTicketComponent dialog and return true after closing', (done) => {
    const mockTicketDialogData = { ticket: null };
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) } as any);
  
    service.openManageTicketDialog(mockTicketDialogData as any).subscribe((result) => {
      expect(result).toBeTrue();
      done();
    });
  
    expect(matDialogMock.open).toHaveBeenCalledWith(jasmine.any(Function), {
      width: '800px',
      maxWidth: '100vw',
      height: mockTicketDialogData.ticket ? '460px' : '570px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: mockTicketDialogData,
    });
  });

  it('should open the ManageTicketComponent dialog with the correct height based on ticket data', () => {
    const mockWithTicket = { ticket: {} };
    const mockWithoutTicket = { ticket: null };

    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) } as any);
  
    // Call service with data containing a ticket
    service.openManageTicketDialog(mockWithTicket as any);
    expect(matDialogMock.open).toHaveBeenCalledWith(jasmine.any(Function), {
      width: '800px',
      maxWidth: '100vw',
      height: '460px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: mockWithTicket,
    });
  
    // Call service with data containing no ticket
    service.openManageTicketDialog(mockWithoutTicket as any);
    expect(matDialogMock.open).toHaveBeenCalledWith(jasmine.any(Function), {
      width: '800px',
      maxWidth: '100vw',
      height: '570px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: mockWithoutTicket,
    });
  });
  
  
  it('should open the TicketInfoComponent dialog', () => {
    const mockTicket = { id: 1, title: 'Ticket A' };
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) } as any);
  
    service.openTicketInfoDialog(mockTicket as any);
    expect(matDialogMock.open).toHaveBeenCalledWith(jasmine.any(Function), {
      width: '600px',
      maxWidth: '100vw',
      height: '450px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: mockTicket,
    });
  });  

  it('should open the ManageServiceComponent dialog and return true after closing', (done) => {
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) } as any);
    service.openManageServiceDialog(null).subscribe((result) => {
      expect(result).toBeTrue();
      done();
    });
    expect(matDialogMock.open).toHaveBeenCalledWith(jasmine.any(Function), {
      width: '500px',
      height: '450px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: null,
    });
  });

  it('should open the ServiceInfoComponent dialog', () => {
    const mockService = { id: 1, name: 'Service A' };
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) } as any);
  
    service.openServiceInfoDialog(mockService as any);
    expect(matDialogMock.open).toHaveBeenCalledWith(jasmine.any(Function), {
      width: '500px',
      height: '400px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: mockService,
    });
  });

  it('should open the ManageServiceCategoryComponent dialog and return true after closing', (done) => {
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) } as any);
    service.openManageServiceCategoryDialog(null).subscribe((result) => {
      expect(result).toBeTrue();
      done();
    });
    expect(matDialogMock.open).toHaveBeenCalledWith(jasmine.any(Function), {
      width: '500px',
      height: '230px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: null,
    });
  });

  it('should open the ManageServiceTaxComponent dialog and return true after closing', (done) => {
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) } as any);
    service.openManageServiceTaxDialog(null).subscribe((result) => {
      expect(result).toBeTrue();
      done();
    });
    expect(matDialogMock.open).toHaveBeenCalledWith(jasmine.any(Function), {
      width: '500px',
      height: '310px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: null,
    });
  });

  it('should open the TicketInfoComponent dialog', () => {
    const mockTicket = { id: 1, title: 'Ticket A' };
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) } as any);
    service.openTicketInfoDialog(mockTicket as any);
    expect(matDialogMock.open).toHaveBeenCalledWith(jasmine.any(Function), {
      width: '600px',
      maxWidth: '100vw',
      height: '450px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: mockTicket,
    });
  });

  it('should open the ServiceContractInfoComponent dialog', () => {
    const mockServiceContract = { id: 1, company: 'Company A' };
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) } as any);
    service.openServiceContractInfoDialog(mockServiceContract as any);
    expect(matDialogMock.open).toHaveBeenCalledWith(jasmine.any(Function), {
      width: '500px',
      height: '400px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: mockServiceContract,
    });
  });

  it('should open the ManageServiceContractComponent dialog and return true after closing', (done) => {
    const mockDialogData = { serviceContract: null };
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) } as any);
    service.openManageServiceContractDialog(mockDialogData as any).subscribe((result) => {
      expect(result).toBeTrue();
      done();
    });
    expect(matDialogMock.open).toHaveBeenCalledWith(jasmine.any(Function), {
      width: '500px',
      height: '400px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: mockDialogData,
    });
  });

  it('should open the ManageServiceContractTermComponent dialog and return true after closing', (done) => {
    const mockServiceContractTerm = { id: 1, term: 'Monthly', months: 12 };
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) } as any);
    service.openManageServiceContractTermDialog(mockServiceContractTerm as any).subscribe((result) => {
      expect(result).toBeTrue();
      done();
    });
    expect(matDialogMock.open).toHaveBeenCalledWith(jasmine.any(Function), {
      width: '500px',
      height: '310px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: mockServiceContractTerm,
    });
  });

  it('should open the ManageUserComponent dialog and return true after closing', (done) => {
    const mockUser = { id: 1, name: 'John Doe', role: 'technician' };
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) } as any);
    service.openManageUserDialog(mockUser as any).subscribe((result) => {
      expect(result).toBeTrue();
      done();
    });
    expect(matDialogMock.open).toHaveBeenCalledWith(jasmine.any(Function), {
      width: '600px',
      maxWidth: '100vw',
      height: '460px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: mockUser,
    });
  });

  it('should open the UserInfoComponent dialog', () => {
    const mockUser = { id: 1, name: 'John Doe', role: 'technician' };
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) } as any);
    service.openUserInfoDialog(mockUser as any);
    expect(matDialogMock.open).toHaveBeenCalledWith(jasmine.any(Function), {
      width: '600px',
      maxWidth: '100vw',
      height: '400px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: mockUser,
    });
  });

  it('should open the ManageEmailTemplateComponent dialog and return true after closing', (done) => {
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) } as any);
    service.openManageEmailTemplateDialog(null).subscribe((result) => {
      expect(result).toBeTrue();
      done();
    });
    expect(matDialogMock.open).toHaveBeenCalledWith(jasmine.any(Function), {
      width: '600px',
      maxWidth: '100vw',
      height: '400px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: null,
    });
  });

  it('should open the TechnicianHistoryComponent dialog', () => {
    const mockTicket = { id: 1, title: 'Ticket A' };
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) } as any);
  
    service.openTicketTechnicianHistory(mockTicket as any);
  
    expect(matDialogMock.open).toHaveBeenCalledWith(TechnicianHistoryComponent, {
      width: '600px',
      maxWidth: '100vw',
      height: '450px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: mockTicket,
    });
  });

  it('should open the ServiceRequestComponent dialog and return true after closing', (done) => {
    const mockServiceContractData = { id: 1 };
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) } as any);
  
    service.openServiceContractRequestDialog(mockServiceContractData as any).subscribe((result) => {
      expect(result).toBeTrue();
      done();
    });
  
    expect(matDialogMock.open).toHaveBeenCalledWith(ServiceRequestComponent, {
      width: '500px',
      height: '350px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: mockServiceContractData,
    });
  });

  it('should open the EmailParametersComponent dialog', () => {
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) } as any);
  
    service.openEmailParametersInfoDialog();
  
    expect(matDialogMock.open).toHaveBeenCalledWith(EmailParametersComponent, {
      width: '600px',
      maxWidth: '100vw',
      height: '400px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  });

  
  it('should open the AiManageClassifiersComponent dialog', () => {
    const mockClassifiers = [{ id: 1, name: 'Classifier A' }];
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) } as any);
  
    service.openAiClaassifierSelection(mockClassifiers as any);
  
    expect(matDialogMock.open).toHaveBeenCalledWith(AiManageClassifiersComponent, {
      width: '700px',
      maxWidth: '100vw',
      height: '325px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: mockClassifiers,
    });
  });

  it('should open the ManageServiceContractTermComponent dialog and return true after closing', (done) => {
    const mockServiceContractTerm = { id: 1, term: 'Monthly', months: 12 };
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) } as any);
  
    service.openManageServiceContractTermDialog(mockServiceContractTerm as any).subscribe((result) => {
      expect(result).toBeTrue();
      done();
    });
  
    expect(matDialogMock.open).toHaveBeenCalledWith(ManageServiceContractTermComponent, {
      width: '500px',
      height: '310px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: mockServiceContractTerm,
    });
  });

  it('should open the SatisfactionSurveyComponent dialog and return true after closing', (done) => {
    const mockTicket = { id: 1, title: 'Ticket A' };
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) } as any);
  
    service.openTicketSurveyDialog(mockTicket as any).subscribe((result) => {
      expect(result).toBeTrue();
      done();
    });
  
    expect(matDialogMock.open).toHaveBeenCalledWith(SatisfactionSurveyComponent, {
      width: '700px',
      maxWidth: '100vw',
      height: '600px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: mockTicket,
    });
  });

  it('should open the SatisfactionSurveyInfoComponent dialog and return true after closing', (done) => {
    const mockTicket = { id: 1, title: 'Ticket A' };
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) } as any);
  
    service.openTicketSurveyInfoDialog(mockTicket as any).subscribe((result) => {
      expect(result).toBeTrue();
      done();
    });
  
    expect(matDialogMock.open).toHaveBeenCalledWith(SatisfactionSurveyInfoComponent, {
      width: '700px',
      maxWidth: '100vw',
      height: '600px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: mockTicket,
    });
  });
  
  
});
