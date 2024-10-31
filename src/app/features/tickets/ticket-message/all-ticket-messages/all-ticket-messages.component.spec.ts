import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTicketMessagesComponent } from './all-ticket-messages.component';

describe('AllTicketMessagesComponent', () => {
  let component: AllTicketMessagesComponent;
  let fixture: ComponentFixture<AllTicketMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllTicketMessagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTicketMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
