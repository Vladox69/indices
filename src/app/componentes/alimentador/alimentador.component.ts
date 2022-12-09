import { Component, OnInit } from '@angular/core';
import { Alimentador } from 'src/app/modelos/alimentador.interface';
import { IndicesService } from 'src/app/servicios/indices.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddAlimentadorComponent } from '../add-alimentador/add-alimentador.component';
import swal from 'sweetalert2';

@Component({
  selector: 'app-alimentador',
  templateUrl: './alimentador.component.html',
  styleUrls: ['./alimentador.component.css'],
})
export class AlimentadorComponent implements OnInit {
  constructor(
    private iService: IndicesService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.obtenerAlimentadores();
  }
  //variables
  listaAlimentadores: Alimentador[] = [];
  p: any = 1;
  term: any;

  obtenerAlimentadores() {
    this.iService.listarAlimentadores().subscribe((res) => {
      this.listaAlimentadores = res;
      console.log(res);
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

  onEditAlimentador() {
    console.log('edit');
  }
}
