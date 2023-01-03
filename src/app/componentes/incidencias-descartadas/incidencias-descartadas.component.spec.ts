import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidenciasDescartadasComponent } from './incidencias-descartadas.component';

describe('IncidenciasDescartadasComponent', () => {
  let component: IncidenciasDescartadasComponent;
  let fixture: ComponentFixture<IncidenciasDescartadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidenciasDescartadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidenciasDescartadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
