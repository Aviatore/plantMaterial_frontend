import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationTypeEditComponent } from './location-type-edit.component';

describe('LocationTypeEditComponent', () => {
  let component: LocationTypeEditComponent;
  let fixture: ComponentFixture<LocationTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationTypeEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
