import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldErrorRucComponent } from './field-error-ruc.component';

describe('FieldErrorRucComponent', () => {
  let component: FieldErrorRucComponent;
  let fixture: ComponentFixture<FieldErrorRucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldErrorRucComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldErrorRucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
