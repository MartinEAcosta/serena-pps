import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarcinogenicAgentsLayoutComponent } from './carcinogenic-agents-layout.component';

describe('CarcinogenicAgentsLayoutComponent', () => {
  let component: CarcinogenicAgentsLayoutComponent;
  let fixture: ComponentFixture<CarcinogenicAgentsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarcinogenicAgentsLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarcinogenicAgentsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
