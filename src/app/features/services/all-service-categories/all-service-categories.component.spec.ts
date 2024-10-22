import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllServiceCategoriesComponent } from './all-service-categories.component';

describe('AllServiceCategoriesComponent', () => {
  let component: AllServiceCategoriesComponent;
  let fixture: ComponentFixture<AllServiceCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllServiceCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllServiceCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
