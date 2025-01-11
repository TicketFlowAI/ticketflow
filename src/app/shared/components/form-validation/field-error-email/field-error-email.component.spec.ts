import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldErrorEmailComponent } from './field-error-email.component';

describe('FieldErrorEmailComponent', () => {
  let component: FieldErrorEmailComponent;
  let fixture: ComponentFixture<FieldErrorEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldErrorEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldErrorEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
