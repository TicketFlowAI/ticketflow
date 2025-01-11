import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailParametersComponent } from './email-parameters.component';

describe('EmailParametersComponent', () => {
  let component: EmailParametersComponent;
  let fixture: ComponentFixture<EmailParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailParametersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
