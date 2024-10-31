import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTicketMessageComponent } from './manage-ticket-message.component';

describe('ManageTicketMessageComponent', () => {
  let component: ManageTicketMessageComponent;
  let fixture: ComponentFixture<ManageTicketMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageTicketMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTicketMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
