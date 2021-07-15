import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesShowComponent } from './species-show.component';

describe('SpeciesShowComponent', () => {
  let component: SpeciesShowComponent;
  let fixture: ComponentFixture<SpeciesShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeciesShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeciesShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
