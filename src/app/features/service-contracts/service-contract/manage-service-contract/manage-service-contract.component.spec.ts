import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageServiceContractComponent } from './manage-service-contract.component';

describe('ManageServiceContractComponent', () => {
  let component: ManageServiceContractComponent;
  let fixture: ComponentFixture<ManageServiceContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageServiceContractComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageServiceContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
