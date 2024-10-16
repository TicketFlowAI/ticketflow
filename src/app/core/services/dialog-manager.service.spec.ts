import { TestBed } from '@angular/core/testing';

import { DialogManagerService } from './dialog-manager.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../features/auth/login/login.component';

describe('DialogManagerService', () => {
  let service: DialogManagerService;
  let matDialogSpy: jasmine.SpyObj<MatDialog>

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      providers: [
        {provide: MatDialog, useValue: spy}
      ]
    });
    service = TestBed.inject(DialogManagerService);
    matDialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open the login dialog', () => {
    service.openLoginDialog()

    expect(matDialogSpy.open).toHaveBeenCalledWith(LoginComponent, {
      width: '500px',
      height: '400px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms'
    });
  });

  it('should open the new ticket dialog', () => {
    service.openNewTicketDialog()

    expect(matDialogSpy.open).toHaveBeenCalledWith(LoginComponent, {
      width: '500px',
      height: '400px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms'
    });
  });
});
