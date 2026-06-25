import { Component, Input } from '@angular/core';
import { FormFieldComponent } from "../../../forms/components/form-field/form-field.component";
import { SelectSearchComponent } from "@shared/components/select-search/select-search.component";
import { FormGroup } from '@angular/forms';
import { JobActivityCodes, SectorActivityCodes } from '../../../utils/ActivityCodes';
import { FilterOption } from '../../../utils/filters/filter.interface';

const sectorActivityCodes = SectorActivityCodes;
const jobActivityCodes = JobActivityCodes;

@Component({
  selector: 'app-job-position',
  imports: [FormFieldComponent, SelectSearchComponent],
  templateUrl: './job-position.component.html',
  styleUrl: './job-position.component.scss'
})
export class JobPositionComponent {

  @Input({ required: true}) form! : FormGroup;

  public get sectorActivityCodes () : FilterOption[] {
    return sectorActivityCodes;
  }

  public get jobActivityCodes () : FilterOption[] {
    return jobActivityCodes;
  }

  public patchValuesForm ( prefix : string , filterOption : FilterOption ){
    this.form.get(prefix+'_code')?.setValue( filterOption.value );
    this.form.get(prefix +'_description')?.setValue( filterOption.label )
  }

}
