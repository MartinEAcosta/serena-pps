import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerFieldsComponent } from './employer-fields.component';

describe('EmployerFieldsComponent', () => {
  let component: EmployerFieldsComponent;
  let fixture: ComponentFixture<EmployerFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployerFieldsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
