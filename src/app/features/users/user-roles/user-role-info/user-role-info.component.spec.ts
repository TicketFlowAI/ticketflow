import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleInfoComponent } from './user-role-info.component';

describe('UserRoleInfoComponent', () => {
  let component: UserRoleInfoComponent;
  let fixture: ComponentFixture<UserRoleInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRoleInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRoleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
