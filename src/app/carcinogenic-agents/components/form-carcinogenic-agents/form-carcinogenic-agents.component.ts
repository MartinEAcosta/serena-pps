import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from "@angular/forms";

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

@Component({
  selector: 'app-form-carcinogenic-agents',
  imports: [ReactiveFormsModule, FormSectionComponent, FormNavigationBtnsComponent, SelectSearchComponent, FormFieldComponent, AddButtonComponent, FormSelectFieldComponent, BooleanIndicatorComponent, BtnBasicComponent, ActionableListComponent],
  templateUrl: './form-carcinogenic-agents.component.html',
  styleUrl: './form-carcinogenic-agents.component.scss'
})
export class FormCarcinogenicAgentsComponent implements OnInit {

  private formWizardService = inject(FormWizardService);
  private fb = inject(FormBuilder);

  substances = signal<Map<string,SubstanceData>>(new Map<string,SubstanceData>());
  substanceSelected = signal<SubstanceData | null>( null );

  carcinogenicAgentForm : FormGroup = this.fb.group({
    job_position_relation : ['' , [Validators.required]],
    substance_id : ['' , [Validators.required]],
    substance_name : [''],
    usage_origin_type : [''],
    usage_origin_others : [''],
    application_method : [''],
    application_method_others : [''],
    annual_quantity : [''],
    measurament_unit : [''],
    protection_element : [''],
    risk_informed : [ false ],
    risk_training : [ false ],
    replacement_studies_analysis : [ false ],
    replacement_studies_analysis_desc : [ '' ],
    has_special_license : [ false ],
  });

  constructor(){}

  ngOnInit(): void {
    const savedData = this.formWizardService.getStep('substances');
    console.log(savedData)
    if (savedData) {
      this.carcinogenicAgentForm.patchValue(savedData);
    }
  }

  get jobPositionRelations(): FilterOption[] {
    const jobPositions = this.formWizardService.jobPositions();
    if (!jobPositions) return [];
    
    return jobPositions.map((relation) => {
      return {
        label: relation.sector_name + ' - ' + relation.job_position,
        value: relation.sector_name + '-' + relation.job_position
      };
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

  public onSelectSubstance( itemId : string ) : void {
    const itemToSelect = this.substances().get( itemId );
    console.log(itemToSelect)
    if( itemToSelect ){
      this.substanceSelected.set( itemToSelect);
      this.carcinogenicAgentForm.patchValue( itemToSelect );
    }
  }

  public addSubstance(): void {
    this.carcinogenicAgentForm.markAllAsTouched();
    if (this.carcinogenicAgentForm.valid) {
      const substanceDto = this.createSubstance( this.carcinogenicAgentForm.value );
      console.log(substanceDto)
      if( substanceDto ){
        const newMap = new Map(this.substances());
        newMap.set(substanceDto.id!, substanceDto);
        this.substances.set(newMap);
        this.reset();
        console.log(this.carcinogenicAgentForm.value , this.substanceSelected)
      }
    }
    console.log(this.substances());
  }

  createSubstance( substance: Partial<SubstanceData> ) : SubstanceData {
    return {
      job_position_relation : substance.job_position_relation!,
      substance_id: substance.substance_id!,
      substance_name:  substance.substance_name!,
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

      id : substance.job_position_relation + substance.substance_id!,
    }
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
 
  public onSubmit() : void {
    this.carcinogenicAgentForm.markAllAsTouched();
    this.formWizardService.saveStep('substances' , this.carcinogenicAgentForm.value );
    if(this.carcinogenicAgentForm.invalid){
      return;
    }
  }

}

