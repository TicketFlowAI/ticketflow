import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { DialogManagerService } from './dialog-manager.service';

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

  // Test for openLoginDialog
  it('should open the LoginComponent dialog', () => {
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) } as any);
    service.openLoginDialog();
    expect(matDialogMock.open).toHaveBeenCalledWith(jasmine.any(Function), {
      width: '500px',
      height: '400px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  });

  // Test for openActionConfirmationDialog
  it('should open the ActionConfirmationComponent dialog and return true when confirmed', (done) => {
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) } as any);

    service.openActionConfirmationDialog('Confirm?').subscribe((result) => {
      expect(result).toBeTrue();
      done();
    });

    expect(matDialogMock.open).toHaveBeenCalledWith(jasmine.any(Function), {
      width: '450px',
      height: '200',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
      data: 'Confirm?',
    });
  });

  // Test for openManageCompanyDialog
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

  // Test for openCompanyInfoDialog
  it('should open the CompanyInfoComponent dialog', () => {
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) } as any);
    const mockCompany = { id: 1, name: 'Company A' };
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

  // Test for openManageServiceDialog
  it('should open the ManageServiceComponent dialog and return true after closing', (done) => {
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) } as any);
    service.openManageServiceDialog(null).subscribe((result) => {
      expect(result).toBeTrue();
      done();
    });

    expect(matDialogMock.open).toHaveBeenCalledWith(jasmine.any(Function), {
      width: '500px',
      height: '400px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: null,
    });
  });

  // Test for openManageServiceCategoryDialog
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

  // Test for openManageServiceTaxDialog
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

  // Test for openTicketInfoDialog
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

  // Test for openServiceContractInfoDialog
  it('should open the ServiceContractInfoComponent dialog', () => {
    const mockServiceContract = { id: 1, company: 'Company A' };
    matDialogMock.open.and.returnValue({ afterClosed: () => of(true) } as any);
    service.openServiceContractInfoDialog(mockServiceContract as any);
    expect(matDialogMock.open).toHaveBeenCalledWith(jasmine.any(Function), {
      width: '500px',
      height: '325px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: mockServiceContract,
    });
  });

  // Test for openManageServiceContractDialog
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

  // Test for openManageServiceContractTermDialog
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

  // Test for openManageUserDialog
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

  // Test for openUserInfoDialog
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
});
