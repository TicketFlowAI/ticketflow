import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoFaSetUpComponent } from './two-fa-set-up.component';

describe('TwoFaSetUpComponent', () => {
  let component: TwoFaSetUpComponent;
  let fixture: ComponentFixture<TwoFaSetUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwoFaSetUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoFaSetUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
