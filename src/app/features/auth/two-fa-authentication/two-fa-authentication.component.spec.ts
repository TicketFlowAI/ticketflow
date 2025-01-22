import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoFaAuthenticationComponent } from './two-fa-authentication.component';

describe('TwoFaAuthenticationComponent', () => {
  let component: TwoFaAuthenticationComponent;
  let fixture: ComponentFixture<TwoFaAuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwoFaAuthenticationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoFaAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
