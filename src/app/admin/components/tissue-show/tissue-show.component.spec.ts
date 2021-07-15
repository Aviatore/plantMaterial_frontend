import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TissueShowComponent } from './tissue-show.component';

describe('TissueShowComponent', () => {
  let component: TissueShowComponent;
  let fixture: ComponentFixture<TissueShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TissueShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TissueShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
