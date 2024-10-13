import {TestBed} from "@angular/core/testing";
import {OpenLoginDirective} from "./open-login.directive";
import {DialogManagerService} from "../../core/services/dialog-manager.service";

const mockDialogManagerService = {
  openLoginDialog: jasmine.createSpy('openLoginDialog'),
};

describe('OpenLoginDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OpenLoginDirective, // Provee la directiva aquí
        { provide: DialogManagerService, useValue: mockDialogManagerService }, // Provee el servicio aquí
      ],
    });
  });

  it('should create an instance', () => {
    const directive = TestBed.inject(OpenLoginDirective); // Inyecta la directiva desde el TestBed
    expect(directive).toBeTruthy();
  });
});
