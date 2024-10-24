import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllServiceTaxesComponent } from './all-service-taxes.component';

describe('AllServiceTaxesComponent', () => {
  let component: AllServiceTaxesComponent;
  let fixture: ComponentFixture<AllServiceTaxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllServiceTaxesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllServiceTaxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
