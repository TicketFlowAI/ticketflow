import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldErrorRequiredSelectComponent } from './field-error-required-select.component';

describe('FieldErrorRequiredSelectComponent', () => {
  let component: FieldErrorRequiredSelectComponent;
  let fixture: ComponentFixture<FieldErrorRequiredSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldErrorRequiredSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldErrorRequiredSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
