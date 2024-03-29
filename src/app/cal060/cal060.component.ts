import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private indicesService: IndicesService,private modalService: NgbModal,private excelService:ExcelService,private activatedRoute: ActivatedRoute,private router:Router) {
    this.SRAR_CODIGO=this.activatedRoute.snapshot.paramMap.get('id');
  }

 

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
    SRAR_CODIGO:any;
  term: any;
  p: any = 1;
  
  doInforme() {
    
  }
  cargarDatos() {
    this.indicesService.listarFilasCal060(this.SRAR_CODIGO).subscribe((resp:any)=>{
      this.informeCal=resp;
    });

  }

  openModalTableCal060(){
    const activeModal = this.modalService.open(Cal060ModalComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
    activeModal.componentInstance.SRAR_CODIGO = this.SRAR_CODIGO;
  }

  onReporteCal060(){
    let datosExcel:any=[];
    for (let i = 0; i < this.informeCal.length; i++) {
      const element = this.informeCal[i];
      let dato:any=[
        i+1,
        element.SCAL_CODIGO_INTERRUPCION,
        element.SCAL_INDICADOR_FM,
        element.SCAL_ETAPA_FUN,
        element.SCAL_INSTALACION_EF,
        element.SCAL_PROVINCIA,
        element.SCAL_CANTON,
        element.SCAL_SECTOR,
        "-",
        element.SCAL_PROPIEDAD,
        element.SCAL_PROTECCION,
        element.SCAL_TIPO_PROTECCION,
        element.SCAL_TIPO_PROTECCION,
        element.SSIS_TRANSMISOR,
        element.SCAL_TIPO_PROTECCION,
        element.SCAL_ETAPA_FUN,
        element.SCAL_INSTALACION_EF,
        element.SCAL_PROVINCIA,
        element.SCAL_CANTON,
        element.SCAL_SECTOR,
        element.SCAL_LINEA_SUBT,
        element.SCAL_SUBESTACION,
        element.SCAL_ALIMENTADOR_PRIMARIO,
        element.SCAL_SECTOR,
        element.SCAL_NIVEL_TENSION,
        "Ramal Trifásico",
        element.SCAL_INTE_ORIGEN,
        element.SCAL_INTE_CAUSA,
        element.SCAL_CAUSAS,
        "-",
        element.SCAL_POTENCIAL_NI,
        element.SCAL_POTENCIAL_NFS,
        "Potencial Nominal Fuera de Servicio (MW)",
        "CARGA FUERA SERVICIO",
        "ENERGIA NO SUMINISTRADA",
        element.SCAL_INT_FECHA_INICIO,
        element.SCAL_INT_HORA_INICIO,
        element.SCAL_INT_FECHA_FIN,
        element.SCAL_INT_HORA_FIN,
        element.SCAL_INT_DURACION,
        element.SCAL_INT_DURACION_HORAS,
        element.SCAL_FMIK,
        element.SCAL_TTIK,
        element.SCAL_OBSERVACIONES
      ];
      datosExcel.push(dato);
    }
    this.excelService.downloadExcelCal060('Cal060.xlsx',"Cal060",datosExcel); 
  }

  goBack(){
    this.router.navigate(['/subir-archivos'])
  }


}
