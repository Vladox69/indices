import { Component, OnInit } from '@angular/core';
import { Alimentador } from 'src/app/modelos/alimentador.interface';
import { IndicesService } from 'src/app/servicios/indices.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddAlimentadorComponent } from '../add-alimentador/add-alimentador.component';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-alimentador',
  templateUrl: './alimentador.component.html',
  styleUrls: ['./alimentador.component.css'],
})
export class AlimentadorComponent implements OnInit {
  constructor(
    private iService: IndicesService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.obtenerAlimentadores();
  }
  //variables
  listaAlimentadores: Alimentador[] = [];
  potenAlimentadores: any[] = [];
  historialPotencia: Alimentador[] = [];
  p: any = 1;
  term: any;
  datePipe = new DatePipe('es');

  obtenerAlimentadores() {
    this.iService.listarAlimentadores().subscribe((res) => {
      this.listaAlimentadores = res;
    });
  }

  openModalFormProceso() {
    this.modalService.open(AddAlimentadorComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
  }

  onDeleteAlimentador(ali: any) {
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
        text: `Eliminar el registro`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const resp = this.iService.deleteAlimentador(ali['SALIM_CODIGO']);
          resp.subscribe((res) => {
            window.location.reload();
          });
        }
      });
  }

  onEditAlimentador(alimentador: any) {
    const activeModal = this.modalService.open(AddAlimentadorComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
    activeModal.componentInstance.alimentador = alimentador;

  }

  potenciaAlimentadores() {
    const resp = this.iService.listarPotenciaAlimentadores();
    this.historialPotencia = [];
    resp.subscribe((res) => {
      this.potenAlimentadores = res;
      this.listaAlimentadores.forEach(alim => {
        let encontro = false;
        this.potenAlimentadores.forEach(hist => {
          if (alim.SALIM_NOMBRE == hist['SIND_ALIMENTADOR'] && alim.SALIM_ESTADO == 'ACTIVO') {
            let fecha=hist['FECHA'].split('-');
            let fec_ali=fecha[2]+"/"+fecha[1]+"/"+fecha[0];
            console.log(fec_ali);
            let ali = {
              'SALIM_CODIGO': alim.SALIM_CODIGO,
              'SALIM_NOMBRE': alim.SALIM_NOMBRE,
              'SALIM_REFERENCIA': alim.SALIM_REFERENCIA,
              'SALIM_PROVINCIA': alim.SALIM_PROVINCIA,
              'SALIM_CANTON': alim.SALIM_CANTON,
              'SALIM_SUBESTACION': alim.SALIM_SUBESTACION,
              'SALIM_SUBADMS': alim.SALIM_SUBADMS,
              'SALIM_KVA': hist['POTENCIA'],
              'SALIM_LINEA': alim.SALIM_LINEA,
              'SALIM_TIPO': alim.SALIM_TIPO,
              'SALIM_OBSERVACION': alim.SALIM_OBSERVACION,
              'SALIM_FECHA': fec_ali,
              'SALIM_ESTADO': alim.SALIM_ESTADO,
              'SALIM_SUBADMS_CAMBIO': alim.SALIM_SUBADMS_CAMBIO,
              'SALIM_NOMBREADMS_CAMBIO': alim.SALIM_NOMBREADMS_CAMBIO,
              'SALIM_ALIMENTADORID_SIGELEC':alim.SALIM_ALIMENTADORID_SIGELEC,
              'SALIM_SUBESTACIONID_SIGELEC':alim.SALIM_SUBESTACIONID_SIGELEC,
              'SALIM_SUBANTERIOR_CAMBIO':alim.SALIM_SUBANTERIOR_CAMBIO
            }
            this.historialPotencia.push(ali);
            encontro = true;
          }
        });
        // if (!encontro && alim.SALIM_ESTADO == 'ACTIVO') {
        //   let ali = {
        //     'SALIM_CODIGO': alim.SALIM_CODIGO,
        //     'SALIM_NOMBRE': alim.SALIM_NOMBRE,
        //     'SALIM_REFERENCIA': alim.SALIM_REFERENCIA,
        //     'SALIM_PROVINCIA': alim.SALIM_PROVINCIA,
        //     'SALIM_CANTON': alim.SALIM_CANTON,
        //     'SALIM_SUBESTACION': alim.SALIM_SUBESTACION,
        //     'SALIM_SUBADMS': alim.SALIM_SUBADMS,
        //     'SALIM_KVA': alim.SALIM_KVA,
        //     'SALIM_LINEA': alim.SALIM_LINEA,
        //     'SALIM_TIPO': alim.SALIM_TIPO,
        //     'SALIM_OBSERVACION': alim.SALIM_OBSERVACION,
        //     'SALIM_FECHA': alim.SALIM_FECHA,
        //     'SALIM_ESTADO': alim.SALIM_ESTADO,
        //     'SALIM_SUBADMS_CAMBIO': alim.SALIM_SUBADMS_CAMBIO,
        //     'SALIM_NOMBREADMS_CAMBIO': alim.SALIM_NOMBREADMS_CAMBIO
        //   }
        //   this.historialPotencia.push(ali);
        // }
      });
    });
  }

  actualizarCarga() {
    this.historialPotencia.forEach(element => {
      this.guardar(element);
    });
  }
  async guardar(alim: Alimentador) {
    let alimentador: any = [alim];
    const resp = await this.iService.updateAlimentador(alimentador);
    resp.subscribe((res) => {
    })
  }
}
