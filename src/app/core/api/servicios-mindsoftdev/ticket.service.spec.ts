import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TicketService } from './ticket.service';
import { environment } from '../../../../environments/environment';
import { ITicketsApiResponse, ITicketApiResponse, TicketModel } from '../../models/entities/ticket.model';

describe('TicketService', () => {
  let service: TicketService;
  let httpTestingController: HttpTestingController;

  const mockTicketsResponse: ITicketsApiResponse = {
    success: true,
    data: [
      new TicketModel(
        1,
        'Ticket A',
        1,
        true,
        3,
        1,
        1,
        1,
        true,
        false,
        'John',
        'Doe',
        1,
        'Company A',
        1,
        'Service A'
      ),
      new TicketModel(
        2,
        'Ticket B',
        2,
        false,
        2,
        2,
        2,
        2,
        false,
        true,
        'Jane',
        'Smith',
        2,
        'Company B',
        2,
        'Service B'
      ),
    ],
  };

  const mockTicketResponse: ITicketApiResponse = {
    success: true,
    data: new TicketModel(
      1,
      'Ticket A',
      1,
      true,
      3,
      1,
      1,
      1,
      true,
      false,
      'John',
      'Doe',
      1,
      'Company A',
      1,
      'Service A'
    ),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TicketService],
    });
    service = TestBed.inject(TicketService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get tickets', () => {
    service.getTickets().subscribe((response) => {
      expect(response).toEqual(mockTicketsResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/tickets`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTicketsResponse);
  });

  it('should get a single ticket by ID', () => {
    const ticketId = 1;

    service.getTicket(ticketId).subscribe((response) => {
      expect(response).toEqual(mockTicketResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/tickets/${ticketId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTicketResponse);
  });

  it('should create a ticket', () => {
    const newTicket = new TicketModel(
      0,
      'New Ticket',
      3,
      true,
      2,
      1,
      1,
      1,
      false,
      false,
      'Alice',
      'Johnson',
      1,
      'Company C',
      1,
      'Service C'
    );

    service.createTicket(newTicket).subscribe((response) => {
      expect(response.status).toBe(201);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/tickets`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTicket);

    req.flush({}, { status: 201, statusText: 'Created' });
  });

  it('should update a ticket', () => {
    const updatedTicket = new TicketModel(
      1,
      'Updated Ticket',
      2,
      false,
      4,
      1,
      1,
      1,
      false,
      true,
      'John',
      'Doe',
      1,
      'Company A',
      1,
      'Service A'
    );

    service.updateTicket(updatedTicket).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/tickets/${updatedTicket.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedTicket);

    req.flush({}, { status: 200, statusText: 'OK' });
  });

  it('should delete a ticket by ID', () => {
    const ticketId = 1;

    service.deleteTicket(ticketId).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/tickets/${ticketId}`);
    expect(req.request.method).toBe('DELETE');

    req.flush({}, { status: 200, statusText: 'OK' });
  });
});
