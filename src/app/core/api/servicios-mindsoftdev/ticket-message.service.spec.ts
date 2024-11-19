import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TicketMessageService } from './ticket-message.service';
import { environment } from '../../../../environments/environment';
import {
  ITicketMessagesApiResponse,
  ITicketMessageApiResponse,
  TicketMessageModel,
} from '../../models/entities/ticket-message.model';

describe('TicketMessageService', () => {
  let service: TicketMessageService;
  let httpTestingController: HttpTestingController;

  const mockMessagesResponse: ITicketMessagesApiResponse = {
    success: true,
    data: [
      new TicketMessageModel(1, 101, 'Message A', 1, 'John', 'Doe', 'Admin', new Date('2024-11-19T10:00:00')),
      new TicketMessageModel(2, 102, 'Message B', 2, 'Jane', 'Smith', 'User', new Date('2024-11-19T11:00:00')),
    ],
  };

  const mockMessageResponse: ITicketMessageApiResponse = {
    success: true,
    data: new TicketMessageModel(1, 101, 'Message A', 1, 'John', 'Doe', 'Admin', new Date('2024-11-19T10:00:00')),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TicketMessageService],
    });
    service = TestBed.inject(TicketMessageService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get ticket messages by ticket ID', () => {
    const ticketId = '101';

    service.getTicketMessages(ticketId).subscribe((response) => {
      expect(response).toEqual(mockMessagesResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/messages/${ticketId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMessagesResponse);
  });

  it('should get a single ticket message by ID', () => {
    const messageId = 1;

    service.getTicketMessage(messageId).subscribe((response) => {
      expect(response).toEqual(mockMessageResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/messages/${messageId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMessageResponse);
  });

  it('should create a ticket message', () => {
    const newMessage = new TicketMessageModel(0, 103, 'New Message', 3, 'Alice', 'Johnson', 'Moderator', new Date());

    service.createTicketMessage(newMessage).subscribe((response) => {
      expect(response.status).toBe(201);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/messages`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newMessage);

    req.flush({}, { status: 201, statusText: 'Created' });
  });

  it('should update a ticket message', () => {
    const updatedMessage = new TicketMessageModel(1, 101, 'Updated Message', 1, 'John', 'Doe', 'Admin', new Date());

    service.updateTicketMessage(updatedMessage).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/messages/${updatedMessage.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedMessage);

    req.flush({}, { status: 200, statusText: 'OK' });
  });

  it('should delete a ticket message by ID', () => {
    const messageId = 1;

    service.deleteTicketMessage(messageId).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/messages/${messageId}`);
    expect(req.request.method).toBe('DELETE');

    req.flush({}, { status: 200, statusText: 'OK' });
  });
});
