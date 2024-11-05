import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-custom-toast',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon
  ],
  templateUrl: './custom-toast.component.html',
  styleUrl: './custom-toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('toastAnimation', [
      // Estado inicial fuera de la pantalla a la derecha
      state('void', style({ transform: 'translateX(100%)', opacity: 0 })),
      // Estado visible en la pantalla
      state('visible', style({ transform: 'translateX(0)', opacity: 1 })),
      // Transición de entrada desde la derecha
      transition('void => visible', [
        animate('300ms ease-out')
      ]),
      // Transición de salida hacia la derecha
      transition('visible => void', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class CustomToastComponent {
  public messageService = inject(MessageService)
}
