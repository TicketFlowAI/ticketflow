import {Directive, HostListener, inject} from '@angular/core';
import {DialogManagerService} from "../../core/services/dialog-manager.service";

@Directive({
  selector: '[OpenLogin]',
  standalone: true
})
export class OpenLoginDirective {
  private readonly dialogManagerService = inject(DialogManagerService)

  @HostListener('click', ['$event'])
  OpenLogin(event: Event){
    event.preventDefault();
    this.dialogManagerService.openLoginDialog();
  }
}
