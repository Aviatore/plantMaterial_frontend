import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TissueEditComponent } from './tissue-edit.component';

describe('TissueEditComponent', () => {
  let component: TissueEditComponent;
  let fixture: ComponentFixture<TissueEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TissueEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TissueEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
