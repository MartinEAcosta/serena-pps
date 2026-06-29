import { Component, inject } from '@angular/core';
import { ConfirmDialogService } from '@shared/service/confirm-dialog.service';

@Component({
  selector: 'app-confirm-dialog',
  imports: [],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent {
  private confirmDialogService = inject(ConfirmDialogService);
  state = this.confirmDialogService.state;

  onConfirm(): void {
    this.confirmDialogService.resolveDialog(true);
  }

  onCancel(): void {
    this.confirmDialogService.resolveDialog(false);
  }
}
