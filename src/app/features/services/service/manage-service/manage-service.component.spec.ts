import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageServiceComponent } from './manage-service.component';

describe('ManageServiceComponent', () => {
  let component: ManageServiceComponent;
  let fixture: ComponentFixture<ManageServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
