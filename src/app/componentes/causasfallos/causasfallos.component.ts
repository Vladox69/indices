import { Component, OnInit } from '@angular/core';
import { Alimentador } from 'src/app/modelos/alimentador.interface';
import { IndicesService } from 'src/app/servicios/indices.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CausaCambio } from 'src/app/modelos/causacambio.interface';

@Component({
  selector: 'app-causasfallos',
  templateUrl: './causasfallos.component.html',
  styleUrls: ['./causasfallos.component.css']
})
export class CausasfallosComponent implements OnInit {
  constructor(private iService:IndicesService,private modalService:NgbModal) { }

  ngOnInit(): void {
    this.obtenerAlimentadores();
  }
  //variables
  listaCausas:CausaCambio[]=[];
  p:any=1;
  term:any;
  
  obtenerAlimentadores(){
    this.iService.listarCausasCambio().subscribe(res=>{
     this.listaCausas=res;
     console.log(res);
    });
  }
  
  openModal() {

  }
}