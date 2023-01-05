import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IndicesService } from 'src/app/servicios/indices.service';

@Component({
  selector: 'app-add-incidencia',
  templateUrl: './add-incidencia.component.html',
  styleUrls: ['./add-incidencia.component.css']
})
export class AddIncidenciaComponent implements OnInit {


  constructor(private modalService:NgbModal,public ngbActiveModal:NgbActiveModal
    ,private indicesServices:IndicesService) { }

  @Input() incidencia:any=null;
  @Input() codigoArchivo:any=null;

  formIncidencia:FormGroup=new FormGroup({
    SIND_CODIGO:new FormControl(null),
    SRAR_CODIGO: new FormControl(null),
    SIND_NINCIDENTE: new FormControl('', []),
    SIND_INCIDENCIA_ESTADO: new FormControl('', []),
    SIND_INDICADOR_FM: new FormControl('', []),
    SIND_NIVEL_AFECT: new FormControl('', []),
    SIND_ALIMENTADOR: new FormControl('', []),
    SIND_ETAPA_FUN: new FormControl('', []),
    SIND_INSTALACION_EF: new FormControl('', []),
    SIND_PROVINCIA: new FormControl('', []),
    SIND_CANTON: new FormControl('', []),
    SIND_SECTOR: new FormControl('', []),
    SIND_PROPIEDAD: new FormControl('', []),
    SIND_PROTECCION: new FormControl('', []),
    SIND_TIPO_PROTECCION: new FormControl('', []),
    SIND_TRANSMISOR: new FormControl('', []),
    SIND_LINEA_SUBT: new FormControl('', []),
    SIND_SUBESTACION: new FormControl('', []),
    SIND_NIVEL_TENSION: new FormControl('', []),
    SIND_INTE_ORIGEN: new FormControl('', []),
    SIND_INTE_CAUSA: new FormControl('', []),
    SIND_CAUSAS: new FormControl('', []),
    SIND_POTENCIAL_NI: new FormControl('', []),
    SIND_POTENCIAL_NFS: new FormControl('', []),
    SIND_INT_FECHA_INICIO: new FormControl('', []),
    SIND_INT_HORA_INICIO: new FormControl('', []),
    SIND_INT_FECHA_FIN: new FormControl('', []),
    SIND_INT_HORA_FIN: new FormControl('', []),
    SIND_INT_DURACION: new FormControl('', []),
    SIND_FMIK: new FormControl('', []),
    SIND_TTIK: new FormControl('', []),
    SIND_INCIDENCIA_DES_RAZON: new FormControl('', []),
    SIND_INT_DURACION_HORAS: new FormControl('', []),
  })

  ngOnInit(): void {
    if(this.incidencia!=null){
      this.setFormIncidencia();
    }else{
      this.formIncidencia.get("SRAR_CODIGO")?.setValue(this.codigoArchivo);
      this.formIncidencia.get("SIND_INCIDENCIA_ESTADO")?.setValue('false');
    }
  }

  setFormIncidencia(){
    this.formIncidencia.get("SIND_INCIDENCIA_ESTADO")?.setValue(this.incidencia["SIND_INCIDENCIA_ESTADO"]);
    this.formIncidencia.get("SIND_CODIGO")?.setValue(this.incidencia["SIND_CODIGO"]);
    this.formIncidencia.get("SRAR_CODIGO")?.setValue(this.incidencia["SRAR_CODIGO"]);
    this.formIncidencia.get("SIND_NINCIDENTE")?.setValue(this.incidencia["SIND_NINCIDENTE"]);
    this.formIncidencia.get("SIND_INDICADOR_FM")?.setValue(this.incidencia["SIND_INDICADOR_FM"]);
    this.formIncidencia.get("SIND_NIVEL_AFECT")?.setValue(this.incidencia["SIND_NIVEL_AFECT"]);
    this.formIncidencia.get("SIND_ALIMENTADOR")?.setValue(this.incidencia["SIND_ALIMENTADOR"]);
    this.formIncidencia.get("SIND_ETAPA_FUN")?.setValue(this.incidencia["SIND_ETAPA_FUN"]);
    this.formIncidencia.get("SIND_INSTALACION_EF")?.setValue(this.incidencia["SIND_INSTALACION_EF"]);
    this.formIncidencia.get("SIND_PROVINCIA")?.setValue(this.incidencia["SIND_PROVINCIA"]);
    this.formIncidencia.get("SIND_CANTON")?.setValue(this.incidencia["SIND_CANTON"]);
    this.formIncidencia.get("SIND_SECTOR")?.setValue(this.incidencia["SIND_SECTOR"]);
    this.formIncidencia.get("SIND_PROPIEDAD")?.setValue(this.incidencia["SIND_PROPIEDAD"]);
    this.formIncidencia.get("SIND_PROTECCION")?.setValue(this.incidencia["SIND_PROTECCION"]);
    this.formIncidencia.get("SIND_TIPO_PROTECCION")?.setValue(this.incidencia["SIND_TIPO_PROTECCION"]);
    this.formIncidencia.get("SIND_TRANSMISOR")?.setValue(this.incidencia["SIND_TRANSMISOR"]);
    this.formIncidencia.get("SIND_LINEA_SUBT")?.setValue(this.incidencia["SIND_LINEA_SUBT"]);
    this.formIncidencia.get("SIND_SUBESTACION")?.setValue(this.incidencia["SIND_SUBESTACION"]);
    this.formIncidencia.get("SIND_NIVEL_TENSION")?.setValue(this.incidencia["SIND_NIVEL_TENSION"]);
    this.formIncidencia.get("SIND_INTE_ORIGEN")?.setValue(this.incidencia["SIND_INTE_ORIGEN"]);
    this.formIncidencia.get("SIND_INTE_CAUSA")?.setValue(this.incidencia["SIND_INTE_CAUSA"]);
    this.formIncidencia.get("SIND_CAUSAS")?.setValue(this.incidencia["SIND_CAUSAS"]);
    this.formIncidencia.get("SIND_POTENCIAL_NI")?.setValue(this.incidencia["SIND_POTENCIAL_NI"]);
    this.formIncidencia.get("SIND_POTENCIAL_NFS")?.setValue(this.incidencia["SIND_POTENCIAL_NFS"]);
    this.formIncidencia.get("SIND_INT_FECHA_INICIO")?.setValue(this.incidencia["SIND_INT_FECHA_INICIO"]);
    this.formIncidencia.get("SIND_INT_HORA_INICIO")?.setValue(this.incidencia["SIND_INT_HORA_INICIO"]);
    this.formIncidencia.get("SIND_INT_FECHA_FIN")?.setValue(this.incidencia["SIND_INT_FECHA_FIN"]);
    this.formIncidencia.get("SIND_INT_HORA_FIN")?.setValue(this.incidencia["SIND_INT_HORA_FIN"]);
    this.formIncidencia.get("SIND_INT_DURACION")?.setValue(this.incidencia["SIND_INT_DURACION"]);
    this.formIncidencia.get("SIND_FMIK")?.setValue(this.incidencia["SIND_FMIK"]);
    this.formIncidencia.get("SIND_TTIK")?.setValue(this.incidencia["SIND_TTIK"]);
    this.formIncidencia.get("SIND_INCIDENCIA_DES_RAZON")?.setValue(this.incidencia["SIND_INCIDENCIA_DES_RAZON"]);
    this.formIncidencia.get("SIND_INT_DURACION_HORAS")?.setValue(this.incidencia["SIND_INT_DURACION_HORAS"]);
  }

  async addIncidencia(){
    
    let incidencia:any=[this.formIncidencia.value];
    console.log(incidencia);
    
     const resp= await this.indicesServices.addFilaInformeDiario(incidencia);    
     resp.subscribe((res)=>{
       console.log(res);
     })
     this.modalService.dismissAll(AddIncidenciaComponent);
  }

  async editarIncidencia(){
    let incidencia:any=[this.formIncidencia.value];
    console.log(incidencia);

    const resp= await this.indicesServices.updateFilaInformeDiario(incidencia);    
     resp.subscribe((res)=>{
       console.log(res);
    })
    this.modalService.dismissAll(AddIncidenciaComponent);
  }
  onGuardarIncidencia(){
    if(this.incidencia==null){
      this.addIncidencia();
    }else{
      this.editarIncidencia();
    }
  }

}
