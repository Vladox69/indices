import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cal060Component } from './cal060.component';

describe('Cal060Component', () => {
  let component: Cal060Component;
  let fixture: ComponentFixture<Cal060Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cal060Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cal060Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
