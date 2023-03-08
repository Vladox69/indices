import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Alimentador } from 'src/app/modelos/alimentador.interface';
import { IndicesService } from 'src/app/servicios/indices.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sisdat-modal',
  templateUrl: './sisdat-modal.component.html',
  styleUrls: ['./sisdat-modal.component.css']
})
export class SisdatModalComponent implements OnInit {

  constructor(private indicesService:IndicesService,private router:Router,private modalService:NgbModal,public ngbActiveModal:NgbActiveModal) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  //variables
  codigoArchivo:any;
  SRAR_CODIGO='1';
  listaAlimentadores:Alimentador[]=[];
  historialPotencia:any[]=[];
  listaValoresSISDAT:any[]=[];
  listaValoresPROGNOPROG:any[]=[];
  informeSisdat:any[]=[];
  listaValoresTransmisor:any[]=[];
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
    'Observaciones'  ];
  term:any;
  p:any=1;

  cargarDatos(){
    this.indicesService.listarAlimentadores().subscribe(res=>{
     this.listaAlimentadores=res; 
    });
    //
    this.indicesService.listarValoresPROGNOPROG(this.SRAR_CODIGO).subscribe(res=>{
     this.listaValoresPROGNOPROG=res; 
    });
    //
    this.indicesService.listarValoresTransmisor(this.SRAR_CODIGO).subscribe(res=>{
      this.listaValoresTransmisor=res; 
      console.log(this.listaValoresTransmisor);
     });
    //
    this.indicesService.listarValoresSISDAT(this.SRAR_CODIGO).subscribe(res=>{
      this.listaValoresSISDAT=res; 
      this.doInforme();
     });

  }

  doInforme(){
    this.informeSisdat=[];
    this.listaAlimentadores.forEach(alim => {
      let fila={};
      let encontro=false;
      this.listaValoresSISDAT.forEach(val => {
        if(alim.SALIM_NOMBRE==val['SIND_ALIMENTADOR'] && alim.SALIM_ESTADO=='ACTIVO'){
          fila={
            'SRAR_CODIGO':this.SRAR_CODIGO,
            'SALIM_NOMBRE':alim.SALIM_NOMBRE,
            'SALIM_SUBESTACION':alim.SALIM_SUBESTACION,
            'SALIM_NOMBREADMS_CAMBIO':alim.SALIM_NOMBREADMS_CAMBIO,
            'SALIM_TIPO':alim.SALIM_TIPO,
            'SALIM_ESTADO':alim.SALIM_ESTADO,
            'SALIM_KVA':alim.SALIM_KVA,
            'SIND_FAL':val['SIND_FAL'],
            'SIND_TAL':val['SIND_TAL'],
            'SIND_FMIK':val['SIND_FMIK'],
            'SIND_TTIK':val['SIND_TTIK'],

            'SIND_FMIK_PROG':val['SIND_FMIK_PROG'],
            'SIND_FAL_PROG':val['SIND_FAL_PROG'],
            'SIND_TTIK_PROG':val['SIND_TTIK_PROG'],
            'SIND_TAL_PROG':val['SIND_TAL_PROG'],

            'SIND_FMIK_NOPROG':val['SIND_FMIK_NOPROG'],
            'SIND_FAL_NOPROG':val['SIND_FAL_NOPROG'],
            'SIND_TTIK_NOPROG':val['SIND_TTIK_NOPROG'],
            'SIND_TAL_NOPROG':val['SIND_TAL_NOPROG'],

            'SIND_FMIK_EXT_TRANS':val['SIND_FMIK_EXT_TRANS'],
            'SIND_FAL_EXT_TRANS':val['SIND_FAL_EXT_TRANS'],
            'SIND_TTIK_EXT_TRANS':val['SIND_TTIK_EXT_TRANS'],
            'SIND_TAL_EXT_TRANS':val['SIND_TAL_EXT_TRANS']
          };
          encontro=true;
          this.informeSisdat.push(fila);
        }
      });
      if(!encontro){
        fila={
          'SRAR_CODIGO':this.SRAR_CODIGO,
          'SALIM_NOMBRE':alim.SALIM_NOMBRE,
          'SALIM_SUBESTACION':alim.SALIM_SUBESTACION,
          'SALIM_NOMBREADMS_CAMBIO':alim.SALIM_NOMBREADMS_CAMBIO,
          'SALIM_TIPO':alim.SALIM_TIPO,
          'SALIM_ESTADO':alim.SALIM_ESTADO,
          'SALIM_KVA':alim.SALIM_KVA,
          'SIND_FAL':null,
          'SIND_TAL':null,
          'SIND_FMIK':null,
          'SIND_TTIK':null,

          'SIND_FMIK_PROG':null,
          'SIND_FAL_PROG':null,
          'SIND_TTIK_PROG':null,
          'SIND_TAL_PROG':null,

          'SIND_FMIK_NOPROG':null,
          'SIND_FAL_NOPROG':null,
          'SIND_TTIK_NOPROG':null,
          'SIND_TAL_NOPROG':null,

          'SIND_FMIK_EXT_TRANS':null,
          'SIND_FAL_EXT_TRANS':null,
          'SIND_TTIK_EXT_TRANS':null,
          'SIND_TAL_EXT_TRANS':null
        };
        this.informeSisdat.push(fila);
      }
    });

    this.informeSisdat.forEach(inf=>{
      let encontro=false;
      let programada=false;
      let noprogramada=false;
      this.listaValoresPROGNOPROG.forEach(val => {
          if(inf['SALIM_NOMBRE']==val['SIND_ALIMENTADOR']){
            if(val['SIND_INTE_ORIGEN']=='INTERNA NO PROGRAMADA'){
              inf.NOPROGRAMADA=val['CANTIDAD'];
              noprogramada=true;
            }else if(val['SIND_INTE_ORIGEN']=='INTERNA PROGRAMADA'){
              inf.PROGRAMADA=val['CANTIDAD'];
              programada=true;
            }else{
              inf.OTRA=val['SIND_INTE_ORIGEN'];
            }
            encontro=true;
            if(!programada){
              inf.PROGRAMADA=0;
            }
            if(!noprogramada){
              inf.NOPROGRAMADA=0;
            }
          }
      });
      if(!encontro){
        inf.NOPROGRAMADA=0;
        inf.PROGRAMADA=0;
      }
    });

    this.informeSisdat.forEach((element,index) => {
      if(element['SALIM_ESTADO']=='INACTIVO'){
        this.informeSisdat.splice(index,1);
      }
    });

    this.informeSisdat.forEach((element,index) => {
      let encontrado=false;
      this.listaValoresTransmisor.forEach(trans => {
        if(element['SALIM_NOMBRE']==trans['SIND_ALIMENTADOR']){
          element.TRANSMISOR=trans['CANTIDAD'];
          encontrado=true;
        }
      });
      if(!encontrado){
        element.TRANSMISOR=null;
      }
    });

    console.log(this.informeSisdat);
  }
  async onGuardarArchivo(){
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: true,
      confirmButtonColor: '#052d6c',
      cancelButtonColor: '#AD1212',
      focusDeny: true,
      focusConfirm: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: '¿Desea Guardar el archivo?',
        text: `(Nota: Si ya existe el informe, se sobreescribiran los datos)`,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Aceptar'
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.guardarInforme();
        }
      });

  }

  guardarInforme(){
    swal.fire({
      title: 'Subiendo ...',
      imageUrl: './././assets/img/loading.gif',
      imageHeight: 300,
      imageAlt: 'A tall image',
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false
    });

    let contador=0;

    this.indicesService.deleteInformeSISDAT(this.SRAR_CODIGO).subscribe(res=>{
     console.log(res); 
    });
    this.informeSisdat.forEach(element => {
      let filaSisdat:any=[
        {
          'SRAR_CODIGO': element['SRAR_CODIGO'],
          'SSIS_SUBESTACION': element['SALIM_SUBESTACION'],
          'SSIS_ALIMENTADOR': element['SALIM_NOMBREADMS_CAMBIO'],
          'SSIS_SECTOR' : element['SALIM_TIPO'],
          'SSIS_POTENCIA': element['SALIM_KVA'],
          'SSIS_FAL' : element['SIND_FAL'],
          'SSIS_TAL': element['SIND_TAL'],
          'SSIS_FMIK' : element['SIND_FMIK'],
          'SSIS_TTIK': element['SIND_TTIK'],
          'SSIS_PROGRAMADAS' : element['PROGRAMADA'],
          'SSIS_NOPROGRAMADAS': element['NOPROGRAMADA'],
          'SSIS_TRANSMISOR' : element['TRANSMISOR'],
          'SSIS_FMIK_PROG': element['SIND_FMIK_PROG'],
          'SSIS_FAL_PROG' : element['SIND_FAL_PROG'],
          'SSIS_TTIK_PROG': element['SIND_TTIK_PROG'],
          'SSIS_TAL_PROG' : element['SIND_TAL_PROG'],
          'SSIS_FMIK_NOPROG': element['SIND_FMIK_NOPROG'],
          'SSIS_FAL_NOPROG': element['SIND_FAL_NOPROG'],
          'SSIS_TTIK_NOPROG' : element['SIND_TTIK_NOPROG'],
          'SSIS_TAL_NOPROG': element['SIND_TAL_NOPROG'],
          'SSIS_FMIK_EXT_TRANS': element['SIND_FMIK_EXT_TRANS'],
          'SSIS_FAL_EXT_TRANS' : element['SIND_FAL_EXT_TRANS'],
          'SSIS_TTIK_EXT_TRANS':element['SIND_TTIK_EXT_TRANS'],
          'SSIS_TAL_EXT_TRANS' : element['SIND_TAL_EXT_TRANS'],
          'SSIS_OBSERVACION' : ''
        }];
      this.indicesService.addFilaSISDAT(filaSisdat).subscribe(res=>{
        console.log(res);
        contador++;
        if(contador==this.informeSisdat.length){
          console.log('archivo guardado');
          this.router.navigate(['/subir-archivos']);
          swal.close();
        }
      });
    });
  }

  onClose(){
    this.modalService.dismissAll(SisdatModalComponent);
  }
}
