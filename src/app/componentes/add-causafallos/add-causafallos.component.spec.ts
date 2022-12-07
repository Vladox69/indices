import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCausafallosComponent } from './add-causafallos.component';

describe('AddCausafallosComponent', () => {
  let component: AddCausafallosComponent;
  let fixture: ComponentFixture<AddCausafallosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCausafallosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCausafallosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
