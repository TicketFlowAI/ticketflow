import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiSettingsComponent } from './ai-settings.component';

describe('AiSettingsComponent', () => {
  let component: AiSettingsComponent;
  let fixture: ComponentFixture<AiSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
