import { Component, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { NavigationItem } from '@models/shared/navigation-item.model';
import { UIService } from '@shared/service/ui.service';

@Component({
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  styleUrl: './form-header.component.scss',
  imports: [RouterLink, RouterLinkActive]
})
export class FormHeaderComponent {
 @Input() titleForm!: string;
  @Input() navigationItems!: NavigationItem[];

  private uiService = inject(UIService);

  // Asunción: el array está ordenado y cada paso depende de que el anterior esté completo.
  // Si tu lógica real es distinta (ej: algunos pasos son opcionales), avisame y ajusto.
  public isAccessible(index: number): boolean {
    if (index === 0) return true;
    return this.navigationItems[index - 1]?.completed ?? false;
  }

  public onItemClick(event: MouseEvent, index: number): void {
    if (!this.isAccessible(index)) {
      event.preventDefault();
      this.uiService.showToastMessage(
        'Completá el paso anterior antes de continuar.',
        'warning'
      );
    }
  }
}
