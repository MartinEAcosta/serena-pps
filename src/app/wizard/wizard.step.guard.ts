import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { FormWizardService, WizardStepData } from './form-wizard.service';
import { UIService } from '@shared/service/ui.service';

export interface WizardStepConfig {
  key: keyof WizardStepData;
  path: string;
  label: string;
  isComplete: (data: WizardStepData) => boolean;
}

export const WIZARD_STEPS: WizardStepConfig[] = [
  {
    key: 'establishment',
    path: 'establecimiento',
    label: 'Establecimiento',
    isComplete: (data) => !!data.establishment,
  },
  {
    key: 'workStructure',
    path: 'sectores-puestos',
    label: 'Estructura Empresarial',
    isComplete: (data) => !!data.workStructure?.job_positions?.length, // ← fix: ? en lugar de !
  },
  {
    key: 'carcinogenicAgents',
    path: 'sustancias-cancerigenas',
    label: 'Sustancias Cancerigenos',
    isComplete: (data) => !!data.carcinogenicAgents?.length,
  },
];

function buildSiblingPath(route: ActivatedRouteSnapshot, siblingPath: string): string {
  const segments = route.pathFromRoot
    .flatMap((snapshot) => snapshot.url.map((segment) => segment.path))
    .filter(Boolean);

  segments.pop();
  segments.push(siblingPath);

  return '/' + segments.join('/');
}

export const wizardStepGuard: CanActivateFn = (route) => {
  const formWizardService = inject(FormWizardService);
  const uiService = inject(UIService);
  const router = inject(Router);

  const stepKey = route.data['stepKey'] as string | undefined;
  const stepIndex = WIZARD_STEPS.findIndex((step) => step.key === stepKey);

  if (stepIndex <= 0) return true;

  const wizardData = formWizardService.wizardData();
  const previousSteps = WIZARD_STEPS.slice(0, stepIndex);
  const firstIncomplete = previousSteps.find((step) => !step.isComplete(wizardData));

  if (firstIncomplete) {
    uiService.showToastMessage('Completá los pasos anteriores antes de continuar.', 'warning');
    const redirectPath = buildSiblingPath(route, firstIncomplete.path);
    return router.createUrlTree([redirectPath]);
  }

  return true;
};