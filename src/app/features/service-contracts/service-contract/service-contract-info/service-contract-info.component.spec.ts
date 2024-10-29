import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceContractInfoComponent } from './service-contract-info.component';

describe('ServiceContractInfoComponent', () => {
  let component: ServiceContractInfoComponent;
  let fixture: ComponentFixture<ServiceContractInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceContractInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceContractInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
