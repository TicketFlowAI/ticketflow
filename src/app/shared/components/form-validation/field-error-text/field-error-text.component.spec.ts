import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldErrorTextComponent } from './field-error-text.component';

describe('FieldErrorTextComponent', () => {
  let component: FieldErrorTextComponent;
  let fixture: ComponentFixture<FieldErrorTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldErrorTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldErrorTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
