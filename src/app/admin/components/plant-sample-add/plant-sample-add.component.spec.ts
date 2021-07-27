import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantSampleAddComponent } from './plant-sample-add.component';

describe('PlantSampleAddComponent', () => {
  let component: PlantSampleAddComponent;
  let fixture: ComponentFixture<PlantSampleAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantSampleAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantSampleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
