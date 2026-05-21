import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyHeaderMenuComponent } from './sticky-header-menu.component';

describe('StickyHeaderMenuComponent', () => {
  let component: StickyHeaderMenuComponent;
  let fixture: ComponentFixture<StickyHeaderMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StickyHeaderMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickyHeaderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
