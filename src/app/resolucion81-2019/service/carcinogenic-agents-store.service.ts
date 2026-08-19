import { computed, Injectable, signal } from '@angular/core';
import {
  EmploymentModeCodes,
  ProtectionElements,
  SubstanceCodes,
  SubstanceData,
  SubstanceOriginCodes,
  UnitsOfQuantity,
  PreventiveMeasures
} from '@models/substances/substances.interfaces';
import { SelectOption } from '../../forms/models/form.interfaces';
import { FilterOption } from '../../utils/filters/filter.interface';

const substanceCodes: SelectOption[] = SubstanceCodes;
const substanceOriginCodes: SelectOption[] = SubstanceOriginCodes;
const unitsOfQuantity: SelectOption[] = UnitsOfQuantity;
const protectionElements: SelectOption[] = ProtectionElements;
const employmentModeCodes: SelectOption[] = EmploymentModeCodes;
const preventiveMeasures: SelectOption[] = PreventiveMeasures; 

@Injectable({
  providedIn: 'root',
})
export class CarcinogenicAgentsStoreService {
  private _substances = signal<SubstanceData[]>([]);
  private readonly _selectedId = signal<string | null>(null);

  readonly substances = this._substances.asReadonly();
  readonly selectedSubstance = computed(
    () => this._substances().find((x) => x.id === this._selectedId()) ?? null,
  );

  constructor() {}

  public clearSubstanceSelected(): void {
    this._selectedId.set(null);
  }

  public clearAllSubstances(): void {
    this._substances.set([]);
    this._selectedId.set(null);
  }

  public selectSubstance(id: string): void {
    this._selectedId.set(id);
  }

  public onRemoveSubstance(id: string): void {
    this._substances.update((items) => items.filter((x) => x.id !== id));
  }

  public removeSubstancesByJobPosition(jobPositionId: string): void {
    this._substances.update((current) =>
      current.filter(
        (s) => s.job_position_relation?.id !== jobPositionId
      )
    );

    // Si la sustancia seleccionada actualmente pertenecía al puesto eliminado, limpiarla
    const selected = this.selectedSubstance();
    if (selected?.job_position_relation?.id === jobPositionId) {
      this._selectedId.set(null);
    }
  }

  public onAddSubstance(item: SubstanceData): void {
    this._substances.update((items) => [...items, item]);
  }

  public onUpdateSubstance(item: SubstanceData): void {
    this._substances.update((items) =>
      items.map((x) => (x.id === item.id ? item : x)),
    );
  }

  public onSaveSubstance(item: SubstanceData): void {
    const index = this._substances().findIndex((x) => x.id === item.id);
    if (index === -1) {
      this.onAddSubstance(item);
      return;
    }
    this.onUpdateSubstance(item);
  }

  public loadSubstances(items: SubstanceData[]): void {
    this._substances.set(items);
  }

  get substanceCodes(): FilterOption[] {
    return substanceCodes;
  }
  get substanceOriginCodes(): FilterOption[] {
    return substanceOriginCodes;
  }
  get unitsOfQuantity(): FilterOption[] {
    return unitsOfQuantity;
  }
  get protectionElements(): FilterOption[] {
    return protectionElements;
  }
  get employmentModeCodes(): FilterOption[] {
    return employmentModeCodes;
  }
  get preventiveMeasures(): FilterOption[] {
    return preventiveMeasures;
  }
}
