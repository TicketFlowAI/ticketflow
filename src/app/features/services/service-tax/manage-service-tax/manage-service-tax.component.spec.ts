import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageServiceTaxComponent } from './manage-service-tax.component';

describe('ManageServiceTaxComponent', () => {
  let component: ManageServiceTaxComponent;
  let fixture: ComponentFixture<ManageServiceTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageServiceTaxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageServiceTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
