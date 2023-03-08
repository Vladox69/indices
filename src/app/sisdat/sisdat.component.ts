import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SisdatModalComponent } from '../componentes/sisdat-modal/sisdat-modal.component';
import { Alimentador } from '../modelos/alimentador.interface';
import { ExcelService } from '../servicios/excel.service';
import { IndicesService } from '../servicios/indices.service';

@Component({
  selector: 'app-sisdat',
  templateUrl: './sisdat.component.html',
  styleUrls: ['./sisdat.component.css']
})
export class SisdatComponent implements OnInit {

  constructor(private indicesService:IndicesService,private modalService: NgbModal,private excelService:ExcelService) { 
    
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  //variables
  codigoArchivo:any;
  SRAR_CODIGO='1';
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
    this.indicesService.listarFilasSISDAT(this.SRAR_CODIGO).subscribe(res=>{
      this.informeSisdat=res;
    });
  }

  onReporteSisdat(){
    let datosExcel:any=[];
    for (let i = 0; i < this.informeSisdat.length; i++) {
      const element = this.informeSisdat[i];
      let dato:any=[
        i+1,
        element.SSIS_SUBESTACION,
        element.SSIS_ALIMENTADOR,
        element.SSIS_SECTOR,
        Number(element.SSIS_POTENCIA),
        " ",
        element.SSIS_FAL==null?"-":Number(element.SSIS_FAL),
        element.SSIS_TAL==null?"-":Number(element.SSIS_TAL),
        element.SSIS_FMIK==null?"-":Number(element.SSIS_FMIK),
        element.SSIS_TTIK==null?"-":Number(element.SSIS_TTIK),
        Number(element.SSIS_PROGRAMADAS),
        Number(element.SSIS_NOPROGRAMADAS),
        " ",
        element.SSIS_TRANSMISOR,
        " ",
        " ",
        " ",
        " ",
        element.SSIS_FMIK_PROG==null?"-":Number(element.SSIS_FMIK_PROG),
        element.SSIS_FAL_PROG==null?"-":Number(element.SSIS_FAL_PROG),
        element.SSIS_TTIK_PROG==null?"-":Number(element.SSIS_TTIK_PROG),
        element.SSIS_TAL_PROG==null?"-":Number(element.SSIS_TAL_PROG),
        element.SSIS_FMIK_NOPROG==null?"-":Number(element.SSIS_FMIK_NOPROG),
        element.SSIS_FAL_NOPROG==null?"-":Number(element.SSIS_FAL_NOPROG),
        element.SSIS_TTIK_NOPROG==null?"-":Number(element.SSIS_TTIK_NOPROG),
        element.SSIS_TAL_NOPROG==null?"-":Number(element.SSIS_TAL_NOPROG),
        element.SSIS_FMIK_EXT_TRANS==null?"-":Number(element.SSIS_FMIK_EXT_TRANS),
        element.SSIS_FAL_EXT_TRANS==null?"-":Number(element.SSIS_FAL_EXT_TRANS),
        element.SSIS_TTIK_EXT_TRANS==null?"-":Number(element.SSIS_TTIK_EXT_TRANS),
        element.SSIS_TAL_EXT_TRANS==null?"-":Number(element.SSIS_TAL_EXT_TRANS),
        element.SSIS_OBSERVACION
      ];
      datosExcel.push(dato);
    }
    
  this.excelService.downloadExcelSisdat('Sisdat.xlsx',"Calidad Servicio Técnico",datosExcel);    
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
