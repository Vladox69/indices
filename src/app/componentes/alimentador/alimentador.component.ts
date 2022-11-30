import { Component, OnInit } from '@angular/core';
import { Alimentador } from 'src/app/modelos/alimentador.interface';
import { IndicesService } from 'src/app/servicios/indices.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddAlimentadorComponent } from '../add-alimentador/add-alimentador.component';
@Component({
  selector: 'app-alimentador',
  templateUrl: './alimentador.component.html',
  styleUrls: ['./alimentador.component.css']
})
export class AlimentadorComponent implements OnInit {

  constructor(private iService:IndicesService,private modalService:NgbModal) { }

  ngOnInit(): void {
    this.obtenerAlimentadores();
  }
  //variables
  listaAlimentadores:Alimentador[]=[];
  p:any=1;
  
  obtenerAlimentadores(){
    this.iService.listarAlimentadores().subscribe(res=>{
     this.listaAlimentadores=res;
     console.log(res);
    });
  }
  
  openModalFormProceso() {
    this.modalService.open(AddAlimentadorComponent,
      {
        centered: true,
        size: 'lg',
        backdrop: "static",
        keyboard: false
      }
    )
  }


}
