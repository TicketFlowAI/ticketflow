import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageServiceCategoryComponent } from './manage-service-category.component';

describe('ManageServiceCategoryComponent', () => {
  let component: ManageServiceCategoryComponent;
  let fixture: ComponentFixture<ManageServiceCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageServiceCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageServiceCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
