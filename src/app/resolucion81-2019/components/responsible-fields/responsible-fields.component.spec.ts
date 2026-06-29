import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsibleFieldsComponent } from './responsible-fields.component';

describe('ResponsibleFieldsComponent', () => {
  let component: ResponsibleFieldsComponent;
  let fixture: ComponentFixture<ResponsibleFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponsibleFieldsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsibleFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
