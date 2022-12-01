import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatinterrupcionesComponent } from './catinterrupciones.component';

describe('CatinterrupcionesComponent', () => {
  let component: CatinterrupcionesComponent;
  let fixture: ComponentFixture<CatinterrupcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatinterrupcionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatinterrupcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
