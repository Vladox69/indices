import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cal060ModalComponent } from '../componentes/cal060-modal/cal060-modal.component';
import { Alimentador } from '../modelos/alimentador.interface';
import { ExcelService } from '../servicios/excel.service';
import { IndicesService } from '../servicios/indices.service';

@Component({
  selector: 'app-cal060',
  templateUrl: './cal060.component.html',
  styleUrls: ['./cal060.component.css'],
})
export class Cal060Component implements OnInit {
  constructor(private indicesService: IndicesService,private modalService: NgbModal,private excelService:ExcelService) {}

 

  ngOnInit(): void {
    this.cargarDatos();
  }

  //variables
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
    
  }
  cargarDatos() {
    this.indicesService.listarFilasCal060('1').subscribe((resp:any)=>{
      this.informeCal=resp;
      console.log(resp);
    });

  }

  openModalTableCal060(){
    this.modalService.open(Cal060ModalComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
  }

  onReporteCal060(){
    this.excelService.downloadExcelCal060('Cal060.xlsx',"Cal060",[]); 
  }

}
