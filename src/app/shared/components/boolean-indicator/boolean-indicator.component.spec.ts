import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanIndicatorComponent } from './boolean-indicator.component';

describe('BooleanIndicatorComponent', () => {
  let component: BooleanIndicatorComponent;
  let fixture: ComponentFixture<BooleanIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooleanIndicatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooleanIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
