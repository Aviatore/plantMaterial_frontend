import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationTypeShowComponent } from './location-type-show.component';

describe('LocationTypeShowComponent', () => {
  let component: LocationTypeShowComponent;
  let fixture: ComponentFixture<LocationTypeShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationTypeShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationTypeShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
