import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { TicketManagementService } from './ticket-management.service';
import { TicketService } from '../api/servicios-mindsoftdev/ticket.service';
import { TicketMessageService } from '../api/servicios-mindsoftdev/ticket-message.service';
import { MessageService } from '../../shared/services/message.service';
import { TranslocoService } from '@jsverse/transloco';
import { TicketModel } from '../models/entities/ticket.model';
import { TicketMessageModel } from '../models/entities/ticket-message.model';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideTransloco } from '@jsverse/transloco';
import { isDevMode } from '@angular/core';
import { TranslocoHttpLoader } from '../../transloco-loader';
import { HttpResponse } from '@angular/common/http';

describe('TicketManagementService', () => {
  let service: TicketManagementService;
  let ticketServiceMock: jasmine.SpyObj<TicketService>;
  let ticketMessageServiceMock: jasmine.SpyObj<TicketMessageService>;
  let messageServiceMock: jasmine.SpyObj<MessageService>;
  let translocoServiceMock: jasmine.SpyObj<TranslocoService>;

  const mockTicket = new TicketModel(
    1, // id
    'Ticket A', // title
    1, // priority
    '0', // needsHumanInteraction (como string compatible)
    1, // complexity
    1, // service_contract_id
    1, // user_id
    1, // status
    0, // newClientMessage
    0, // newTechnicianMessage
    'User A', // user_name
    'Lastname A', // user_lastname
    1, // company_id
    'Company A', // company_name
    1, // service_id
    'Service A' // service_desc
  );
  const mockTickets = [mockTicket];

  const mockTicketMessage = new TicketMessageModel(1, 1, 'Message A', 1, 'User A', 'Lastname A', 'Role A', new Date());
  const mockTicketMessages = [mockTicketMessage];

  beforeEach(() => {
    const ticketSpy = jasmine.createSpyObj('TicketService', [
      'getTickets',
      'getTicket',
      'createTicket',
      'updateTicket',
      'deleteTicket',
      'restoreTicket'
    ]);
    const ticketMessageSpy = jasmine.createSpyObj('TicketMessageService', [
      'getTicketMessages',
      'createTicketMessage'
    ]);
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
          loader: TranslocoHttpLoader,
        }),
        { provide: TicketService, useValue: ticketSpy },
        { provide: TicketMessageService, useValue: ticketMessageSpy },
        { provide: MessageService, useValue: messageSpy },
        { provide: TranslocoService, useValue: translocoSpy },
      ],
    });

    service = TestBed.inject(TicketManagementService);
    ticketServiceMock = TestBed.inject(TicketService) as jasmine.SpyObj<TicketService>;
    ticketMessageServiceMock = TestBed.inject(TicketMessageService) as jasmine.SpyObj<TicketMessageService>;
    messageServiceMock = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
    translocoServiceMock = TestBed.inject(TranslocoService) as jasmine.SpyObj<TranslocoService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /** Ticket CRUD **/
  it('should get all tickets successfully', (done) => {
    ticketServiceMock.getTickets.and.returnValue(of({ success: true, data: mockTickets }));

    service.getAllTickets().subscribe((tickets) => {
      expect(tickets).toEqual(mockTickets);
      expect(ticketServiceMock.getTickets).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while getting all tickets', (done) => {
    ticketServiceMock.getTickets.and.returnValue(throwError(() => new Error('Error fetching tickets')));

    service.getAllTickets().subscribe((tickets) => {
      expect(tickets).toEqual([]);
      expect(ticketServiceMock.getTickets).toHaveBeenCalled();
      done();
    });
  });

  it('should get one ticket successfully', (done) => {
    ticketServiceMock.getTicket.and.returnValue(of({ success: true, data: mockTicket }));

    service.getOneTicket(1).subscribe((ticket) => {
      expect(ticket).toEqual(mockTicket);
      expect(ticketServiceMock.getTicket).toHaveBeenCalledWith(1);
      done();
    });
  });

  it('should handle error while getting one ticket', (done) => {
    ticketServiceMock.getTicket.and.returnValue(throwError(() => new Error('Error fetching ticket')));

    service.getOneTicket(1).subscribe((ticket) => {
      expect(ticket).toBeNull();
      expect(ticketServiceMock.getTicket).toHaveBeenCalledWith(1);
      done();
    });
  });


  it('should add a ticket successfully', (done) => {
    ticketServiceMock.createTicket.and.returnValue(of({ success: true, data: mockTicket }));
    ticketMessageServiceMock.createTicketMessage.and.returnValue(of(new HttpResponse({ status: 201 })));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.addTicket(mockTicket, 'Initial message').subscribe((result) => {
      expect(result).toBeTrue();
      expect(ticketServiceMock.createTicket).toHaveBeenCalledWith(mockTicket);
      expect(ticketMessageServiceMock.createTicketMessage).toHaveBeenCalled();
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while adding a ticket', (done) => {
    ticketServiceMock.createTicket.and.returnValue(throwError(() => new Error('Error creating ticket')));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.addTicket(mockTicket, 'Initial message').subscribe((result) => {
      expect(result).toBeFalse();
      expect(ticketServiceMock.createTicket).toHaveBeenCalledWith(mockTicket);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should update a ticket successfully', (done) => {
    ticketServiceMock.updateTicket.and.returnValue(of(new HttpResponse({ status: 200 })));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.editTicket(mockTicket).subscribe((result) => {
      expect(result).toBeTrue();
      expect(ticketServiceMock.updateTicket).toHaveBeenCalledWith(mockTicket);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while updating a ticket', (done) => {
    ticketServiceMock.updateTicket.and.returnValue(throwError(() => new Error('Error updating ticket')));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.editTicket(mockTicket).subscribe((result) => {
      expect(result).toBeFalse();
      expect(ticketServiceMock.updateTicket).toHaveBeenCalledWith(mockTicket);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should delete a ticket successfully', (done) => {
    ticketServiceMock.deleteTicket.and.returnValue(of(new HttpResponse({ status: 200 })));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.deleteTicket(1).subscribe((result) => {
      expect(result).toBeTrue();
      expect(ticketServiceMock.deleteTicket).toHaveBeenCalledWith(1);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while deleting a ticket', (done) => {
    ticketServiceMock.deleteTicket.and.returnValue(throwError(() => new Error('Error deleting ticket')));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.deleteTicket(1).subscribe((result) => {
      expect(result).toBeFalse();
      expect(ticketServiceMock.deleteTicket).toHaveBeenCalledWith(1);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });

    // Close Ticket
    it('should close a ticket successfully', (done) => {
      ticketServiceMock.closeTicket.and.returnValue(of(new HttpResponse({ status: 200 })));
      translocoServiceMock.translateObject.and.returnValue([]);
  
      service.closeTicket(1).subscribe((result) => {
        expect(result).toBeTrue();
        expect(ticketServiceMock.closeTicket).toHaveBeenCalledWith(1);
        expect(translocoServiceMock.translateObject).toHaveBeenCalled();
        expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
        done();
      });
    });
  
    it('should handle error while closing a ticket', (done) => {
      ticketServiceMock.closeTicket.and.returnValue(throwError(() => new Error('Error closing ticket')));
      translocoServiceMock.translateObject.and.returnValue([]);
  
      service.closeTicket(1).subscribe((result) => {
        expect(result).toBeFalse();
        expect(ticketServiceMock.closeTicket).toHaveBeenCalledWith(1);
        expect(translocoServiceMock.translateObject).toHaveBeenCalled();
        expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
        done();
      });
    });
  
    // Open Ticket
    it('should open a ticket successfully', (done) => {
      ticketServiceMock.reopenTicket.and.returnValue(of(new HttpResponse({ status: 200 })));
      translocoServiceMock.translateObject.and.returnValue([]);
  
      service.openTicket(1).subscribe((result) => {
        expect(result).toBeTrue();
        expect(ticketServiceMock.reopenTicket).toHaveBeenCalledWith(1);
        expect(translocoServiceMock.translateObject).toHaveBeenCalled();
        expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
        done();
      });
    });
  
    it('should handle error while opening a ticket', (done) => {
      ticketServiceMock.reopenTicket.and.returnValue(throwError(() => new Error('Error opening ticket')));
      translocoServiceMock.translateObject.and.returnValue([]);
  
      service.openTicket(1).subscribe((result) => {
        expect(result).toBeFalse();
        expect(ticketServiceMock.reopenTicket).toHaveBeenCalledWith(1);
        expect(translocoServiceMock.translateObject).toHaveBeenCalled();
        expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
        done();
      });
    });

  it('should restore a ticket successfully', (done) => {
    ticketServiceMock.restoreTicket.and.returnValue(of(new HttpResponse({ status: 200 })));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.restoreTicket(1).subscribe((result) => {
      expect(result).toBeTrue();
      expect(ticketServiceMock.restoreTicket).toHaveBeenCalledWith(1);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while restoring a ticket', (done) => {
    ticketServiceMock.restoreTicket.and.returnValue(throwError(() => new Error('Error restoring ticket')));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.restoreTicket(1).subscribe((result) => {
      expect(result).toBeFalse();
      expect(ticketServiceMock.restoreTicket).toHaveBeenCalledWith(1);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while reassigning a ticket', (done) => {
    ticketServiceMock.reassignTicket.and.returnValue(throwError(() => new Error('Error reassigning ticket')));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.reassignTicket(1).subscribe((result) => {
      expect(result).toBeFalse();
      expect(ticketServiceMock.reassignTicket).toHaveBeenCalledWith(1);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should handle ticket needing human interaction successfully', (done) => {
    ticketServiceMock.needHumanInteraction.and.returnValue(of(new HttpResponse({ status: 200 })));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.ticketNeedHumanInteraction(1).subscribe((result) => {
      expect(result).toBeTrue();
      expect(ticketServiceMock.needHumanInteraction).toHaveBeenCalledWith(1);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while marking ticket for human interaction', (done) => {
    ticketServiceMock.needHumanInteraction.and.returnValue(throwError(() => new Error('Error marking ticket for human interaction')));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.ticketNeedHumanInteraction(1).subscribe((result) => {
      expect(result).toBeFalse();
      expect(ticketServiceMock.needHumanInteraction).toHaveBeenCalledWith(1);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should get all messages from a ticket successfully', (done) => {
    ticketMessageServiceMock.getTicketMessages.and.returnValue(of({ success: true, data: mockTicketMessages }));

    service.getAllMessagesFromTicket('1').subscribe((messages) => {
      expect(messages).toEqual(mockTicketMessages);
      expect(ticketMessageServiceMock.getTicketMessages).toHaveBeenCalledWith('1');
      done();
    });
  });

  it('should handle error while getting all messages from a ticket', (done) => {
    ticketMessageServiceMock.getTicketMessages.and.returnValue(throwError(() => new Error('Error fetching ticket messages')));

    service.getAllMessagesFromTicket('1').subscribe((messages) => {
      expect(messages).toEqual([]);
      expect(ticketMessageServiceMock.getTicketMessages).toHaveBeenCalledWith('1');
      done();
    });
  });

  it('should add a ticket message successfully', (done) => {
    ticketMessageServiceMock.createTicketMessage.and.returnValue(of(new HttpResponse({ status: 201 })));

    service.addTicketMessage(mockTicketMessage).subscribe((result) => {
      expect(result).toBeTrue();
      expect(ticketMessageServiceMock.createTicketMessage).toHaveBeenCalledWith(mockTicketMessage);
      done();
    });
  });

  it('should handle error while adding a ticket message', (done) => {
    ticketMessageServiceMock.createTicketMessage.and.returnValue(throwError(() => new Error('Error creating ticket message')));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.addTicketMessage(mockTicketMessage).subscribe((result) => {
      expect(result).toBeFalse();
      expect(ticketMessageServiceMock.createTicketMessage).toHaveBeenCalledWith(mockTicketMessage);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });
});
