import {inject, Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../../features/auth/login/login.component";

@Injectable({
  providedIn: 'root'
})
export class DialogManagerService {
  private readonly dialogService: MatDialog = inject(MatDialog)


  openLoginDialog(){
    const enterAnimationDuration = '0ms'
    const exitAnimationDuration = '0ms'

    this.dialogService.open(LoginComponent, {
      width: '500px',
      height: '400px',
      enterAnimationDuration,
      exitAnimationDuration
    });
  }

  openNewTicketDialog(){
    const enterAnimationDuration = '0ms'
    const exitAnimationDuration = '0ms'

    this.dialogService.open(LoginComponent, {
      width: '500px',
      height: '400px',
      enterAnimationDuration,
      exitAnimationDuration
    });
  }
}
