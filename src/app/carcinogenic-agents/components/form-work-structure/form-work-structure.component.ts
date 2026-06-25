import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormSectionComponent } from "../../../forms/components/form-section/form-section.component";
import { AddButtonComponent } from "@shared/components/add-button/add-button.component";
import { JobPositionComponent } from "../job-position/job-position.component";
import { FormNavigationBtnsComponent } from "@shared/components/form-navigation-btns/form-navigation-btns.component";
import { FormWizardService } from '../../../form-wizard.service';
import { BtnBasicComponent } from "@shared/components/btn-basic/btn-basic.component";

@Component({
  selector: 'app-form-work-structure',
  imports: [ReactiveFormsModule, FormSectionComponent, AddButtonComponent, JobPositionComponent, FormNavigationBtnsComponent, BtnBasicComponent],
  templateUrl: './form-work-structure.component.html',
  styleUrl: './form-work-structure.component.scss'
})
export class FormWorkStructureComponent implements OnInit{
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private wizardService = inject(FormWizardService);

  workStructureForm : FormGroup = this.fb.group({
    own_administrative_workers_count: [ '', [ Validators.min(0)] ],
    own_production_workers_count: [ '', [ Validators.min(0)] ],
    temporary_service_administrative_workers_count: [ '', [ Validators.min(0)] ],
    temporary_service_production_workers_count: [ '', [ Validators.min(0)] ],
    
    job_positions: this.fb.array<FormGroup>([]),
  });

  editingForm : FormGroup = this.createJobPosition();
  editingIndex : number | null = null;

  constructor () {}

  ngOnInit(): void {
    const savedData = this.wizardService.getStep('workStructure');
    console.log(savedData)
    if (savedData && savedData.job_positions) {
      // 1. Limpiamos el array por defecto para que no quede el vacío inicial
      this.jobPositions.clear();

      // 2. Reconstruimos la estructura: creamos un FormGroup por cada puesto guardado
      savedData.job_positions.forEach(() => {
        this.jobPositions.push(this.createJobPosition());
      });

      // 3. Ahora que la estructura coincide perfectamente, inyectamos los datos
      this.workStructureForm.patchValue(savedData);
    }
  }
  
  get jobPositions(): FormArray<FormGroup> {
    return this.workStructureForm.get('job_positions') as FormArray<FormGroup>;
  }

  public createJobPosition() : FormGroup {
    return this.fb.group({
      sector_name: ['', [Validators.required , Validators.minLength(3)]],
      sector_activity_code: ['', [ Validators.required ]],
      sector_activity_additional_description: ['', ],

      job_position: ['', [ Validators.required, Validators.minLength(3)]],
      job_activity_code: ['', [ Validators.required ]],
      job_activity_additional_description: ['']
    });
  };

  public saveJobPosition(): void {
    this.editingForm.markAllAsTouched();
    if (this.editingForm.invalid) return;

    if (this.editingIndex === null) {
      // Modo creación: agrega una fila nueva al FormArray
      this.jobPositions.push(this.fb.group(this.editingForm.value));
    } else {
      // Modo edición: actualiza la fila existente
      this.jobPositions.at(this.editingIndex).patchValue(this.editingForm.value);
    }

    this.resetEditingForm();
  }

  public removeJobPosition(index: number): void {
    this.jobPositions.removeAt(index);
    if (this.editingIndex === index) {
      this.resetEditingForm(); // si estaba editando la fila borrada, limpia el form
    } else if (this.editingIndex !== null && this.editingIndex > index) {
      this.editingIndex--; // ajusta el índice si se borró una fila anterior
    }
  }

  public viewJobPosition(index: number): void {
    const target = this.jobPositions.at(index);
    this.editingForm.patchValue(target.value);
    this.editingIndex = index;
  }

  public resetEditingForm(): void {
    this.editingForm.reset();
    this.editingIndex = null;
  }

  public addJobPosition(): void {
   this.jobPositions.push(this.createJobPosition());
  }

  public onSubmit() : void {
    this.workStructureForm.markAllAsTouched();
    console.log(this.workStructureForm.value)
    this.wizardService.saveStep('workStructure' , this.workStructureForm.value );
    if(this.workStructureForm.invalid){
      return;
    }
    this.router.navigate(['../sustancias-cancerigenas'], { relativeTo: this.route });
  }

}

