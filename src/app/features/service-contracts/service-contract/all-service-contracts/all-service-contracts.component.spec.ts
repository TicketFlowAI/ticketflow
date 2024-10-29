import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllServiceContractsComponent } from './all-service-contracts.component';

describe('AllServiceContractsComponent', () => {
  let component: AllServiceContractsComponent;
  let fixture: ComponentFixture<AllServiceContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllServiceContractsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllServiceContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
