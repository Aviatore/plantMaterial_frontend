import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepsShowComponent } from './preps-show.component';

describe('PrepsShowComponent', () => {
  let component: PrepsShowComponent;
  let fixture: ComponentFixture<PrepsShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrepsShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
