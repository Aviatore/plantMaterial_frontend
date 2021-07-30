import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantSampleAddPrepComponent } from './plant-sample-add-prep.component';

describe('PlantSampleAddPrepComponent', () => {
  let component: PlantSampleAddPrepComponent;
  let fixture: ComponentFixture<PlantSampleAddPrepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantSampleAddPrepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantSampleAddPrepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
