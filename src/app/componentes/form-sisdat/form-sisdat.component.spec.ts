import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSisdatComponent } from './form-sisdat.component';

describe('FormSisdatComponent', () => {
  let component: FormSisdatComponent;
  let fixture: ComponentFixture<FormSisdatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSisdatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSisdatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
