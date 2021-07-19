import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelfPositionShowComponent } from './shelf-position-show.component';

describe('ShelfPositionShowComponent', () => {
  let component: ShelfPositionShowComponent;
  let fixture: ComponentFixture<ShelfPositionShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShelfPositionShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelfPositionShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
