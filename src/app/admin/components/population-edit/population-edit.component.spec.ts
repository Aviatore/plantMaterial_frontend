import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulationEditComponent } from './population-edit.component';

describe('PopulationEditComponent', () => {
  let component: PopulationEditComponent;
  let fixture: ComponentFixture<PopulationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopulationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopulationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
