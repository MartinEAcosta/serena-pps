import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSelectFieldComponent } from './form-select-field.component';

describe('FormSelectFieldComponent', () => {
  let component: FormSelectFieldComponent;
  let fixture: ComponentFixture<FormSelectFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSelectFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSelectFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
