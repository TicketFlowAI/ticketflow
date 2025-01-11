import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldErrorIntegerNumbersComponent } from './field-error-integer-numbers.component';

describe('FieldErrorIntegerNumbersComponent', () => {
  let component: FieldErrorIntegerNumbersComponent;
  let fixture: ComponentFixture<FieldErrorIntegerNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldErrorIntegerNumbersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldErrorIntegerNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
