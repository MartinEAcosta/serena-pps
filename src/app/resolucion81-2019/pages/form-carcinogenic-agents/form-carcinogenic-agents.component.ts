import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';

import { FormSectionComponent } from '../../../forms/components/form-section/form-section.component';
import { FormWizardService } from '../../../form-wizard.service';
import { FormNavigationBtnsComponent } from "@shared/components/form-navigation-btns/form-navigation-btns.component";
import { SubstanceData, SubstanceDataListItem } from '@models/substances/substances.interfaces';
import { SelectSearchComponent } from "@shared/components/select-search/select-search.component";
import { FormFieldComponent } from "../../../forms/components/form-field/form-field.component";
import { AddButtonComponent } from "@shared/components/add-button/add-button.component";
import { FormSelectFieldComponent } from "@shared/form-select-field/form-select-field.component";
import { BooleanIndicatorComponent } from "@shared/components/boolean-indicator/boolean-indicator.component";
import { BtnBasicComponent } from "@shared/components/btn-basic/btn-basic.component";
import { ActionableListComponent } from "@shared/components/actionable-list/actionable-list.component";
import { CarcinogenicAgentsStoreService } from '../../service/carcinogenic-agents-store.service';
import { WorkStructureStoreService } from '../../service/work-structure-store.service';


type SubmitState = 'idle' | 'loading' | 'success';

@Component({
  selector: 'app-form-carcinogenic-agents',
  imports: [ReactiveFormsModule, FormSectionComponent, FormNavigationBtnsComponent, SelectSearchComponent, FormFieldComponent, AddButtonComponent, FormSelectFieldComponent, BooleanIndicatorComponent, BtnBasicComponent, ActionableListComponent],
  templateUrl: './form-carcinogenic-agents.component.html',
  styleUrl: './form-carcinogenic-agents.component.scss'
})
export class FormCarcinogenicAgentsComponent implements OnInit {

  carcinogenicAgentsStore = inject(CarcinogenicAgentsStoreService);
  workStructureStore = inject(WorkStructureStoreService);
  submitState = signal<SubmitState>('idle');
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private formWizardService = inject(FormWizardService);

  readonly jobPositionOptions = this.workStructureStore.jobPositionListItems;
  readonly substanceListItems = computed<SubstanceDataListItem[]>(() =>
    this.carcinogenicAgentsStore.substances().map((s) => ({
      id: s.id!,
      label: this.buildSubstanceLabel(s),
      ...s,
    })),
  );
  readonly selectedSubstanceItem = computed<SubstanceDataListItem | null>(() => {
    const selectedId = this.carcinogenicAgentsStore.selectedSubstance()?.id;
    if (!selectedId) return null;
    return this.substanceListItems().find((item) => item.id === selectedId) ?? null;
  });
  
  carcinogenicAgentForm : FormGroup = this.fb.group({
    job_position_relation : ['' , [Validators.required]],
    substance_id : ['' , [Validators.required]],
    substance_name : ['' , ],
    usage_origin_type : ['' , [Validators.required]],
    usage_origin_others : [''],
    application_method : ['', [Validators.required]],
    application_method_others : [''],
    annual_quantity : [''],
    measurament_unit : ['', [Validators.required]],
    protection_element : ['' , [Validators.required]],
    risk_informed : [ false ],
    risk_training : [ false ],
    replacement_studies_analysis : [ false ],
    replacement_studies_analysis_desc : [ '' ],
    has_special_license : [ false ],
  });

  constructor(){}

  ngOnInit(): void {
    const savedData = this.formWizardService.getStep('carcinogenicAgents');
    if (savedData && savedData.length > 0) {
      const substances : SubstanceData[] = [];
      savedData.forEach(substance => {
        substances.push( substance );
      });
      this.carcinogenicAgentsStore.loadSubstances( substances );
    }
  }
  
  private buildSubstanceLabel(s: SubstanceData): string {
    const positionLabel = s.job_position_relation
      ? `${s.job_position_relation.sector_name} - ${s.job_position_relation.job_position}`
      : 'Puesto no encontrado';

    const substanceType = s.substance_type
      ? s.substance_type.length > 35
        ? `${s.substance_type.slice(0, 35)}...`
        : s.substance_type
      : 'Sustancia';

    return `${substanceType} · ${positionLabel}`;
  }


  get submitLabel(): string {
    switch (this.submitState()) {
      case 'loading': return 'Enviando...';
      case 'success': return 'Enviado';
      default: return 'Enviar declaración';
    }
  }

  get riskInformed() : boolean {
    return this.carcinogenicAgentForm.get('risk_informed')!.value ?? false;
  }

  public onSelectSubstance( itemId : string ) : void {
    this.carcinogenicAgentsStore.selectSubstance(itemId);
    const substance = this.carcinogenicAgentsStore.selectedSubstance();
    if( substance ){
      this.patchValuesForm( substance );
    }
  }

  public addSubstance(): void {
    this.carcinogenicAgentForm.markAllAsTouched();
    if( this.carcinogenicAgentForm.invalid ) return;
  
    const substanceDto = this.createSubstance( this.carcinogenicAgentForm.value );
    const selected = this.carcinogenicAgentsStore.selectedSubstance();
    if( selected ){
      substanceDto.id = selected.id;
    }
    const substanceType = this.carcinogenicAgentsStore.substanceCodes.find(
      sub => sub.value === substanceDto.substance_id
    );

    substanceDto.substance_type = substanceType?.label;

    this.carcinogenicAgentsStore.onSaveSubstance(substanceDto);
    this.reset();
  }

  public patchValuesForm( item : SubstanceData ) {
    this.carcinogenicAgentForm.patchValue({
      job_position_relation : item.job_position_relation!,
      substance_id: item.substance_id!,
      substance_name: item.substance_name!,
      usage_origin_type :  item.usage_origin_type!,
      usage_origin_others :  item.usage_origin_others!,
      application_method :  item.application_method!,
      application_method_others :  item.application_method_others!,
      annual_quantity :  item.annual_quantity!,
      measurament_unit :  item.measurament_unit!,
      protection_element :  item.protection_element!,
      risk_informed : item.risk_informed!,
      risk_training : item.risk_training!,
      replacement_studies_analysis : item.replacement_studies_analysis!,
      replacement_studies_analysis_desc :  item.replacement_studies_analysis_desc!,
      has_special_license : item.has_special_license!,
    });
  }

  createSubstance( substance: Partial<SubstanceData> ) : SubstanceData {
    return {
      id: substance.id  ?? crypto.randomUUID(),
      job_position_relation : substance.job_position_relation!,
      substance_id: substance.substance_id!,
      substance_name: substance.substance_name!,
      usage_origin_type :  substance.usage_origin_type!,
      usage_origin_others :  substance.usage_origin_others!,
      application_method :  substance.application_method!,
      application_method_others :  substance.application_method_others!,
      annual_quantity :  substance.annual_quantity!,
      measurament_unit :  substance.measurament_unit!,
      protection_element :  substance.protection_element!,
      risk_informed : substance.risk_informed!,
      risk_training : substance.risk_training!,
      replacement_studies_analysis : substance.replacement_studies_analysis!,
      replacement_studies_analysis_desc :  substance.replacement_studies_analysis_desc!,
      has_special_license : substance.has_special_license!,
    }
  }

  public onSaveForm(): void {
    this.formWizardService.saveStep('carcinogenicAgents', this.carcinogenicAgentsStore.substances());
  }

  public reset() : void {
    this.carcinogenicAgentForm.patchValue({
      job_position_relation : '',
      substance_id: '',
      substance_name:  '',
      usage_origin_type :  '',
      usage_origin_others :  '',
      application_method :  '',
      application_method_others :  '',
      annual_quantity :  '',
      measurament_unit :  '',
      protection_element :  '',
      risk_informed : false,
      risk_training : false,
      replacement_studies_analysis : false,
      replacement_studies_analysis_desc :  '',
      has_special_license : false,
    });
    this.carcinogenicAgentForm.markAsPristine();
    this.carcinogenicAgentForm.markAsUntouched();
    this.carcinogenicAgentsStore.clearSubstanceSelected();
  }
 
  public onSubmit(): void {
    if (this.carcinogenicAgentsStore.substances().length === 0) {
      return; // regla de negocio: al menos una sustancia declarada
    }

    this.submitState.set('loading');
    this.formWizardService.saveStep('carcinogenicAgents',
      this.carcinogenicAgentsStore.substances());

    // Simulamos la espera de red — reemplazar por la llamada real al backend cuando exista
    setTimeout(() => {
      this.submitState.set('success');

      // Esperamos un poco más para que el usuario vea el estado "Enviado" antes de redirigir
      setTimeout(() => {
        this.formWizardService.clear(); // limpiamos el wizard, ya se completó la declaración
        this.router.navigate(['/']); // o la ruta real del home
      }, 1200);

    }, 1500);
  }

  public onNext(): void {
    if (this.carcinogenicAgentsStore.substances().length === 0) {
      return; 
    }

    this.formWizardService.saveStep('carcinogenicAgents', this.carcinogenicAgentsStore.substances());
  }

}

