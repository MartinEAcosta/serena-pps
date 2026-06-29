import { NgClass } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { UIService } from '@shared/service/ui.service';

@Component({
  selector: 'app-toast-message',
  imports: [NgClass],
  templateUrl: './toast-message.component.html',
  styleUrl: './toast-message.component.scss'
})
export class ToastMessageComponent {
  uiService = inject(UIService);
  message = computed( () => this.uiService.message() );
  fadeAnimation = signal<boolean>(false);

  toastTypeClass = computed(() => {
    const msg = this.message();
    return msg ? `modal-message--${msg.type}` : '';
  });

  onMessageChange = effect(() => {
    this.fadeAnimation.set(!!this.message());
  });
}
