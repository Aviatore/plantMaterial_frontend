import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepLabelComponent } from './prep-label.component';

describe('PrepLabelComponent', () => {
  let component: PrepLabelComponent;
  let fixture: ComponentFixture<PrepLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrepLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
