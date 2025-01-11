import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldErrorDecimalNumbersComponent } from './field-error-decimal-numbers.component';

describe('FieldErrorDecimalNumbersComponent', () => {
  let component: FieldErrorDecimalNumbersComponent;
  let fixture: ComponentFixture<FieldErrorDecimalNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldErrorDecimalNumbersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldErrorDecimalNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
