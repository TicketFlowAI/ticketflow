import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmailIntervalComponent } from './manage-email-interval.component';

describe('ManageEmailIntervalComponent', () => {
  let component: ManageEmailIntervalComponent;
  let fixture: ComponentFixture<ManageEmailIntervalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageEmailIntervalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageEmailIntervalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
