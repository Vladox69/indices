import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CausasfallosComponent } from './causasfallos.component';

describe('CausasfallosComponent', () => {
  let component: CausasfallosComponent;
  let fixture: ComponentFixture<CausasfallosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CausasfallosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CausasfallosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
