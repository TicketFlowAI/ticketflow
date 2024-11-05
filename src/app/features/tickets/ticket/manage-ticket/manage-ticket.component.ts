import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TranslocoDirective } from '@jsverse/transloco';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { catchError, forkJoin, of } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { TicketModel } from '../../../../core/models/entities/ticket.model';
import { TicketManagementService } from '../../../../core/services/ticket-management.service';
import { ServiceContractModel } from '../../../../core/models/entities/service-contract.model';
import { ServiceContractManagementService } from '../../../../core/services/service-contract-management.service';
import { UserManagementService } from '../../../../core/services/user-management.service';
import { UserModel } from '../../../../core/models/entities/user.model';

@Component({
  selector: 'app-manage-ticket',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoDirective,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  templateUrl: './manage-ticket.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageTicketComponent {
  private readonly ticketManagementService = inject(TicketManagementService);
  private readonly serviceContractManagementService = inject(ServiceContractManagementService);
  private readonly userManagemenstService = inject(UserManagementService);
  private readonly cdr = inject(ChangeDetectorRef);

  private readonly dialogRef = inject(MatDialogRef<ManageTicketComponent>);
  readonly ticketData = inject<TicketModel>(MAT_DIALOG_DATA);

  titleFormControl = new FormControl('', { nonNullable: true, validators: [Validators.required] })
  priorityFormControl = new FormControl(0, { nonNullable: true, validators: [Validators.required] })
  humanInteractionFormControl = new FormControl(false, { nonNullable: true, validators: [Validators.required] })
  complexityFormControl = new FormControl(0, { nonNullable: true, validators: [Validators.required] })
  userFormControl = new FormControl(0, { nonNullable: true, validators: [Validators.required] })
  serviceContractFormControl = new FormControl(0, { nonNullable: true, validators: [Validators.required] })

  ticketForm = new FormGroup({
    title: this.titleFormControl,
    priority: this.priorityFormControl,
    humanInteraction: this.humanInteractionFormControl,
    complexity: this.complexityFormControl,
    user: this.userFormControl,
    serviceContract: this.serviceContractFormControl,
  })

  ticket: TicketModel | null = null;
  serviceContracts: ServiceContractModel[] = [];
  user: UserModel | null = null;

  ngOnInit(): void {
    if (this.ticketData) {
      this.ticket = this.ticketData
      this.titleFormControl.setValue(this.ticket.title)
      this.priorityFormControl.setValue(this.ticket.priority)
      this.humanInteractionFormControl.setValue(this.ticket.needsHumanInteraction);
      this.complexityFormControl.setValue(this.ticket.complexity);
      this.userFormControl.setValue(this.ticket.user_id);
      this.serviceContractFormControl.setValue(this.ticket.service_contract_id);
    }

    forkJoin({
      //serviceContracts: this.serviceContractManagementService.getAllServiceContracts(),
      user: this.userManagemenstService.getMyUser()
    }).pipe(
      catchError(() => {
        return of({ /*serviceContracts: [],*/ user: null})
      })
    ).subscribe({
      next: ({/*serviceContracts,*/ user}) => {
        //this.serviceContracts = serviceContracts
        this.user = user

        this.cdr.detectChanges();
      }
    })
  }

  onSaveClick(): void {
    const formValue = this.ticketForm.value
    let ticket = new TicketModel(
      0,
      formValue.title,
      formValue.priority,
      formValue.humanInteraction,
      formValue.complexity,
      formValue.serviceContract,
      formValue.user,
      1,
      false, 
      true,//As is a new ticket and has a message from the client side, the notification to the techinician will be auto setted to true
      '',
      '',
      0,
      '',
      0,
      ''
    )

    if (this.ticketData) {
      ticket.id = this.ticketData.id

      this.ticketManagementService.editTicket(ticket).subscribe({
        next: (edited) => {
          console.log('Response:', edited)
        }
      }
      )
    }
    else {
      this.ticketManagementService.addTicket(ticket).subscribe({
        next: (created) => {
          console.log('Response:', created)
        }
      }
      )
    }
  }
}
