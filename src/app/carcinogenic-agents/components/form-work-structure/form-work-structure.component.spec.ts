import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWorkStructureComponent } from './form-work-structure.component';

describe('FormWorkStructureComponent', () => {
  let component: FormWorkStructureComponent;
  let fixture: ComponentFixture<FormWorkStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormWorkStructureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormWorkStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
