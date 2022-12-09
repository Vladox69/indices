import { Component, OnInit } from '@angular/core';
import { Alimentador } from 'src/app/modelos/alimentador.interface';
import { IndicesService } from 'src/app/servicios/indices.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CausaCambio } from 'src/app/modelos/causacambio.interface';
import { AddCausafallosComponent } from '../add-causafallos/add-causafallos.component';
import swal from 'sweetalert2';

@Component({
  selector: 'app-causasfallos',
  templateUrl: './causasfallos.component.html',
  styleUrls: ['./causasfallos.component.css'],
})
export class CausasfallosComponent implements OnInit {
  constructor(
    private iService: IndicesService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.obtenerAlimentadores();
  }
  //variables
  listaCausas: CausaCambio[] = [];
  p: any = 1;
  term: any;

  obtenerAlimentadores() {
    this.iService.listarCausasCambio().subscribe((res) => {
      this.listaCausas = res;
      console.log(res);
    });
  }

  openModal() {
    this.modalService.open(AddCausafallosComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
  }

  onDeleteCausaFallo(causaFallo: any) {
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
          const resp = this.iService.deleteCausaFallo(causaFallo['SCAU_CODIGO']);
          resp.subscribe((res) => {
           window.location.reload();
          });
        }
      });
  }

  onEditCausaFallo(causaFallo: any) {
    console.log('editar');
    console.log(causaFallo);
  }
}
