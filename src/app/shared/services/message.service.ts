import { Injectable, signal } from '@angular/core';
import { IToastMessage } from '../../core/models/shared/toast-message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  // Signal que almacena los mensajes actuales
  messages = signal<IToastMessage[]>([]);

  constructor() { }

  addSuccessMessage(message: string, duration: number = 3000) {
    this.addMessage({ message, type: 'success', duration });
  }

  addWarningMessage(message: string, duration: number = 3000) {
    this.addMessage({ message, type: 'warning', duration });
  }

  addInfoMessage(message: string, duration: number = 3000) {
    this.addMessage({ message, type: 'info', duration });
  }

  addErrorMessage(message: string, duration: number = 3000) {
    this.addMessage({ message, type: 'error', duration });
  }

  clearAllMessages() {
    this.messages.set([]);
  }

  private addMessage(newMessage: IToastMessage) {
    const currentMessages = this.messages();
    this.messages.set([...currentMessages, newMessage]);

    setTimeout(() => {
      const updatedMessages = this.messages().filter(m => m !== newMessage);
      this.messages.set(updatedMessages);
    }, newMessage.duration);
  }
}
