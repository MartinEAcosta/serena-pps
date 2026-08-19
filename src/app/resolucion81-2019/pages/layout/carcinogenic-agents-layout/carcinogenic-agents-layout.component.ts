import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormHeaderComponent } from "@shared/components/form-header/form-header.component";
import { NavigationItem } from '@models/shared/navigation-item.model';
import { FormWizardService } from '../../../../wizard/form-wizard.service';
import { WIZARD_STEPS } from '../../../../wizard/wizard.step.guard';

@Component({
  selector: 'app-carcinogenic-agents-layout',
  imports: [RouterOutlet, FormHeaderComponent],
  templateUrl: './carcinogenic-agents-layout.component.html',
  styleUrl: './carcinogenic-agents-layout.component.scss'
})
export class CarcinogenicAgentsLayoutComponent {
  private formWizardService = inject(FormWizardService);

  protected readonly navigationItems = computed<NavigationItem[]>(() => {
    const wizardData = this.formWizardService.wizardData();
    return WIZARD_STEPS.map((step) => ({
      label: step.label,
      href: step.path,
      completed: step.isComplete(wizardData),
    }));
  });
}
