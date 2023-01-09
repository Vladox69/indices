import { Component, OnInit } from '@angular/core';
import { IndicesService } from 'src/app/servicios/indices.service';
import * as XLSX from 'xlsx';
import { Alimentador } from 'src/app/modelos/alimentador.interface';
import { CausaCambio } from 'src/app/modelos/causacambio.interface';
import { catInterrupciones } from 'src/app/modelos/catinterrupciones.interface';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/servicios/excel.service';
import swal from 'sweetalert2';
type AOA = any[][];


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private iService:IndicesService,private router:Router,private excelService:ExcelService) { }
  term:any;
  resultados:any;
  incidencias:any=[];
  informeIncidencias:any=[]
  informeTotalIncidencias:any=[];
  filtroMayor:any=[];
  archivo:any;
  mayorA:any;

  ngOnInit(): void {

    var date_1 = new Date('01/07/2021 11:40:00').getTime();
    var date_2 = new Date('01/07/2021 13:00:00').getTime();
    //var date_2 = new Date('07/01/2021 16:10:51').getTime();
    
    var diff_in_millisenconds = date_2 - date_1;
    var reshoras = (diff_in_millisenconds) /(1000*60*60) ;
    var totalminutos = (diff_in_millisenconds) /(1000*60) ;
    var horas = reshoras.toString().split('.');
    if(horas[1]==undefined){
      horas.push('00');
    }
    var resminutos = Number('0.'+horas[1])*60;
    //console.log(totalminutos,'resmin');
    var minutos = resminutos.toString().split('.');
    if(minutos[1]==undefined){
      minutos.push('00');
    }
    var ressegundos = Number('0.'+minutos[1])*60;
    var segundos = Math.round(ressegundos);
    let tiempo = horas[0]+':'+minutos[0]+':'+segundos;
    //console.log(tiempo);


    this.iService.listarCausasCambio().subscribe(res=>{
      this.listaCausaCambio = res;
    });
    this.iService.listarCatInterrupciones().subscribe(res=>{
      this.listaCatInterrupciones = res;
      //console.log(this.listaCatInterrupciones);
    });
    this.obtenerAlimentadores();

  }
  //variables
  data: AOA = [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  copiaenMasa: AOA = [[1, 2], [3, 4]];
  calculosAutomaticos: AOA = [[1, 2], [3, 4]];
  resultado: AOA = [];
  tabla: AOA = [];
  informe: AOA = [];
  titulos:any=[];
  p:any=1;

  listaAlimentadores:Alimentador[]=[];
  listaCausaCambio:CausaCambio[]=[];
  listaCatInterrupciones: catInterrupciones[]=[];
  
  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    this.archivo=evt.target.files[0];
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      ///Elimino lo anterior a los titulos de las columnas
      this.data.splice(0,8);
      //lleno los espacios en blanco de region [0],subregion[2],subestacion[5] y Alimentador[7]
      let region:any;
      let subregion:any;
      let subestacion:any;
      let alimentador :any;
      let idIncidente :any;
      //Elimino los totales
      this.data.forEach((element,index) => {
        if(element[10]=='Total Alimentador'){
          this.data.splice(index,1);
        }
      });
      //console.log('datosprimeros',this.data);


      ///
      this.data.forEach((element,index) => {
        if(index!=0){
          //region
          if(element[0]==undefined){
            element[0]=region;
          }else{
            region=element[0];
          }
          //subregion
          if(element[2]==undefined){
            element[2]=subregion;
          }else{
            subregion=element[2];
          }
          //subestacion
          if(element[5]==undefined){
            element[5]=subestacion;
          }else{
            subestacion=element[5];
          }
          //alimentador
          if(element[7]==undefined){
            element[7]=alimentador;
          }else{
            alimentador=element[7];
          }
          //idIncidente
          if(element[10]==undefined){
            element[10]=idIncidente;
          }else{
            idIncidente=element[10];
          }

        }

      });      
      // elimino los espacios en blanco
       this.data.forEach((element,index) => {
         if(element[12]==undefined){
           this.data.splice(index,1);
         }
       });
      
      //elimino los totales de subregion
      this.data.forEach((element,index) => {
        if(element[5].toString()=='Total Subregión '){
          this.data.splice(index,1);
        }
      });
      this.data.forEach((element,index) => {
        if(element[5].toString()=='Total Subregión '){
          this.data.splice(index,1);
        }
      });

      ///elimino las columnas vacias
      this.copiaenMasa=[];
      this.data.forEach((element,index) => {
        let fila:any=[];
        element.forEach(celda => {
          fila.push(celda);
        });
        this.copiaenMasa.push(fila);
      });

      //console.log(this.copiaenMasa);

    };
    reader.readAsBinaryString(target.files[0]);

    ///creao el nuevo json para los calculosAutomatico

  }

  exportEnMasa(): void {
    /* generate worksheet */
    let data = this.copiaenMasa;
    data.forEach((element,index) => {
      if(index!=0){
        element.length = element.length - 9;
      }else{
        element.length = element.length - 8;
      }
    });

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  doCalculosAuto(){
    this.calculosAutomaticos=this.copiaenMasa;
    //remplazo el id de incidente por 0 para los q tienen interrupcion 2
    this.calculosAutomaticos.forEach(element => {
      if(element[5] >1){
        element[4]=0;
      }
      
    });
    ///elimino region , subregion, subestacion , interrupcion
    this.calculosAutomaticos.forEach(element => {
      element.splice(0,3);
      element.length = element.length-9;
      element.splice(2,1);
      element.splice(4,1);
    });
    //busco ycambio el nombre del alimentador
    this.calculosAutomaticos.forEach((celda,index) => {
      if(index!=0){
        this.listaAlimentadores.forEach(alimentador => {
          if(celda[0]==alimentador.SALIM_REFERENCIA){
            celda[0]=alimentador.SALIM_NOMBRE;
          }
        });
      }
    });
    //separo las fechas y horas de desconeccion y conecxion
    this.calculosAutomaticos.forEach((fila,index) => {
      if(index!=0){
          //desconexion
          if(fila[2]){
            let desco;
            desco= fila[2].toString().split(' ');
            fila[2]=desco[0];
            fila.splice(3,0,desco[1]);
          }
          //conexion
          if(fila[4]){
            let cone;
            cone= fila[4].toString().split(' ');
            fila[4]=cone[0];
            fila.splice(5,0,cone[1]);
          }

      }else{
        fila[2]='FECHA INICIO INTERRUPCIÓN';
        fila.splice(3,0,'HORA INICIO INTERRUPCIÓN');
        fila[4]='FECHA FIN INTERRUPCIÓN';
        fila.splice(5,0,'HORA FIN DE INTERRUPCIÓN');
      }

    });
    //elimino la columna que se recorrio
    this.calculosAutomaticos.forEach((fila,index) => {
      if(index!=0){
        fila.length=fila.length-1;
      }else{
        fila.splice(8,0,'TRANSMISOR');
      }
    });
    //verifico si en la causa hay transmisor


    this.calculosAutomaticos.forEach((fila,index) => {
      if(index!=0){
        if(fila[8]=='Transmisor'){
        fila.splice(8,0,'Transmisor');
        }else{
          fila.splice(8,0,'');
        }
      }
    });

    //calculo el iP
    this.calculosAutomaticos.forEach((fila,index) => {
      if(index!=0){
        if(fila[19]>0){
          fila.splice(11,0,'Mantenimiento');
        }else{
          fila.splice(11,0,'');
        }
      }else{
        //agrego las cabeceras IP INP EXP EXNP CONCATENA
        fila.splice(11,0,'IP');
        fila.splice(12,0,'INP');
        fila.splice(13,0,'EXP');
        fila.splice(14,0,'EXNP');
        fila.splice(15,0,'CONCATENA');
      }
    });
    ///calculo del inp
    this.calculosAutomaticos.forEach((fila,index) => {
      if(index!=0){
        if(fila[16]>0 || fila[9]=='Choques de vehiculos' || (fila[9]=="Otros"&&fila[11]!="Mantenimiento")){
            fila.splice(12,0,'Falla');
        }else{
          fila.splice(12,0,'');
        }
      }
    });
    ///calculo del EXPN
    this.calculosAutomaticos.forEach((fila,index) => {
      if(index!=0){
        if(fila[25]>0 && fila[9]!='Programadas para mantenimiento Preventivo / Predictivo' && 
        fila[9]!='Programadas por ampliaciones o mejoras en las redes'&& 
        fila[9]!='Programadas para transferencias de carga' && 
        fila[9]!='Operaciones sin tension por seguridad caracteristica restrictiva del equipamiento.'){
            fila.splice(13,0,'Transmisor');
        }else{
          fila.splice(13,0,'');
        }
      }
    });
        ///calculo del CONCATENA
        this.calculosAutomaticos.forEach((fila,index) => {
          if(index!=0){
            if(fila[11]=='Mantenimiento'||fila[12]=='Falla'){
                fila.splice(14,0,(fila[11]+fila[12]));
            }else{
              if(fila[13]=='Transmisor' && fila[9]!='Programadas para mantenimiento Preventivo / Predictivo' && 
              fila[9]!='Programadas por ampliaciones o mejoras en las redes'&& 
              fila[9]!='Programadas para transferencias de carga' && 
              fila[9]!='Operaciones sin tension por seguridad caracteristica restrictiva del equipamiento.'){
                fila.splice(14,0,'Falla');
              }else{
                fila.splice(14,0,'00');
              }
            }
          }
        });
    //console.log('aqui',this.calculosAutomaticos);
    //elimino las ultimas columnas
    this.calculosAutomaticos.forEach((fila,index) => {
      fila.length = fila.length - 17;
      if(index!=0){
        fila.splice(13,0,'');
      }
    });
    this.resultado = this.calculosAutomaticos;
    //this.exportCalculos();
  }

  exportCalculos(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.calculosAutomaticos);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'calculosAuto');

    /* save to file */
    XLSX.writeFile(wb, 'resultadoFinal.xlsx');
  }

  doResultados(){
    this.doCalculosAuto();
    //console.log(this.resultado);
    this.resultado.forEach((fila,index) => {
      if(index!=0){
      }else{
       fila.splice(1,0,'Nivel de afectacion');
       fila.splice(2,0,'Instalación / Equipo que se desconectó a la falla');
       fila.splice(3,0,'Provincia');
       fila.splice(4,0,'Cantón');
       fila.splice(5,0,'Instalación / Equipo que se desconectó a la falla');
       fila.splice(6,0,'Tipo de protección');
      }
      });
      ///metodo para el nivel de afectacion
      this.resultado.forEach((fila,index) => {
        if(index!=0){
          if(fila[7]==fila[6]&&fila[6]!=0){
            fila.splice(1,0,'Cabecera');
          }else{
            if(fila[6]==0&&fila[9]=='Alteraciones técnicas en voltaje, corriente o frecuencia (sobrecarga,  oscilacion de potencia y variaciones de voltaje)'){
              fila.splice(1,0,'Cabecera');
            }else{
              if(fila[7]<fila[6] && fila[8]!='Transmisor'){
                fila.splice(1,0,'Ramal trifásico');
              }else{
                fila.splice(1,0,'REVISAR TRANSMISOR');
              }
            }
          }
        }
        });
      ///metodo para el equipo que se desconecto
      this.resultado.forEach((fila,index) => {
        if(index!=0){
          if(fila[1]=='Cabecera'&&fila[1]!='Ramal trifásico'&&fila[14]=='Transmisor'){
            fila.splice(2,0,'Línea de Transmisión');
          }else{
            if(fila[1]=='Cabecera'||fila[1]=='Ramal trifásico'){
              fila.splice(2,0,'Red de Media Tensión');
            }else{
              if(fila[1]==0){
                fila.splice(2,0,'0');
              }else{
                fila.splice(2,0,'REVISAR TRANSMISOR');
              }
            }
          }
        }
        });
        ///aumento la provincia y el canton
        this.resultado.forEach((fila,index) => {
          if(index!=0){
            fila.splice(3,0,'');
            fila.splice(4,0,'');
          }
          });
        //calculo para proteccion que opero
        this.resultado.forEach((fila,index) => {
          if(index!=0){
            if(fila[1]=='Cabecera'){
              fila.splice(5,0,'Relé de subestación');
            }else{
              if(fila[1]=='Ramal trifásico'){
                fila.splice(5,0,'Principal');
              }else{
                fila.splice(5,0,'');
              }
            }
          }
          });
        //calculo para el tipo de proteccion
        this.resultado.forEach((fila,index) => {
          if(index!=0){
            if(fila[1]=='Cabecera'){
              fila.splice(6,0,'Disyuntor');
            }else{
              if(fila[1]=='Ramal trifásico'){
                fila.splice(6,0,'Fusible');
              }else{
                fila.splice(6,0,'');
              }
            }
          }
          });
          //intercambio las causas
          this.resultado.forEach((element,index) => {
            if(index!=0){
              this.listaCausaCambio.forEach(causa => {
                if(element[16].includes(causa.SCAU_REFERENCIA)){
                  element[16]=causa.SCAU_NOMBRE;
                }
              });
              element.splice(15,1);
            }else{
              element.splice(16,1);
            }
          });
      
        this.exportResultados();
  }
  exportResultados(): void {
    /* generate worksheet */
    this.resultado.sort(function(a:any, b:any) {
      let fecha1 = a[8].split('/');
      let fechaOrdenada= fecha1[1]+'-'+fecha1[0]+'-'+fecha1[2];
      let dia1=new Date(fechaOrdenada).getDate();
      let fecha2 = b[8].split('/');
      let fechaOrdenada2= fecha2[1]+'-'+fecha2[0]+'-'+fecha2[2];
      let dia2 = new Date(fechaOrdenada2).getDate();
      return  dia1 - dia2;
    });

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.resultado);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Resultados');

    /* save to file */
    //XLSX.writeFile(wb, 'resultadoFinal.xlsx');
  }

  doInforme(){
    this.doResultados();
    //creo las cabeceras para el informe diario 
    //desde incidente N°
    this.informe = this.resultado;
    //this.informe.splice(0,0,this.informe[0]);
    this.informe.forEach((fila,index) => {
      if(index<1){
        fila[0]='Incidente No';
        fila[1]='Indicador de Mantenimiento  o falla';
        fila[2]='Nivel de afectación de la interrupción a la Red';
        fila[3]='ALIMENTADOR ASOCIADO A LA FALLA O SUSPENSIÓN';
        fila[4]='Etapa funcional en la que se presentó la falla';
        fila[5]='Instalación / Equipo que se desconectó a la falla';
        fila[6]='Provincia';
        fila[7]='Cantón';
        fila[8]='Sector';
        fila[9]='Número de Trafo';
        fila[10]='Número de Seccionador';
        fila[11]='Propiedad';
        fila[12]='Protección que Operó';
        fila[13]='Tipo de Protección que actuo';
        fila[14]='Etapa funcional';
        fila[15]='Instalación / Equipo';
        fila[16]='Provincia';
        fila[17]='Cantón';
        fila[18]='Sector';
        fila[19]='Línea de Subtransmisión';
        fila[20]='Subestación';
        fila[21]='Falla en Transmisor';
        fila[22]='Tipo de Alimentador Primario';
        fila[23]='Nivel de Tensión KV';
        fila[24]='Nivel de Afectasión';
        fila[25]='Origen de Interrupción';
        fila[26]='Causa de Interrupción';
        fila[27]='Transmisor';
        fila[28]='Causas';
        fila[29]='Potencial Nominal Instalado';
        fila[30]='Potencial Nominal Fuera de Servicio';
        fila[31]='Carga Instalada Fuera de Servicio';
        fila[32]='Fecha Inicio Interrupcion';
        fila[33]='Hora Inicio Interrupcion';
        fila[34]='Fecha Fin Interrupcion';
        fila[35]='Hora Fin Interrupcion';
        fila[36]='Duración de Interrupción Horas/min/seg';
        fila[37]='Duración de Interrupción Horas';
        fila[38]='FMIK';
        fila[39]='TTIK';
      }
    });
    let informeAux=this.informe;
     console.log(this.informe);
    this.informe.forEach((fila,index1) => {
      if(index1>0){
        fila.splice(0,0,fila[7]);
        fila.splice(1,0,fila[21]);
        fila.splice(2,0,fila[3]);
        fila.splice(4,0,'Espacio Distribución');
        fila.splice(5,0,fila[6]);
        this.listaAlimentadores.forEach(element => {
          if(fila[3]==element.SALIM_NOMBRE){
            //provincia,canton,sector
            fila.splice(6,0,element.SALIM_PROVINCIA);
            fila.splice(7,0,element.SALIM_CANTON);
            fila.splice(8,0,element.SALIM_TIPO);
          }
        });
        //los vacios de trafo y Seccionador
        fila.splice(9,0,'');
        fila.splice(10,0,'');
        fila.splice(11,0,'Público');
        fila.splice(12,0,fila[16]);
        fila.splice(13,0,fila[18]);
        fila.splice(14,0,'Espacio Distribución');
        fila.splice(15,0,fila[5]);
        fila.splice(16,0,fila[6]);
        fila.splice(17,0,fila[7]);
        fila.splice(18,0,fila[8]);
        this.listaAlimentadores.forEach(element => {
          if(fila[3]==element.SALIM_NOMBRE){
            //linea,subestacion
            fila.splice(19,0,element.SALIM_LINEA);
            fila.splice(20,0,element.SALIM_SUBESTACION);
          }
        });
        //columna AJ falla en transmisor
        fila.splice(21,0,fila[34]);
        fila.splice(22,0,fila[8]);
        fila.splice(23,0,'13.8');
        fila.splice(24,0,fila[2]);

        //CAUSAS Y ORIGEN DE INTERRUPCIONES
        this.listaCatInterrupciones.forEach(element => {
          if(fila[39]==element.SCAT_NOMBRE){
            fila.splice(25,0,element.SCAT_ORIGEN);
            fila.splice(26,0,element.SCAT_CAUSA);
          }
        });

        //agrego la vacia de la AR
        fila.splice(27,0,'');
        fila.splice(28,0,fila[42]);
        fila.splice(29,0,fila[40]);
        fila.splice(30,0,fila[42]);
        fila.splice(31,0,'');
        ///fechas de interrupcion
        fila.splice(32,0,fila[39]);
        fila.splice(33,0,fila[41]);
        fila.splice(34,0,fila[43]);
        fila.splice(35,0,fila[45]);

        ///para el calculo del tiempo de desconexion
        let fechaInicio = fila[32].toString().split('/');
        let fechaFin = fila[34].toString().split('/');
        var date_1 = new Date(fechaInicio[1]+'/'+fechaInicio[0]+'/'+fechaInicio[2]+' '+fila[33]).getTime();
        var date_2 = new Date(fechaFin[1]+'/'+fechaFin[0]+'/'+fechaFin[2]+' '+fila[35]).getTime();
        //var date_2 = new Date('07/01/2021 16:10:51').getTime();
        
        var diff_in_millisenconds = date_2 - date_1;
        var reshoras = (diff_in_millisenconds) /(1000*60*60) ;
        var totalminutos = (diff_in_millisenconds) /(1000*60) ;
        var horas = reshoras.toString().split('.');
        if(horas[1]==undefined){
          horas.push('00');
        }
        var resminutos = Number('0.'+horas[1])*60;
        var minutos = resminutos.toString().split('.');
        if(minutos[1]==undefined){
          minutos.push('00');
        }
        var ressegundos = Number('0.'+minutos[1])*60;
        var segundos = Math.round(ressegundos);
        if(segundos==60){
          minutos[0]=(Number(minutos[0])+1).toString();
          segundos=0;
        }
        if(Number(minutos[0])<10){
          minutos[0]=0+minutos[0];
        }
        let tiempo;
        if(segundos<10){
           tiempo = horas[0]+':'+minutos[0]+':0'+segundos;
        }else{
           tiempo = horas[0]+':'+minutos[0]+':'+segundos;
        }
        fila.splice(36,0,tiempo);
        ///si los minutos son menor a 3 se ponecero
        if(totalminutos<3){
          fila.splice(37,0,'0');
        }else{
          fila.splice(37,0,reshoras);
        }

        if(fila[37]>0){
          fila.splice(38,0,(fila[30]/fila[29]));
        }else{
          fila.splice(38,0,'');
        }
        if(fila[37]>0){
          fila.splice(39,0,(fila[30]*fila[37]/fila[29]));
        }else{
          fila.splice(39,0,'');
        }
      }

    });
    this.informe.forEach((element,index) => {
      if(index!=0){
        element.length=element.length-20;
        if(element[21].length>1){
          element[4] = 'Transmisión';
          element[14] = 'Transmisión';
        }else{
          element[4] = "Distribución";
          element[14] = "Distribución";
        }
      }
    });
    
    this.exportInforme();
  }
  
  exportInforme(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.informe);
    this.tabla=[...this.informe];
    this.titulos=this.tabla[0];
    this.titulos=['Quitar',...this.titulos];
    this.tabla.forEach((element,index) => {
      if(index!=0){
        element.splice(0,0,index);
      }
    });

    this.tabla.forEach((element,index) => {
      if(index!=0){
        element.splice(1,0,'false');
      }
    });
    this.tabla.shift();

    this.tabla.forEach((row:any) => {
      let aux=[...row];
      this.filtroMayor=[...this.filtroMayor,aux];
    });

    /* generate worksheet */

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Resultados');
    // console.log(this.tabla);
    /* save to file */
    //XLSX.writeFile(wb, 'informe.xlsx');
  }

  onChangeCheckbox(indice:any){

    if(this.filtroMayor[indice-1][1]=='false'){
      this.filtroMayor[indice-1][1]='true'  
    }else{
      this.filtroMayor[indice-1][1]='false'
    }
    
    
    let buscar=true;
    if(this.incidencias.length<1){
      this.incidencias=[...this.incidencias,this.filtroMayor[indice-1]]
    }else{
      this.incidencias.forEach((row:any,i:any) => {
        if(row[0]==indice){
          this.incidencias.splice(i,1);
          buscar=false;
        }
      });
      if(buscar){
        this.incidencias=[...this.incidencias,this.filtroMayor[indice-1]]
      }
    }
  }

  onIncidencias(){
    this.incidencias.forEach((row:any) => {
      let aux=[...row];
      this.informeIncidencias=[...this.informeIncidencias,aux];
    });
    this.informeIncidencias.forEach( (row:any) =>{
      row.splice(0,2);
    })
    let titulosExcel=[...this.titulos];
    titulosExcel.splice(0,1);

    this.excelService.downloadExcel(titulosExcel,this.informeIncidencias,'IncidenciasDescartadas.xlsx','Incidencias');
    this.informeIncidencias=[];
  }

  onReporteTotal(){
    this.informeTotalIncidencias=[];
    this.tabla.forEach((row:any) => {
      let aux;
      if(row[1]==='true'){
        aux=[row[0],row[1],row[2]];
        console.log(aux);
        
      }else{
        aux=[...row]
      }
     this.informeTotalIncidencias=[...this.informeTotalIncidencias,aux];
      
    });

    this.informeTotalIncidencias.forEach( (row:any) =>{
      row.splice(0,2);
    });

    let titulosExcel=[...this.titulos];
    titulosExcel.splice(0,1);
    this.excelService.downloadExcel(titulosExcel,this.informeTotalIncidencias,'IncidenciasTotales.xlsx','Incidencias');
    this.informeTotalIncidencias=[];

  }

  onChageInputMayor(){
    this.tabla=this.filtroMayor.filter((row:any)=>{
      return row[39]>=this.mayorA;
    });
  }

  onRefrescar(){
    this.tabla=[];
    this.filtroMayor.forEach((row:any) => {
      let aux=[...row];
      this.tabla=[...this.tabla,aux];
    });
  }

  onCabecera(){
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([]);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Incidencias');
    
    XLSX.writeFile(wb, 'incidencias.xlsx');
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
        title: '¿Está seguro?',
        text: `Desea Guardar el archivo?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.guardar();
        }
      });

  }
  async guardar(){

    let tipo=this.archivo['type'];
    let nombre=this.archivo['name'];
    let date= new Date();
    let fecha=+date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    let archivoBase64:any= await this.blobToBase64(this.archivo);
    archivoBase64=archivoBase64.split(",")[1];
    let registroArch:any=[
      {
      "SRAR_ARCHIVO": archivoBase64,
      "SRAR_TIPO_ARCHIVO": tipo,
      "SRAR_FECHA": fecha,
      "SRAR_USUARIO": "slopez",
      //"SRAR_USUARIO": "vladimir-test-subida",
      "SRAR_ESTADO": "Proceso",
      "SRAR_NOMBRE_ARCHIVO": nombre}
    ];
    
    const resp= await this.iService.addArchivo(registroArch);    
    resp.subscribe((res)=>{
      let codigoArchivo=res['MENSAJE'].split(";")[1];
      this.subirFilasInformeDiario(codigoArchivo);
    })
  }
  blobToBase64=(blob:any)=>{
    return new Promise((resolve,reject)=>{
      const reader=new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend=()=>{
        resolve(reader.result);
      }
    })
  }

  async subirFilasInformeDiario(codigoArchivo:any){
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
    for (let i = 0; i < this.filtroMayor.length; i++) {
      let filaInformeDiario:any=[
        {
      "SRAR_CODIGO": codigoArchivo,
      "SIND_INCIDENCIA_ESTADO": this.filtroMayor[i][1],
      "SIND_NINCIDENTE":this.filtroMayor[i][2],
      "SIND_INDICADOR_FM":this.filtroMayor[i][3],
      "SIND_NIVEL_AFECT":this.filtroMayor[i][4],
      "SIND_ALIMENTADOR":this.filtroMayor[i][5],
      "SIND_ETAPA_FUN":this.filtroMayor[i][6],
      "SIND_INSTALACION_EF":this.filtroMayor[i][7],
      "SIND_PROVINCIA":this.filtroMayor[i][8],
      "SIND_CANTON":this.filtroMayor[i][9],
      "SIND_SECTOR":this.filtroMayor[i][10],
      "SIND_PROPIEDAD":this.filtroMayor[i][13],
      "SIND_PROTECCION":this.filtroMayor[i][14],
      "SIND_TIPO_PROTECCION":this.filtroMayor[i][15],
      "SIND_LINEA_SUBT":this.filtroMayor[i][21],
      "SIND_SUBESTACION":this.filtroMayor[i][22],
      "SIND_NIVEL_TENSION":this.filtroMayor[i][25],
      "SIND_INTE_ORIGEN":this.filtroMayor[i][27],
      "SIND_INTE_CAUSA":this.filtroMayor[i][28],
      "SIND_TRANSMISOR":this.filtroMayor[i][29],
      "SIND_CAUSAS":this.filtroMayor[i][30],
      "SIND_POTENCIAL_NI":this.filtroMayor[i][31],
      "SIND_POTENCIAL_NFS":this.filtroMayor[i][32],
      "SIND_INT_FECHA_INICIO":this.filtroMayor[i][34],
      "SIND_INT_HORA_INICIO":this.filtroMayor[i][35],
      "SIND_INT_FECHA_FIN":this.filtroMayor[i][36],
      "SIND_INT_HORA_FIN":this.filtroMayor[i][37],
      "SIND_INT_DURACION_HORAS":this.filtroMayor[i][38],
      "SIND_INT_DURACION":this.filtroMayor[i][39],
      "SIND_FMIK":this.filtroMayor[i][40],
      "SIND_TTIK":this.filtroMayor[i][41],
      "SIND_INCIDENCIA_DES_RAZON":""
        }
      ]
      const resp=await this.iService.addFilaInformeDiario(filaInformeDiario);
      resp.subscribe((data)=>{
        contador++;
        if(contador==this.filtroMayor.length){
          console.log('archivo guardado');
          this.router.navigate(['/subir-archivos']);
          swal.close();
        }
      })
    }

  }

  obtenerAlimentadores(){
    this.iService.listarAlimentadoresActivos().subscribe(res=>{
     this.listaAlimentadores=res;
     console.log('este es lanueva',res);
    });
  }
  boton(){
    swal.fire({
      title: 'Subiendo ...',
      imageUrl: './././assets/img/loading.gif',
      imageHeight: 300,
      imageAlt: 'A tall image',
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false
    });
    setTimeout(() => {
      swal.close();
  }, 3000);
  }
  irAAlimentadores(){
    this.router.navigate(['/alimentador']);
  }
  irACausas(){
    this.router.navigate(['/causas']);
  }
  irACatalogo(){
    this.router.navigate(['/catalogo']);
  }
}
