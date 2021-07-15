import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesEditComponent } from './species-edit.component';

describe('SpeciesEditComponent', () => {
  let component: SpeciesEditComponent;
  let fixture: ComponentFixture<SpeciesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeciesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeciesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
