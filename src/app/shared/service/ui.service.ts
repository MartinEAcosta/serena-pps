import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'warning' | 'error';

export interface ToastMessage {
  text: string;
  type: ToastType;
}

@Injectable({
  providedIn: 'root',
})
export class UIService {
  _message = signal<ToastMessage | null>(null);
  message = this._message.asReadonly();
  private timer: any;

  showToastMessage = (text: string, type : ToastType = 'success' , duration: number = 3500): void => {
    if (this.message()) return;

    this._message.set({text , type});

    setTimeout(() => {
      this.clearMessage();
    }, duration);
  };

  clearMessage = (): void => {
    this._message.set(null);
  };
}
