import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SisdatComponent } from './sisdat.component';

describe('SisdatComponent', () => {
  let component: SisdatComponent;
  let fixture: ComponentFixture<SisdatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SisdatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SisdatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
