import { Injectable, signal } from '@angular/core';
export interface ConfirmDialogConfig {
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

interface ConfirmDialogState extends ConfirmDialogConfig {
  resolve: (value: boolean) => void;
}

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  
  private _state = signal<ConfirmDialogState | null>(null);
  state = this._state.asReadonly();

  confirm(config: ConfirmDialogConfig | string): Promise<boolean> {
    const cfg: ConfirmDialogConfig =
      typeof config === 'string' ? { message: config } : config;
    return new Promise<boolean>((resolve) => {
      this._state.set({ ...cfg, resolve });
    });
  }

  resolveDialog(value: boolean): void {
    this._state()?.resolve(value);
    this._state.set(null);
  }
  constructor() {}
}
