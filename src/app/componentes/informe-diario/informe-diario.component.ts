import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExcelService } from 'src/app/servicios/excel.service';
import { IndicesService } from 'src/app/servicios/indices.service';
import { AddIncidenciaComponent } from '../add-incidencia/add-incidencia.component';

@Component({
  selector: 'app-informe-diario',
  templateUrl: './informe-diario.component.html',
  styleUrls: ['./informe-diario.component.css']
})
export class InformeDiarioComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,private indicesServices:IndicesService,
    private router:Router,private excelService:ExcelService,private modalService: NgbModal) {
    this.codigoArchivo=this.activatedRoute.snapshot.paramMap.get('id');
   }

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
    'Editar'
  ];
  codigoArchivo:any;
  term:any;
  informeDiario:any=[];
  descartadas:any=[];

  ngOnInit(): void {
    this.obtenerFilasInformeDiario();
  }

  obtenerFilasInformeDiario(){
   const resp=this.indicesServices.listarInformeDiario(this.codigoArchivo);
   resp.subscribe((data)=>{
    this.informeDiario=data;
    this.informeDiario=this.informeDiario.filter((row:any)=>row.SIND_INCIDENCIA_ESTADO==='false');
   });
  }

  async onDescartar(){
    this.descartadas=this.informeDiario.filter((row:any)=>row.SIND_INCIDENCIA_ESTADO==='true');
    for (let i = 0; i < this.descartadas.length; i++) {
      const element = this.descartadas[i];
      const resp= await this.indicesServices.updateFilaInformeDiario([element]);
      resp.subscribe((data)=>{
        this.onIncidenciasDescartadas();
      })
    }
  }

  onIncidenciasDescartadas(){
    this.router.navigate(['/incidencias-descartadas',this.codigoArchivo]);
  }

  onChangeCheckbox(row:any){
    for (let i = 0; i < this.informeDiario.length; i++) {
      const element = this.informeDiario[i];
      if(element.SIND_CODIGO===row['SIND_CODIGO']){
          if(element.SIND_INCIDENCIA_ESTADO==='false'){
            this.informeDiario[i].SIND_INCIDENCIA_ESTADO='true';
          }else{
            this.informeDiario[i].SIND_INCIDENCIA_ESTADO='false';
          }        
      }
    }
  }

  onReporteTotal(){
    let titulosExcel = [...this.titulos];
    titulosExcel.splice(0, 1);
    let datosExcel:any=[];
    for (let i = 0; i < this.informeDiario.length; i++) {
      const element = this.informeDiario[i];
      let dato = [
        element.SIND_NINCIDENTE,
        element.SIND_INDICADOR_FM,
        element.SIND_NIVEL_AFECT,
        element.SIND_ALIMENTADOR,
        element.SIND_ETAPA_FUN,
        element.SIND_INSTALACION_EF,
        element.SIND_PROVINCIA,
        element.SIND_CANTON,
        element.SIND_SECTOR,
        '',
        '',
        element.SIND_PROPIEDAD,
        element.SIND_PROTECCION,
        element.SIND_TIPO_PROTECCION,
        element.SIND_ETAPA_FUN,
        element.SIND_INSTALACION_EF,
        element.SIND_PROVINCIA,
        element.SIND_CANTON,
        element.SIND_SECTOR,
        element.SIND_LINEA_SUBT,
        element.SIND_SUBESTACION,
        '',
        element.SIND_SECTOR,
        element.SIND_NIVEL_TENSION,
        element.SIND_NIVEL_AFECT,
        element.SIND_INTE_ORIGEN,
        element.SIND_INTE_CAUSA,
        element.SIND_TRANSMISOR,
        element.SIND_CAUSAS,
        element.SIND_POTENCIAL_NI,
        element.SIND_POTENCIAL_NFS,
        '',
        element.SIND_INT_FECHA_INICIO,
        element.SIND_INT_HORA_INICIO,
        element.SIND_INT_FECHA_FIN,
        element.SIND_INT_HORA_FIN,
        element.SIND_INT_DURACION_HORAS,
        element.SIND_INT_DURACION,
        element.SIND_FMIK,
        element.SIND_TTIK,
      ];
      datosExcel.push(dato);
    }
    this.excelService.downloadExcel(titulosExcel,datosExcel,'IncidenciasTotales.xlsx','Incidencias Totales');
  }
  openModal() {
   const activeModal= this.modalService.open(AddIncidenciaComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
    activeModal.componentInstance.codigoArchivo = this.codigoArchivo;
  }

  onEditIncidencia(incidencia:any) {
    const activeModal =this.modalService.open(AddIncidenciaComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
    activeModal.componentInstance.incidencia = incidencia;

  }
}
