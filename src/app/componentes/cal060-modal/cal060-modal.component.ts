import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Alimentador } from 'src/app/modelos/alimentador.interface';
import { IndicesService } from 'src/app/servicios/indices.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-cal060-modal',
  templateUrl: './cal060-modal.component.html',
  styleUrls: ['./cal060-modal.component.css']
})
export class Cal060ModalComponent implements OnInit {

  constructor(private indicesService: IndicesService,public ngbActiveModal:NgbActiveModal,private router:Router) {}

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
    this.listaIncidencias.forEach(inc => {
      let encontro=false;
      this.listaAlimentadores.forEach(alim => {
        if(inc['SIND_ALIMENTADOR']==alim.SALIM_NOMBRE){
          inc.SALIM_SUBADMS_CAMBIO=alim.SALIM_SUBADMS_CAMBIO;
          inc.SALIM_NOMBREADMS_CAMBIO=alim.SALIM_NOMBREADMS_CAMBIO;
          encontro=true;
        }
      });
    });
  }
  cargarDatos() {
    this.indicesService.listarInformeDiario('1').subscribe((res) => {
      this.listaIncidencias = res;
    });
    this.indicesService.listarAlimentadoresActivos().subscribe(res=>{
     this.listaAlimentadores = res;
     this.doInforme();
    });
  }

  async onGuardar(){
    this.informeCal=[];

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
    for (let i = 0; i < this.listaIncidencias.length; i++) {
      let filaInformeDiario:any=[
        {
          "SCAL_TTIK": this.listaIncidencias[i]['SIND_TTIK'],
          "SRAR_CODIGO": this.listaIncidencias[i]['SRAR_CODIGO'],
          "SCAL_INT_HORA_FIN": this.listaIncidencias[i]['SIND_INT_HORA_FIN'],
          "SCAL_OBSERVACION": "",
          "SCAL_PROTECCION": this.listaIncidencias[i]['SIND_PROTECCION'],
          "SCAL_CODIGO": null,
          "SCAL_POTENCIAL_NFS": this.listaIncidencias[i]['SIND_POTENCIAL_NFS'],
          "SCAL_INT_FECHA_INICIO": this.listaIncidencias[i]['SIND_INT_FECHA_INICIO'],
          "SCAL_TIPO_PROTECCION": this.listaIncidencias[i]['SIND_TIPO_PROTECCION'],
          "SCAL_ENERGIA_NOSUMINISTRADA": "0",
          "SCAL_CANTON": this.listaIncidencias[i]['SIND_CANTON'],
          "SCAL_ALIMENTADOR_PRIMARIO": this.listaIncidencias[i]['SALIM_NOMBREADMS_CAMBIO'],
          "SCAL_SUBESTACION": this.listaIncidencias[i]['SALIM_SUBADMS_CAMBIO'],
          "SCAL_INTE_ORIGEN": this.listaIncidencias[i]['SIND_INTE_ORIGEN'],
          "SCAL_INTE_CAUSA": this.listaIncidencias[i]['SIND_INTE_CAUSA'],
          "SCAL_INT_DURACION_HORAS": this.listaIncidencias[i]['SIND_INT_DURACION_HORAS'],
          "SCAL_INDICADOR_FM": this.listaIncidencias[i]['SIND_INDICADOR_FM'],
          "SCAL_NIVEL_TENSION": this.listaIncidencias[i]['SIND_NIVEL_TENSION'],
          "SCAL_INT_DURACION": this.listaIncidencias[i]['SIND_INT_DURACION'],
          "SCAL_INT_FECHA_FIN": this.listaIncidencias[i]['SIND_INT_FECHA_FIN'],
          "SCAL_CODIGO_INTERRUPCION": "",
          "SCAL_PROVINCIA": this.listaIncidencias[i]['SIND_PROVINCIA'],
          "SCAL_INSTALACION_EF": this.listaIncidencias[i]['SIND_INSTALACION_EF'],
          "SCAL_INT_HORA_INICIO": this.listaIncidencias[i]['SIND_INT_HORA_INICIO'],
          "SCAL_PROPIEDAD": this.listaIncidencias[i]['SIND_PROPIEDAD'],
          "SCAL_CAUSAS": this.listaIncidencias[i]['SIND_CAUSAS'],
          "SCAL_FMIK": this.listaIncidencias[i]['SIND_FMIK'],
          "SCAL_POTENCIAL_NI": this.listaIncidencias[i]['SIND_POTENCIAL_NI'],
          "SCAL_SECTOR": this.listaIncidencias[i]['SIND_SECTOR'],
          "SCAL_LINEA_SUBT": this.listaIncidencias[i]['SIND_LINEA_SUBT'],
          "SCAL_ETAPA_FUN": this.listaIncidencias[i]['SIND_ETAPA_FUN']
        }
      ]
      const resp=this.indicesService.addFilaCal060(filaInformeDiario);
      resp.subscribe((data:any)=>{
        contador++;
        if(data['MENSAJE']){
          console.log('los trues');
          console.log(filaInformeDiario);
        }else{
          console.log('Los falses');
          console.log(filaInformeDiario);
        }

        if(contador==this.listaIncidencias.length){
          this.router.navigate(['/cal060','1']);
          swal.close();
        }
        
        
      })
    }

  }

}
