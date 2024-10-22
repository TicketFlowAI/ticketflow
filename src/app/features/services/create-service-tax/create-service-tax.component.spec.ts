import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServiceTaxComponent } from './create-service-tax.component';

describe('CreateServiceTaxComponent', () => {
  let component: CreateServiceTaxComponent;
  let fixture: ComponentFixture<CreateServiceTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateServiceTaxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateServiceTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
