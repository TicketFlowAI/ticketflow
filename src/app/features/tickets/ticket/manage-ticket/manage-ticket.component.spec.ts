import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageTicketComponent } from './manage-ticket.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideTransloco } from '@jsverse/transloco';
import { isDevMode } from '@angular/core';
import { TranslocoHttpLoader } from '../../../../transloco-loader';
import { TicketManagementService } from '../../../../core/services/ticket-management.service';
import { ServiceContractManagementService } from '../../../../core/services/service-contract-management.service';
import { UserManagementService } from '../../../../core/services/user-management.service';
import { of } from 'rxjs';
import { TicketModel } from '../../../../core/models/entities/ticket.model';
import { ServiceContractModel } from '../../../../core/models/entities/service-contract.model';
import { UserModel } from '../../../../core/models/entities/user.model';

describe('ManageTicketComponent', () => {
  let component: ManageTicketComponent;
  let fixture: ComponentFixture<ManageTicketComponent>;
  let ticketManagementServiceSpy: jasmine.SpyObj<TicketManagementService>;
  let serviceContractManagementServiceSpy: jasmine.SpyObj<ServiceContractManagementService>;
  let userManagementServiceSpy: jasmine.SpyObj<UserManagementService>;

  beforeEach(async () => {
    const mockTicketManagementService = jasmine.createSpyObj('TicketManagementService', ['editTicket', 'addTicket']);
    const mockServiceContractManagementService = jasmine.createSpyObj('ServiceContractManagementService', [
      'getAllServiceContracts',
    ]);
    const mockUserManagementService = jasmine.createSpyObj('UserManagementService', ['getMyUser']);

    mockTicketManagementService.editTicket.and.returnValue(of(null));
    mockTicketManagementService.addTicket.and.returnValue(of(null));
    mockServiceContractManagementService.getAllServiceContracts.and.returnValue(of([new ServiceContractModel(1, 2, 3, 4, 'Company', 'Service', 'Term', 1000)]));
    mockUserManagementService.getMyUser.and.returnValue(of(new UserModel(1, 'John', 'Doe', 'john.doe@example.com', 1, 'Admin', 'Test Company')));

    await TestBed.configureTestingModule({
      imports: [ManageTicketComponent],
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
          loader: TranslocoHttpLoader,
        }),
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            ticket: new TicketModel(1, 'Test Ticket', 2, true, 3, 1, 1, 1, true, false, '', '', 1, 'Test Company', 1, 'Test Service'),
          },
        },
        { provide: TicketManagementService, useValue: mockTicketManagementService },
        { provide: ServiceContractManagementService, useValue: mockServiceContractManagementService },
        { provide: UserManagementService, useValue: mockUserManagementService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageTicketComponent);
    component = fixture.componentInstance;
    ticketManagementServiceSpy = TestBed.inject(TicketManagementService) as jasmine.SpyObj<TicketManagementService>;
    serviceContractManagementServiceSpy = TestBed.inject(ServiceContractManagementService) as jasmine.SpyObj<ServiceContractManagementService>;
    userManagementServiceSpy = TestBed.inject(UserManagementService) as jasmine.SpyObj<UserManagementService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize ticket data from MAT_DIALOG_DATA', () => {
    const ticket = component.data.ticket;
    expect(ticket).toBeTruthy();
    expect(ticket?.title).toBe('Test Ticket');
    expect(ticket?.priority).toBe(2);
    expect(ticket?.needsHumanInteraction).toBeTrue();
  });

  it('should fetch service contracts and user data on initialization', () => {
    expect(serviceContractManagementServiceSpy.getAllServiceContracts).toHaveBeenCalled();
    expect(userManagementServiceSpy.getMyUser).toHaveBeenCalled();
    expect(component.serviceContracts.length).toBeGreaterThan(0);
    expect(component.user).toBeTruthy();
  });

  it('should call editTicket and close dialog on save for existing ticket', () => {
    component.onSaveClick();
    expect(ticketManagementServiceSpy.editTicket).toHaveBeenCalled();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should call addTicket and close dialog on save for new ticket', () => {
    component.data.ticket = null;
    component.onSaveClick();
    expect(ticketManagementServiceSpy.addTicket).toHaveBeenCalled();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });
});
