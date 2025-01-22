import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, numberAttribute } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TranslocoDirective } from '@jsverse/transloco';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { TicketDialogData } from '../../../../core/models/dialogs/ticket-dialog-data.model';
import { DialogSpinnerComponent } from "../../../../shared/components/dialog-spinner/dialog-spinner.component";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { notZeroValidator } from '../../../../shared/validators/custom-validators';
import { FieldErrorRequiredComponent } from '../../../../shared/components/form-validation/field-error-required/field-error-required.component';
import { FieldErrorRequiredSelectComponent } from '../../../../shared/components/form-validation/field-error-required-select/field-error-required-select.component';

@Component({
  selector: 'app-manage-ticket',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoDirective,
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
    DialogSpinnerComponent,
    MatSlideToggleModule,
    FieldErrorRequiredComponent,
    FieldErrorRequiredSelectComponent
],
  templateUrl: './manage-ticket.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageTicketComponent {
  private readonly ticketManagementService = inject(TicketManagementService);
  private readonly serviceContractManagementService = inject(ServiceContractManagementService);
  private readonly userManagemenstService = inject(UserManagementService);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly dialogRef = inject(MatDialogRef<ManageTicketComponent>);
  readonly data = inject<TicketDialogData>(MAT_DIALOG_DATA);

  titleFormControl = new FormControl('', { nonNullable: true, validators: [Validators.required] })
  priorityFormControl = new FormControl(0, { nonNullable: true})
  humanInteractionFormControl = new FormControl(false, { nonNullable: true})
  complexityFormControl = new FormControl(0, { nonNullable: true})
  userFormControl = new FormControl(0, { nonNullable: true, validators: [Validators.required] })
  serviceContractFormControl = new FormControl(0, { nonNullable: true, validators: [notZeroValidator] })
  messageFormControl = new FormControl('', { nonNullable: true })

  ticketForm = new FormGroup({
    title: this.titleFormControl,
    priority: this.priorityFormControl,
    humanInteraction: this.humanInteractionFormControl,
    complexity: this.complexityFormControl,
    user: this.userFormControl,
    serviceContract: this.serviceContractFormControl,
    message: this.messageFormControl
  })

  serviceContracts: ServiceContractModel[] = [];
  user: UserModel | null = null;

  isClient = this.userManagemenstService.isUserClient()
  editAiSettings: boolean = false
  ngOnInit(): void {
    this.dialogRef.backdropClick().subscribe(() => {
      this.dialogRef.close(false);
    });

    this.ticketForm.statusChanges.subscribe(() => {
      console.log('Errores del formulario:', this.ticketForm.errors);
      console.log('Errores por campo:');
      Object.keys(this.ticketForm.controls).forEach((key) => {
        console.log(`${key}:`, this.ticketForm.get(key)?.errors);
      });
    });

    if (this.data.ticket) {
      this.titleFormControl.setValue(this.data.ticket.title)

      if(Number.isInteger(this.data.ticket.priority)) {
        this.priorityFormControl.setValue(parseInt(this.data.ticket.priority.toString()))
      }
      else {
        this.priorityFormControl.setValue(0)
      }

      if(Number.isInteger(this.data.ticket.complexity)) {
        this.complexityFormControl.setValue(parseInt(this.data.ticket.complexity.toString()))
      }
      else {
        this.complexityFormControl.setValue(0)
      }
      
      if(Number.isInteger(this.data.ticket.needsHumanInteraction)) {
        this.humanInteractionFormControl.setValue(this.data.ticket.needsHumanInteraction? true : false);
      }
      else{
        this.humanInteractionFormControl.setValue(false)
      }

      if(this.isClient) {
        this.messageFormControl.setValidators(Validators.required)
      }
      
      this.userFormControl.setValue(this.data.ticket.user_id);
      this.serviceContractFormControl.setValue(this.data.ticket.service_contract_id);
    }

    if (this.data.serviceContract) {
      this.serviceContractFormControl.setValue(this.data.serviceContract.id);
    }

    forkJoin({
      serviceContracts: this.serviceContractManagementService.getAllServiceContracts(),
      user: this.userManagemenstService.getMyUser()
    }).pipe(
      catchError(() => {
        return of({ serviceContracts: [], user: null })
      })
    ).subscribe({
      next: ({ serviceContracts, user }) => {
        this.serviceContracts = serviceContracts
        this.user = user
        this.userFormControl.setValue(this.user?.id?? 0);
        this.cdr.detectChanges();
      }
    })
  }

  onSaveClick(): void {
    const formValue = this.ticketForm.value

    const priority = this.editAiSettings? (this.data.ticket? formValue.priority : '') : '';
    const humanInteraction = this.editAiSettings? (this.data.ticket? (formValue.humanInteraction? 1 : 0) : '') : '';
    const complexity = this.editAiSettings? (this.data.ticket? formValue.complexity : '') : '';
    let ticket = new TicketModel(
      0,
      formValue.title,
      priority,
      humanInteraction,
      complexity,
      formValue.serviceContract,
      formValue.user,
      1,
      0,
      1,
      '',
      '',
      0,
      '',
      0,
      ''
    )

    if (this.data.ticket) {
      ticket.id = this.data.ticket.id;
      this.ticketManagementService.editTicket(ticket)
      .subscribe( () => { this.dialogRef.close(true) })
    }
    else {
      this.ticketManagementService.addTicket(ticket, formValue.message?? '')
      .subscribe( () => { this.dialogRef.close(true) })
    }
  }
}
