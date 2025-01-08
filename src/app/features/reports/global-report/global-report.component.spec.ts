import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalReportComponent } from './global-report.component';

describe('GlobalReportComponent', () => {
  let component: GlobalReportComponent;
  let fixture: ComponentFixture<GlobalReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
