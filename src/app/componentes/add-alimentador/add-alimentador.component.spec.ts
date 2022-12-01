import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlimentadorComponent } from './add-alimentador.component';

describe('AddAlimentadorComponent', () => {
  let component: AddAlimentadorComponent;
  let fixture: ComponentFixture<AddAlimentadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAlimentadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAlimentadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
