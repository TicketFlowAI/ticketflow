import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldErrorRequiredComponent } from './field-error-required.component';

describe('FieldErrorRequiredComponent', () => {
  let component: FieldErrorRequiredComponent;
  let fixture: ComponentFixture<FieldErrorRequiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldErrorRequiredComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldErrorRequiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
