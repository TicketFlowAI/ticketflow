import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllServiceContractTermsComponent } from './all-service-contract-terms.component';

describe('AllServiceContractTermsComponent', () => {
  let component: AllServiceContractTermsComponent;
  let fixture: ComponentFixture<AllServiceContractTermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllServiceContractTermsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllServiceContractTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
