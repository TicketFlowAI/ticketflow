import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelServiceRequestComponent } from './cancel-service-request.component';

describe('CancelServiceRequestComponent', () => {
  let component: CancelServiceRequestComponent;
  let fixture: ComponentFixture<CancelServiceRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelServiceRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelServiceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
