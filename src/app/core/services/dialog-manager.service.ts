import {inject, Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../../features/auth/login/login.component";
import { ActionConfirmationComponent } from '../../shared/components/action-confirmation/action-confirmation.component';
import { map, Observable } from 'rxjs';

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

  openActionConfrimationDialog(message: string): Observable<boolean>
  {
    const enterAnimationDuration = '200ms'
    const exitAnimationDuration = '200ms'

    const dialogRef = this.dialogService.open(ActionConfirmationComponent, {
      width: '450px',
      height: '200',
      enterAnimationDuration,
      exitAnimationDuration,
      data: message
    });

    dialogRef.afterClosed().pipe(
      map(result => console.log(result))
    );

    return dialogRef.afterClosed().pipe(
      map(result => result)
    );
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
