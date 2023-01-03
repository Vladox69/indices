import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IndicesService } from 'src/app/servicios/indices.service';

@Component({
  selector: 'app-incidencias-descartadas',
  templateUrl: './incidencias-descartadas.component.html',
  styleUrls: ['./incidencias-descartadas.component.css']
})
export class IncidenciasDescartadasComponent implements OnInit {
  p:any=1;
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
  codigoArchivo:any;
  term:any;
  incidenciasDescartadas:any=[];
  constructor(private activatedRoute: ActivatedRoute,private indicesServices:IndicesService) {
    this.codigoArchivo=this.activatedRoute.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.obtenerIncidenciasDescartadas();
  }

  obtenerIncidenciasDescartadas(){
    const resp=this.indicesServices.listarInformeDiario(this.codigoArchivo);
    resp.subscribe((data)=>{
     this.incidenciasDescartadas=data;
     this.incidenciasDescartadas=this.incidenciasDescartadas.filter((row:any)=>row.SIND_INCIDENCIA_ESTADO==='true');
    });
   }

}
