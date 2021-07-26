import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulationShowComponent } from './population-show.component';

describe('PopulationShowComponent', () => {
  let component: PopulationShowComponent;
  let fixture: ComponentFixture<PopulationShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopulationShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopulationShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
