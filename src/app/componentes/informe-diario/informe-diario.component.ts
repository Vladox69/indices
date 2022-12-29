import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-informe-diario',
  templateUrl: './informe-diario.component.html',
  styleUrls: ['./informe-diario.component.css']
})
export class InformeDiarioComponent implements OnInit {

  constructor() { }

  p:any=1;
  tabla:any=[];
  titulos:any=[
    'Quitar',
    'Incidente No',
    'Indicador de Mantenimiento  o falla',
    'Nivel de afectación de la interrupción a la Red',
    'ALIMENTADOR ASOCIADO A LA FALLA O SUSPENSIÓN',
    'Etapa funcional en la que se presentó la falla',
    'Instalación / Equipo que se desconectó a la falla',
    'Provincia',
    'Cantón',
    'Sector',
    'Número de Trafo',
    'Número de Seccionador',
    'Propiedad',
    'Protección que Operó',
    'Tipo de Protección que actuo',
    'Etapa funcional',
    'Instalación / Equipo',
    'Provincia',
    'Cantón',
    'Sector',
    'Línea de Subtransmisión',
    'Subestación',
    'Falla en Transmisor',
    'Tipo de Alimentador Primario',
    'Nivel de Tensión KV',
    'Nivel de Afectasión',
    'Origen de Interrupción',
    'Causa de Interrupción',
    'Transmisor',
    'Causas',
    'Potencial Nominal Instalado',
    'Potencial Nominal Fuera de Servicio',
    'Carga Instalada Fuera de Servicio',
    'Fecha Inicio Interrupcion',
    'Hora Inicio Interrupcion',
    'Fecha Fin Interrupcion',
    'Hora Fin Interrupcion',
    'Duración de Interrupción Horas/min/seg',
    'Duración de Interrupción Horas',
    'FMIK',
    'TTIK',
  ];
  term:any;

  ngOnInit(): void {
  }

  obtenerFilasInformeDiario(codigoArchivo:any){
    
  }

}
