import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SisdatModalComponent } from './sisdat-modal.component';

describe('SisdatModalComponent', () => {
  let component: SisdatModalComponent;
  let fixture: ComponentFixture<SisdatModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SisdatModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SisdatModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
