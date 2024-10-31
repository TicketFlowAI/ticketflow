import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketMessageInfoComponent } from './ticket-message-info.component';

describe('TicketMessageInfoComponent', () => {
  let component: TicketMessageInfoComponent;
  let fixture: ComponentFixture<TicketMessageInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketMessageInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketMessageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
