import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisTypesEditComponent } from './analysis-types-edit.component';

describe('AnalysisTypesComponent', () => {
  let component: AnalysisTypesEditComponent;
  let fixture: ComponentFixture<AnalysisTypesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalysisTypesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisTypesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
