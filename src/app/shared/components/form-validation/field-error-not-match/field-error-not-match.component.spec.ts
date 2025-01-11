import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldErrorNotMatchComponent } from './field-error-not-match.component';

describe('FieldErrorNotMatchComponent', () => {
  let component: FieldErrorNotMatchComponent;
  let fixture: ComponentFixture<FieldErrorNotMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldErrorNotMatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldErrorNotMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
