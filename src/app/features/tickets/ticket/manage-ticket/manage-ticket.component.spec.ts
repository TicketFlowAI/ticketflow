import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTicketComponent } from './manage-ticket.component';

describe('ManageTicketComponent', () => {
  let component: ManageTicketComponent;
  let fixture: ComponentFixture<ManageTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageTicketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
