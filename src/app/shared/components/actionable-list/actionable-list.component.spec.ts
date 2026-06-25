import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionableListComponent } from './actionable-list.component';

describe('ActionableListComponent', () => {
  let component: ActionableListComponent;
  let fixture: ComponentFixture<ActionableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionableListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
