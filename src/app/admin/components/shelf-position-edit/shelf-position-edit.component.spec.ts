import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelfPositionEditComponent } from './shelf-position-edit.component';

describe('ShelfPositionEditComponent', () => {
  let component: ShelfPositionEditComponent;
  let fixture: ComponentFixture<ShelfPositionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShelfPositionEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelfPositionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
