import { Component, OnInit } from '@angular/core';
import { Alimentador } from 'src/app/modelos/alimentador.interface';
import { IndicesService } from 'src/app/servicios/indices.service';

@Component({
  selector: 'app-sisdat-modal',
  templateUrl: './sisdat-modal.component.html',
  styleUrls: ['./sisdat-modal.component.css']
})
export class SisdatModalComponent implements OnInit {

  constructor(private indicesService:IndicesService) { }

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
    this.indicesService.listarValoresSISDAT(this.SRAR_CODIGO).subscribe(res=>{
      this.listaValoresSISDAT=res; 
      this.doInforme();
     });
  }

  doInforme(){
    this.listaAlimentadores.forEach(alim => {
      let fila={};
      let encontro=false;
      this.listaValoresSISDAT.forEach(val => {
        if(alim.SALIM_NOMBRE==val['SIND_ALIMENTADOR'] && alim.SALIM_ESTADO=='ACTIVO'){
          fila={
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

    console.log(this.informeSisdat);
  }

  

}
