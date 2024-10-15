import { TestBed } from '@angular/core/testing';

import { CustomHeadersService } from './custom-headers.service';
import { HttpHeaders } from '@angular/common/http';

describe('CustomHeadersService', () => {
  let service: CustomHeadersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomHeadersService);
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  it('should return a empty header object', () => {
    const emptyHeaderManuallyTyped = new HttpHeaders()
    
    expect(service.getHeaders()).toEqual(emptyHeaderManuallyTyped)
  });

  it('should add application/json header', () => {
    const headers = service.addAppJson().getHeaders();
    expect(headers.get('Content-Type')).toBe('application/json');
  });

  it('should add X-XSRF-TOKEN header', () => {
    const headers = service.addXsrfToken().getHeaders();
    expect(headers.has('X-XSRF-TOKEN')).toBeTrue();
    expect(headers.get('X-XSRF-TOKEN')).toBe(''); 
  });

  it('should add a custom header', () => {
    const headers = service.addCustomHeader('key', 'value').getHeaders();
    expect(headers.get('key')).toBe('value'); 
  });
});
