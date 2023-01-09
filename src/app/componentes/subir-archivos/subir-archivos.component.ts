import { Component, OnInit } from '@angular/core';
import { IndicesService } from 'src/app/servicios/indices.service';
import * as fs from 'file-saver';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subir-archivos',
  templateUrl: './subir-archivos.component.html',
  styleUrls: ['./subir-archivos.component.css'],
})
export class SubirArchivosComponent implements OnInit {
  titulos = ['Fecha', 'Estado', 'Nombre archivo', 'Usuario', 'Tipo', 'Opción'];
  
  registroArchivos: any;
  term: any = 'slopez';
  p: any = 1;
  dt;
  constructor(private iService: IndicesService,private router:Router) {
    this.dt = new Date();
  }

  ngOnInit(): void {
    this.obtenerRegistroArchivos();
  }

  obtenerRegistroArchivos() {
    const resp = this.iService.listarRegistroArchivos();
    resp.subscribe((data) => {
      this.registroArchivos = data;
    });
  }

  async onDownload(row: any) {
    const resp = this.iService.obtenerRegistroArchivo(row['SRAR_CODIGO']);
    resp.subscribe((data)=>{
      const arch=data[0]['SRAR_ARCHIVO'];
      const type ='data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,';
      const byteString = window.atob(arch);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: type });
      fs.saveAs(blob,row['SRAR_NOMBRE_ARCHIVO']);
    })  
    
    
  }

  onSubirArchivo(){
    this.router.navigate(['/principal']);
  }

  onFileOpen(row:any){
    this.router.navigate(['/informe-diario',row['SRAR_CODIGO']]);
  }

}
