import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiManageClassifiersComponent } from './ai-manage-classifiers.component';

describe('AiManageClassifiersComponent', () => {
  let component: AiManageClassifiersComponent;
  let fixture: ComponentFixture<AiManageClassifiersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiManageClassifiersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiManageClassifiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
