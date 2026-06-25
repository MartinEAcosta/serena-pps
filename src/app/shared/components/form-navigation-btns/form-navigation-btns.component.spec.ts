import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNavigationBtnsComponent } from './form-navigation-btns.component';

describe('FormNavigationBtnsComponent', () => {
  let component: FormNavigationBtnsComponent;
  let fixture: ComponentFixture<FormNavigationBtnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormNavigationBtnsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormNavigationBtnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
