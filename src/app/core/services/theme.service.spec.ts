import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';
import { CookieService } from 'ngx-cookie-service';

describe('ThemeService', () => {
  let service: ThemeService;
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;

  beforeEach(() => {
    const cookieSpy = jasmine.createSpyObj('CookieService', ['get', 'set']);

    TestBed.configureTestingModule({
      providers: [{ provide: CookieService, useValue: cookieSpy }],
    });

    service = TestBed.inject(ThemeService);
    cookieServiceSpy = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set the start theme', () => {
    cookieServiceSpy.get.and.returnValue('dark');
    service.setStartTheme();

    expect(cookieServiceSpy.get).toHaveBeenCalledWith('theme');
    expect(service.currentTheme$.getValue()).toBe('dark');
    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('dark');
  });

  it('should toggle the theme from light to dark', () => {
    cookieServiceSpy.get.and.returnValue('light');
    service.setStartTheme();

    service.toggleTheme();

    expect(service.currentTheme$.getValue()).toBe('dark');
    expect(cookieServiceSpy.set).toHaveBeenCalledWith('theme', 'dark');
    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('dark');
  });

  it('should toggle the theme from dark to light', () => {
    cookieServiceSpy.get.and.returnValue('dark');
    service.setStartTheme();

    service.toggleTheme();

    expect(service.currentTheme$.getValue()).toBe('light');
    expect(cookieServiceSpy.set).toHaveBeenCalledWith('theme', 'light');
    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('light');
  });

  it('should create the theme based on system preference', () => {
    const mediaQueryListMock = {
      matches: true,
      media: '',
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    };
  
    spyOn(window, 'matchMedia').and.returnValue(mediaQueryListMock as MediaQueryList);
  
    service['createTheme']();
  
    expect(service.currentTheme$.getValue()).toBe('dark');
    expect(cookieServiceSpy.set).toHaveBeenCalledWith('theme', 'dark');
  });
  

  it('should get the theme out of the currentTheme observer', () => {
    cookieServiceSpy.get.and.returnValue('light');
    service.setStartTheme();

    service.currentTheme$.subscribe((theme) => {
      expect(theme).toBe('light');
    });
  });
});

