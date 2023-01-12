import { Component, OnInit } from '@angular/core';
import { Alimentador } from '../modelos/alimentador.interface';
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
  listaAlimentadores:Alimentador[]=[];
  listaIncidencias:any[]=[];
  informeCal:any[]=[];

  doInforme(){
    this.listaIncidencias.forEach(incid => {
      this.listaAlimentadores.forEach(alim => {
        if(incid['SIND_ALIMENTADOR']==alim.SALIM_NOMBRE){
          
        }
      });
    });
  }
  cargarDatos(){
    this.indicesService.listarInformeDiario('77').subscribe(res=>{
      this.listaIncidencias = res;
      console.log(this.listaIncidencias);
    });
    this.indicesService.listarAlimentadoresActivos().subscribe(res=>{
     this.listaAlimentadores = res; 
    });
  }
}
