import { TestBed } from '@angular/core/testing';

import { EncryptionService } from './encryption.service';

describe('EncryptionService', () => {
  let service: EncryptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncryptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('it should encrypt the data', () => {
    const dataToEncrypt = 'example'

    const dataEncrypted = service.encryptData(dataToEncrypt)

    expect(dataEncrypted).not.toBe(dataToEncrypt)
  });

  it('it should decrypt the data', () => {
    const dataToEncrypt = 'example'
    
    //FIRST WE ENCRYPT AND ENSURE THE ENCRYPTION
    const dataEncrypted = service.encryptData(dataToEncrypt)
    expect(dataEncrypted).not.toBe(dataToEncrypt)

    //THEN WE DECRIPT AND COMPATE WITH THE ORIGINAL DATA
    const dataDecrypted = service.decryptData(dataEncrypted)
    expect(dataDecrypted).toBe(dataToEncrypt)
  });
});
