import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Alimentador } from 'src/app/modelos/alimentador.interface';
import { IndicesService } from 'src/app/servicios/indices.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-cal060-modal',
  templateUrl: './cal060-modal.component.html',
  styleUrls: ['./cal060-modal.component.css']
})
export class Cal060ModalComponent implements OnInit {

  constructor(private indicesService: IndicesService,public ngbActiveModal:NgbActiveModal,private router:Router,private modalService:NgbModal) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  //variables
  @Input() SRAR_CODIGO: any = null;
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
          inc.SALIM_SUBADMS_CAMBIO=alim.SALIM_SUBANTERIOR_CAMBIO;
          inc.SALIM_NOMBREADMS_CAMBIO=alim.SALIM_NOMBREADMS_CAMBIO;
          encontro=true;
        }
      });
    });
  }
  cargarDatos() {
    this.indicesService.listarInformeDiario(this.SRAR_CODIGO).subscribe((res) => {
      this.listaIncidencias = res;
    });
    this.indicesService.listarAlimentadoresActivos().subscribe(res=>{
     this.listaAlimentadores = res;
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
    this.listaIncidencias.forEach(element=>{
      let filaCal060:any=[
        {
          "SCAL_TTIK": element['SIND_TTIK'],
          "SRAR_CODIGO": element['SRAR_CODIGO'],
          "SCAL_INT_HORA_FIN": element['SIND_INT_HORA_FIN'],
          "SCAL_OBSERVACION": "",
          "SCAL_PROTECCION": element['SIND_PROTECCION'],
          "SCAL_CODIGO": null,
          "SCAL_POTENCIAL_NFS": element['SIND_POTENCIAL_NFS'],
          "SCAL_INT_FECHA_INICIO": element['SIND_INT_FECHA_INICIO'],
          "SCAL_TIPO_PROTECCION": element['SIND_TIPO_PROTECCION'],
          "SCAL_ENERGIA_NOSUMINISTRADA": "0",
          "SCAL_CANTON": element['SIND_CANTON'],
          "SCAL_ALIMENTADOR_PRIMARIO": element['SALIM_NOMBREADMS_CAMBIO'],
          "SCAL_SUBESTACION": element['SALIM_SUBADMS_CAMBIO'],
          "SCAL_INTE_ORIGEN": element['SIND_INTE_ORIGEN'],
          "SCAL_INTE_CAUSA": element['SIND_INTE_CAUSA'],
          "SCAL_INT_DURACION_HORAS": element['SIND_INT_DURACION_HORAS'],
          "SCAL_INDICADOR_FM": element['SIND_INDICADOR_FM'],
          "SCAL_NIVEL_TENSION": element['SIND_NIVEL_TENSION'],
          "SCAL_INT_DURACION": element['SIND_INT_DURACION'],
          "SCAL_INT_FECHA_FIN": element['SIND_INT_FECHA_FIN'],
          "SCAL_CODIGO_INTERRUPCION": "",
          "SCAL_PROVINCIA": element['SIND_PROVINCIA'],
          "SCAL_INSTALACION_EF": element['SIND_INSTALACION_EF'],
          "SCAL_INT_HORA_INICIO": element['SIND_INT_HORA_INICIO'],
          "SCAL_PROPIEDAD": element['SIND_PROPIEDAD'],
          "SCAL_CAUSAS": element['SIND_CAUSAS'],
          "SCAL_FMIK": element['SIND_FMIK'],
          "SCAL_POTENCIAL_NI": element['SIND_POTENCIAL_NI'],
          "SCAL_SECTOR": element['SIND_SECTOR'],
          "SCAL_LINEA_SUBT": element['SIND_LINEA_SUBT'],
          "SCAL_ETAPA_FUN": element['SIND_ETAPA_FUN']
        }
      ]
      this.indicesService.addFilaCal060(filaCal060).subscribe((res:any)=>{
        contador++;
        console.log(contador);
        console.log(res);
        console.log(filaCal060);
        if(contador==this.listaIncidencias.length){
          this.modalService.dismissAll(Cal060ModalComponent);
          swal.close();
          this.router.navigate(['/cal060',this.SRAR_CODIGO]);
        }
      })
    })

  }

}
