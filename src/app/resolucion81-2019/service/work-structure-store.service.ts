import { computed, inject, Injectable, signal } from '@angular/core';
import { JobPositionData } from '@models/work-structure/work-structure.interfaces';
import { FilterOption } from '../../utils/filters/filter.interface';
import { FormWizardService } from '../../wizard/form-wizard.service';

@Injectable({
  providedIn: 'root',
})
export class WorkStructureStoreService {
  private wizard = inject(FormWizardService);
  private _jobPositions = signal<JobPositionData[]>([]);
  private _selectedId = signal<string | null>(null);

  readonly jobPositions = this._jobPositions.asReadonly();
  readonly selectedJobPosition = computed(
    () => this._jobPositions().find((x) => x.id === this._selectedId()) ?? null,
  );
  readonly jobPositionListItems = computed<FilterOption[]>(() =>
    this._jobPositions().map((jp) => ({
      label: `${jp.sector_name} - ${jp.job_position}`,
      value: jp,
    })),
  );

  constructor() {
    const positions = this.wizard.getStep('workStructure')?.job_positions;

    if (positions) {
      this._jobPositions.set(positions);
    }
  }

  public clearJobPositionSelected(): void {
    this._selectedId.set(null);
  }

  public clearAllJobPositions(): void {
    this._jobPositions.set([]);
    this._selectedId.set(null);
  }

  public onRemoveJobPosition(id: string): void {
    this._jobPositions.update((items) => items.filter((x) => x.id !== id));
  }

  public onAddJobPosition(item: JobPositionData): void {
    this._jobPositions.update((items) => [...items, item]);
  }

  public selectJobPostionById( itemId : string ) : void {
    this._selectedId.set(itemId);
  }

  public onUpdateJobPosition(item: JobPositionData): void {
    this._jobPositions.update((items) =>
      items.map((x) => (x.id === item.id ? item : x)),
    );
  }

  public onSaveJobPosition(item: JobPositionData): void {
    const index = this._jobPositions().findIndex((x) => x.id === item.id);

    if (index === -1) {
      this.onAddJobPosition(item);
      return;
    }
    this.onUpdateJobPosition(item);
  }

  public loadJobPositions( items : JobPositionData[] ) : void {
    this._jobPositions.set(items);
  }
}
