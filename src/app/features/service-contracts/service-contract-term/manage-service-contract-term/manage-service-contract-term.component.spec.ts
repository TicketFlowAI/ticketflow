import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageServiceContractTermComponent } from './manage-service-contract-term.component';

describe('ManageServiceContractTermComponent', () => {
  let component: ManageServiceContractTermComponent;
  let fixture: ComponentFixture<ManageServiceContractTermComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageServiceContractTermComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageServiceContractTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
