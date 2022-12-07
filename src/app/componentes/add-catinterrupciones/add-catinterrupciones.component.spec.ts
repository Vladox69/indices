import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCatinterrupcionesComponent } from './add-catinterrupciones.component';

describe('AddCatinterrupcionesComponent', () => {
  let component: AddCatinterrupcionesComponent;
  let fixture: ComponentFixture<AddCatinterrupcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCatinterrupcionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCatinterrupcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
