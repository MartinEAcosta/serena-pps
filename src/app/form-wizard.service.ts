import { computed, effect, Injectable, signal } from '@angular/core';
import { EstablishmentStepData } from '@models/establishment/establishment.interfaces';
import { WorkStructureData } from '@models/work-structure/work-structure.interfaces';

export interface WizardStepData {
  establishment?: EstablishmentStepData;
  workStructure?: WorkStructureData;
  substances?: any;
};

const STORAGE_KEY = 'carcinogenic_wizard';

@Injectable({
  providedIn: 'root'
})
export class FormWizardService {

  private state = signal<WizardStepData>(this.loadFromStorage());
  readonly wizardData = computed(() => this.state() );

  jobPositions = computed(() => {
    return this.state().workStructure?.job_positions;
  });
  
  constructor() { 
    effect( () => {
      sessionStorage.setItem(STORAGE_KEY , JSON.stringify(this.state()));
    });
  }

  getStep<K extends keyof WizardStepData>(step: K): WizardStepData[K] | undefined {
    return this.state()[step];
  }

  saveStep<K extends keyof WizardStepData>(step: K, data: WizardStepData[K]): void {
    this.state.update(current => ({
      ...current,
      [step]: data
    }));
    console.log(step, data);
    this.saveToStorage();
  }
    
  clear(): void {
    this.state.set({});
    sessionStorage.removeItem(STORAGE_KEY);
  }

  private saveToStorage(): void {
    console.log(sessionStorage);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this.state()));
  }

  private loadFromStorage(): WizardStepData {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (error) {
      console.error('Error parseando sessionStorage:', error);
      return {};
    }
  }

}
