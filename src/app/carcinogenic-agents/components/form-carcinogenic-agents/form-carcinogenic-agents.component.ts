import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';

import { FormSectionComponent } from '../../../forms/components/form-section/form-section.component';
import { FormWizardService } from '../../../form-wizard.service';
import { FilterOption } from '../../../utils/filters/filter.interface';
import { FormNavigationBtnsComponent } from "@shared/components/form-navigation-btns/form-navigation-btns.component";
import { EmploymentModeCodes, ProtectionElements, SubstanceCodes, SubstanceData, SubstanceOriginCodes, UnitsOfQuantity } from '@models/substances/substances.interfaces';
import { SelectSearchComponent } from "@shared/components/select-search/select-search.component";
import { FormFieldComponent } from "../../../forms/components/form-field/form-field.component";
import { AddButtonComponent } from "@shared/components/add-button/add-button.component";
import { FormSelectFieldComponent } from "@shared/form-select-field/form-select-field.component";
import { SelectOption } from '../../../forms/models/form.interfaces';
import { BooleanIndicatorComponent } from "@shared/components/boolean-indicator/boolean-indicator.component";
import { BtnBasicComponent } from "@shared/components/btn-basic/btn-basic.component";
import { ActionableListComponent } from "@shared/components/actionable-list/actionable-list.component";

const substanceCodes : SelectOption[] = SubstanceCodes;
const substanceOriginCodes : SelectOption[] = SubstanceOriginCodes;
const employmentModeCodes : SelectOption[] = EmploymentModeCodes;
const unitsOfQuantity : SelectOption[] = UnitsOfQuantity;
const protectionElements  : SelectOption[] = ProtectionElements;

type SubmitState = 'idle' | 'loading' | 'success';

@Component({
  selector: 'app-form-carcinogenic-agents',
  imports: [ReactiveFormsModule, FormSectionComponent, FormNavigationBtnsComponent, SelectSearchComponent, FormFieldComponent, AddButtonComponent, FormSelectFieldComponent, BooleanIndicatorComponent, BtnBasicComponent, ActionableListComponent],
  templateUrl: './form-carcinogenic-agents.component.html',
  styleUrl: './form-carcinogenic-agents.component.scss'
})
export class FormCarcinogenicAgentsComponent implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);

  formWizardService = inject(FormWizardService);
  submitState = signal<SubmitState>('idle');

  substances = signal<SubstanceData[]>([]);
  substanceSelected = signal<SubstanceData | null>( null );

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

  private buildKey(jobPositionRelation: string, substance_name: string): string {
    return `${jobPositionRelation}-${substance_name}`;
  }

  ngOnInit(): void {
    const savedData = this.formWizardService.getStep('carcinogenicAgents');
    if (savedData && savedData.length > 0) {
      // const substancesSaved = new Map<string,SubstanceData>(); 

      //   savedData.forEach( substance => {
    //     const key = this.buildKey(substance.job_position_relation, substance.substance_name);
    //     substancesSaved.set(key, substance);
    //   })
    //   this.substances.set(substancesSaved);
    }
  }

  get submitLabel(): string {
    switch (this.submitState()) {
      case 'loading': return 'Enviando...';
      case 'success': return 'Enviado';
      default: return 'Enviar declaración';
    }
  }

  get jobPositionRelations(): FilterOption[] {
    const positions = this.formWizardService.getStep('workStructure')?.job_positions ?? [];

    return positions.map(position => {
      const key = `${position.sector_name}-${position.job_position}`;
      return { label: key, value: key };
    });
  }

  get riskInformed() : boolean {
    return this.carcinogenicAgentForm.get('risk_informed')!.value ?? false;
  }

  get substanceCodes() : FilterOption[] {
    return substanceCodes;
  }

  get substanceOriginCodes() : FilterOption[] {
    return substanceOriginCodes;
  }

  get employmentModeCodes() : FilterOption[] {
    return employmentModeCodes;
  }

  get unitsOfQuantity() : FilterOption[]{
    return unitsOfQuantity;
  }

  get protectionElements() : FilterOption[]{
    return protectionElements;
  }

  public getSubstanceName( itemId : string ) : FilterOption | null {
    const substance = this.substanceCodes.find( opt => opt.value === itemId);
    return substance ?? null;
  }

  public onSelectSubstance( itemId : string ) : void {
    const itemToSelect = this.substances().get( itemId );
    if( itemToSelect ){
      this.substanceSelected.set( itemToSelect );
      this.carcinogenicAgentForm.patchValue( itemToSelect );
    }
  }

  public addSubstance(): void {
    this.carcinogenicAgentForm.markAllAsTouched();
    if (this.carcinogenicAgentForm.valid) {
      const substanceDto = this.createSubstance( this.carcinogenicAgentForm.value );
      if( substanceDto ){
        const key = this.buildKey(substanceDto.job_position_relation, substanceDto.substance_name);
        const newMap = new Map(this.substances());
        newMap.set(key, substanceDto);
        this.substances.set(newMap);
        this.reset();
      }
    }
    console.log(this.substances());
  }

  createSubstance( substance: Partial<SubstanceData> ) : SubstanceData {
    return {
      job_position_relation : substance.job_position_relation!,
      substance_id: substance.substance_id!,
      substance_name: this.getSubstanceName( substance.substance_id! )?.label!,
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
    const substancesArray = Array.from(this.substances().values());

    this.formWizardService.saveStep('carcinogenicAgents', substancesArray);
    console.log(this.substances())
  }

  public onRemoveSubstance(itemId : string): void {
    const newMap = new Map(this.substances());
    newMap.delete(itemId);
    this.substances.set(newMap);
  }

  public reset() : void {
    this.substanceSelected.set(null);
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
  }
 
  public onSubmit(): void {
    if (this.substances().size === 0) {
      return; // regla de negocio: al menos una sustancia declarada
    }

    this.submitState.set('loading');

    const substancesArray = Array.from(this.substances().values());
    this.formWizardService.saveStep('carcinogenicAgents', substancesArray);

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
    if (this.substances().size === 0) {
      return; 
    }

    const substancesArray = Array.from(this.substances().values());
    this.formWizardService.saveStep('carcinogenicAgents', substancesArray);
  }

}

