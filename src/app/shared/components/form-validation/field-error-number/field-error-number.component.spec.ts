import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldErrorNumberComponent } from './field-error-number.component';

describe('FieldErrorNumberComponent', () => {
  let component: FieldErrorNumberComponent;
  let fixture: ComponentFixture<FieldErrorNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldErrorNumberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldErrorNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
