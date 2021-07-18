import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainersShowComponent } from './containers-show.component';

describe('ContainersShowComponent', () => {
  let component: ContainersShowComponent;
  let fixture: ComponentFixture<ContainersShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainersShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainersShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
