import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarcinogenicAgentsComponent } from './carcinogenic-agents.component';

  let component: CarcinogenicAgentsComponent;
  let fixture: ComponentFixture<CarcinogenicAgentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarcinogenicAgentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarcinogenicAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
