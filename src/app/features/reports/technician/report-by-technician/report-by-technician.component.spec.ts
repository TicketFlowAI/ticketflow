import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportByTechnicianComponent } from './report-by-technician.component';

describe('ReportByTechnicianComponent', () => {
  let component: ReportByTechnicianComponent;
  let fixture: ComponentFixture<ReportByTechnicianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportByTechnicianComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportByTechnicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
