import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantSampleShowEditComponent } from './plant-sample-show-edit.component';

describe('PlantSampleEditComponent', () => {
  let component: PlantSampleShowEditComponent;
  let fixture: ComponentFixture<PlantSampleShowEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantSampleShowEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantSampleShowEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
