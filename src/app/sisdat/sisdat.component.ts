import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SisdatModalComponent } from '../componentes/sisdat-modal/sisdat-modal.component';
import { Alimentador } from '../modelos/alimentador.interface';
import { IndicesService } from '../servicios/indices.service';

@Component({
  selector: 'app-sisdat',
  templateUrl: './sisdat.component.html',
  styleUrls: ['./sisdat.component.css']
})
export class SisdatComponent implements OnInit {

  constructor(private indicesService:IndicesService,private modalService: NgbModal) { 
    
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  //variables
  codigoArchivo:any;
  SRAR_CODIGO='77';
  listaAlimentadores:Alimentador[]=[];
  historialPotencia:any[]=[];
  listaValoresSISDAT:any[]=[];
  listaValoresPROGNOPROG:any[]=[];
  informeSisdat:any[]=[];
  titulos:any=[
    'Subestación',
    'Alimentador',
    'Tipo',
    'Potencia Instalada (KVA)',
    'Energía no Suministrada (kWh)',
    'FAL',
    'TAL',
    'FMIK',
    'TTIK',
    'Programadas',
    'No Programadas',
    'Otra distribuidora',
    'Transmisor',
    'Generador',
    'Restricción de carga',
    'Baja frecuencia',
    'Otras',
    'FMIK_Prog',
    'FAL_Prog',
    'TTIK_Prog',
    'TAL_Prog',
    'FMIK_NOPROG',
    'FAL_NOPROG',
    'TTIK_NOPROG',
    'TAL_NOPROG',
    'FMIK_EXT_TRANS',
    'FAL_EXT_TRANS',
    'TTIK_EXT_TRANS',
    'TAL_EXT_TRANS',
    'Observaciones',
    'Editar'
  ];
  term:any;
  p:any=1;

  cargarDatos(){
    
  }

  

  openModalFormSisdat() {
    this.modalService.open(SisdatModalComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
  }

}
