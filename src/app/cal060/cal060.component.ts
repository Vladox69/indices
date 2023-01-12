import { Component, OnInit } from '@angular/core';
import { IndicesService } from '../servicios/indices.service';

@Component({
  selector: 'app-cal060',
  templateUrl: './cal060.component.html',
  styleUrls: ['./cal060.component.css']
})
export class Cal060Component implements OnInit {

  constructor(private indicesService:IndicesService) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  //variables
  listaIncidencias:any[]=[];

  doInforme(){

  }
  cargarDatos(){
    this.indicesService.listarInformeDiario('77').subscribe(res=>{
      this.listaIncidencias = res;
      console.log(this.listaIncidencias);
    });
  }
}
