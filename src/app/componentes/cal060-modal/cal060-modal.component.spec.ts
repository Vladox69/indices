import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cal060ModalComponent } from './cal060-modal.component';

describe('Cal060ModalComponent', () => {
  let component: Cal060ModalComponent;
  let fixture: ComponentFixture<Cal060ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cal060ModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cal060ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
