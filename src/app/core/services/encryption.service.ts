import CryptoJS from 'crypto-js';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  private readonly CRYPTO_KEY: string = 'M!Nd5ofTd3v.C0m';

  constructor() { }

  public encryptData(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.CRYPTO_KEY).toString();
  }

  public decryptData(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.CRYPTO_KEY).toString(CryptoJS.enc.Utf8);
  }
}
