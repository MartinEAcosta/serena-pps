import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionDropdownComponent } from './section-dropdown.component';

describe('SectionDropdownComponent', () => {
  let component: SectionDropdownComponent;
  let fixture: ComponentFixture<SectionDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
