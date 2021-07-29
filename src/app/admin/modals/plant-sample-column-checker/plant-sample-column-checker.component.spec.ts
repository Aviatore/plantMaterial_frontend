import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantSampleColumnCheckerComponent } from './plant-sample-column-checker.component';

describe('PlantSampleColumnCheckerComponent', () => {
  let component: PlantSampleColumnCheckerComponent;
  let fixture: ComponentFixture<PlantSampleColumnCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantSampleColumnCheckerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantSampleColumnCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
