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

  const mockTicket = new TicketModel(1, 'Ticket A', 1, false, 1, 1, 1, 1, false, false, 'User A', 'Lastname A', 1, 'Company A', 1, 'Service A');
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
    ]);
    const ticketMessageSpy = jasmine.createSpyObj('TicketMessageService', [
      'getTicketMessages',
      'getTicketMessage',
      'createTicketMessage',
      'updateTicketMessage',
      'deleteTicketMessage',
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

  /** Ticket CRUD **/
  // Get All
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

  // Get One
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

  // Add
  it('should add a ticket successfully', (done) => {
    ticketServiceMock.createTicket.and.returnValue(of(new HttpResponse({ status: 201 })));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.addTicket(mockTicket).subscribe((result) => {
      expect(result).toBeTrue();
      expect(ticketServiceMock.createTicket).toHaveBeenCalledWith(mockTicket);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while adding a ticket', (done) => {
    ticketServiceMock.createTicket.and.returnValue(throwError(() => new Error('Error creating ticket')));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.addTicket(mockTicket).subscribe((result) => {
      expect(result).toBeFalse();
      expect(ticketServiceMock.createTicket).toHaveBeenCalledWith(mockTicket);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });

  // Edit
  it('should edit a ticket successfully', (done) => {
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

  it('should handle error while editing a ticket', (done) => {
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

  // Delete
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

  /** Ticket Message CRUD **/
  // Get All Messages
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

  // Get One Message
  it('should get one ticket message successfully', (done) => {
    ticketMessageServiceMock.getTicketMessage.and.returnValue(of({ success: true, data: mockTicketMessage }));

    service.getOneTicketMessage(1).subscribe((message) => {
      expect(message).toEqual(mockTicketMessage);
      expect(ticketMessageServiceMock.getTicketMessage).toHaveBeenCalledWith(1);
      done();
    });
  });

  it('should handle error while getting one ticket message', (done) => {
    ticketMessageServiceMock.getTicketMessage.and.returnValue(throwError(() => new Error('Error fetching ticket message')));

    service.getOneTicketMessage(1).subscribe((message) => {
      expect(message).toBeNull();
      expect(ticketMessageServiceMock.getTicketMessage).toHaveBeenCalledWith(1);
      done();
    });
  });

  // Add Message
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

  // Edit Message
  it('should edit a ticket message successfully', (done) => {
    ticketMessageServiceMock.updateTicketMessage.and.returnValue(of(new HttpResponse({ status: 200 })));

    service.editTicketMessage(mockTicketMessage).subscribe((result) => {
      expect(result).toBeTrue();
      expect(ticketMessageServiceMock.updateTicketMessage).toHaveBeenCalledWith(mockTicketMessage);
      done();
    });
  });

  it('should handle error while editing a ticket message', (done) => {
    ticketMessageServiceMock.updateTicketMessage.and.returnValue(throwError(() => new Error('Error updating ticket message')));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.editTicketMessage(mockTicketMessage).subscribe((result) => {
      expect(result).toBeFalse();
      expect(ticketMessageServiceMock.updateTicketMessage).toHaveBeenCalledWith(mockTicketMessage);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });

  // Delete Message
  it('should delete a ticket message successfully', (done) => {
    ticketMessageServiceMock.deleteTicketMessage.and.returnValue(of(new HttpResponse({ status: 200 })));

    service.deleteTicketMessage(1).subscribe((result) => {
      expect(result).toBeTrue();
      expect(ticketMessageServiceMock.deleteTicketMessage).toHaveBeenCalledWith(1);
      done();
    });
  });

  it('should handle error while deleting a ticket message', (done) => {
    ticketMessageServiceMock.deleteTicketMessage.and.returnValue(throwError(() => new Error('Error deleting ticket message')));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.deleteTicketMessage(1).subscribe((result) => {
      expect(result).toBeFalse();
      expect(ticketMessageServiceMock.deleteTicketMessage).toHaveBeenCalledWith(1);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });
});
