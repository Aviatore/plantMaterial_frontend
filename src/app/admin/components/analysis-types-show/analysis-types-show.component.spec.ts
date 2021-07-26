import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisTypesShowComponent } from './analysis-types-show.component';

describe('AnalysisTypesShowComponent', () => {
  let component: AnalysisTypesShowComponent;
  let fixture: ComponentFixture<AnalysisTypesShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalysisTypesShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisTypesShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
