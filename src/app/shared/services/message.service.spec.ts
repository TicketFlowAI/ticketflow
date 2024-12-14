import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a success message', () => {
    service.addSuccessMessage('Success Test', 3000);
    const messages = service.messages();
    expect(messages.length).toBe(1);
    expect(messages[0]).toEqual({
      message: 'Success Test',
      type: 'success',
      duration: 3000,
    });
  });

  it('should add a warning message', () => {
    service.addWarningMessage('Warning Test', 3000);
    const messages = service.messages();
    expect(messages.length).toBe(1);
    expect(messages[0]).toEqual({
      message: 'Warning Test',
      type: 'warning',
      duration: 3000,
    });
  });

  it('should add an info message', () => {
    service.addInfoMessage('Info Test', 3000);
    const messages = service.messages();
    expect(messages.length).toBe(1);
    expect(messages[0]).toEqual({
      message: 'Info Test',
      type: 'info',
      duration: 3000,
    });
  });

  it('should add an error message', () => {
    service.addErrorMessage('Error Test', 3000);
    const messages = service.messages();
    expect(messages.length).toBe(1);
    expect(messages[0]).toEqual({
      message: 'Error Test',
      type: 'error',
      duration: 3000,
    });
  });

  it('should clear all messages', () => {
    service.addSuccessMessage('Message 1', 3000);
    service.addWarningMessage('Message 2', 3000);
    service.clearAllMessages();
    expect(service.messages().length).toBe(0);
  });

  it('should remove the message after the specified duration', fakeAsync(() => {
    service.addSuccessMessage('Temporary Message', 2000);
    expect(service.messages().length).toBe(1);
    tick(2000); 
    expect(service.messages().length).toBe(0);
  }));
});
