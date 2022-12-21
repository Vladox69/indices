import { Component, OnInit } from '@angular/core';
import { Alimentador } from 'src/app/modelos/alimentador.interface';
import { IndicesService } from 'src/app/servicios/indices.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catInterrupciones } from 'src/app/modelos/catinterrupciones.interface';
import { AddCatinterrupcionesComponent } from '../add-catinterrupciones/add-catinterrupciones.component';
import swal from 'sweetalert2';

@Component({
  selector: 'app-catinterrupciones',
  templateUrl: './catinterrupciones.component.html',
  styleUrls: ['./catinterrupciones.component.css']
})
export class CatinterrupcionesComponent implements OnInit {
  constructor(private iService:IndicesService,private modalService:NgbModal) { }

  ngOnInit(): void {
    this.obtenerAlimentadores();
  }
  //variables
  listaInterrupciones:catInterrupciones[]=[];
  p:any=1;
  term:any;
  obtenerAlimentadores(){
    this.iService.listarCatInterrupciones().subscribe(res=>{
     this.listaInterrupciones=res;
     console.log(res);
     
    });
  }
  
  openModal() {
    this.modalService.open(AddCatinterrupcionesComponent,
      {
        centered: true,
        size: 'lg',
        backdrop: "static",
        keyboard: false
      }
    )
  }

  onDeleteCatInterrupcion(catInterrupcion:any){
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
          const resp = this.iService.deleteCatInterrupcion(catInterrupcion['SCAT_CODIGO']);
          resp.subscribe((res) => {
           window.location.reload();
          });
        }
      });
  }

  onEditCatInterrupcion(catInterrupcion:any){
    const activeModal =this.modalService.open(AddCatinterrupcionesComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
    activeModal.componentInstance.catInterrupcion = catInterrupcion;
    
  }

}
