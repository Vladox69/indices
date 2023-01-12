import { Component, OnInit } from '@angular/core';
import { Alimentador } from '../modelos/alimentador.interface';
import { IndicesService } from '../servicios/indices.service';

@Component({
  selector: 'app-cal060',
  templateUrl: './cal060.component.html',
  styleUrls: ['./cal060.component.css'],
})
export class Cal060Component implements OnInit {
  constructor(private indicesService: IndicesService) {}

 

  ngOnInit(): void {
    this.cargarDatos();
  }

  //variables
    listaAlimentadores:Alimentador[]=[];
    listaIncidencias:any[]=[];
    informeCal:any[]=[];
    titulos: any = [
    'Código de Interrupción',
    'Indicador de Mantenimiento  o falla',
    'Etapa funcional en la que se presentó la falla',
    'Instalación / Equipo donde se presentó la falla',
    'Provincia',
    'Cantón',
    'Sector',
    'Ubicación Estimada de la Falla',
    'Propiedad de la Instalación / Equipo donde se presentó la falla',
    'Protección que Operó',
    'Tipo de protección que actuó',
    'Etapa funcional en la que se presentó la interrupción de servicio',
    'Instalación / Equipo donde se presentó la interrupción de servicio',
    'Provincia',
    'Cantón',
    'Sector',
    'Línea de Subtransmisión',
    'Subestación',
    'Alimentador primario',
    'Tipo de Alimentador primario',
    'Nivel de Tensión(kv)',
    'Nivel de afectación de la interrupción a la Red',
    'Origen de Interrupción',
    'Causa de Interrupción',
    'Catálogo de Interrupciones',
    'Descripción de Interrupción',
    'Potencia Nominal Instalada',
    'Potencia  Nominal Fuera de Servicio (kVA)',
    'Potencia  Nominal Fuera de Servicio (MW)',
    'Carga Fuera de Servicio (kVA)',
    'Energía No Suminstrada (MWh)',
    'Fecha Inicio de Interrupción',
    'Hora Inicio de Interrupción',
    'Fecha Fin de Interrupción',
    'Hora Fin de Interrupción',
    'Duración de Interrupción (Horas:minutos:segundos)',
    'Duración de Interrupción (Horas)',
    'FMIk',
    'TTIk',
    'Observaciones',
    'Editar'
  ];
  term: any;
  p: any = 1;
  
  doInforme() {
    this.listaIncidencias.forEach((element) => {});
  }
  cargarDatos() {
    this.indicesService.listarInformeDiario('77').subscribe((res) => {
      this.listaIncidencias = res;
      console.log(this.listaIncidencias);
    });
    this.indicesService.listarAlimentadoresActivos().subscribe(res=>{
     this.listaAlimentadores = res; 
    });
  }
}
