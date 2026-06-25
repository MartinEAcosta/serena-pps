import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCarcinogenicAgentsComponent } from './form-carcinogenic-agents.component';

describe('FormCarcinogenicAgentsComponent', () => {
  let component: FormCarcinogenicAgentsComponent;
  let fixture: ComponentFixture<FormCarcinogenicAgentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCarcinogenicAgentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCarcinogenicAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
