import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantSampleEditComponent } from './plant-sample-edit.component';

describe('PlantSampleEditComponent', () => {
  let component: PlantSampleEditComponent;
  let fixture: ComponentFixture<PlantSampleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantSampleEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantSampleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
