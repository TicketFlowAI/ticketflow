import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { UserSessionService } from '../../../core/services/user-sesion.service';
import { AuthService } from '../../../core/services/auth.service';
import { SanctumService } from '../../../core/api/servicios-mindsoftdev/sanctum.service';
import { AuthenticationService } from '../../../core/api/servicios-mindsoftdev/authentication.service';
import { FormBuilder } from '@angular/forms';
import {provideHttpClient} from "@angular/common/http";

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent],
      providers: [
        provideHttpClient(), // Provee HttpClient
        provideHttpClientTesting() // Provee la versión de prueba de HttpClient
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
