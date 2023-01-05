import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  NgbActiveModal,
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDateStruct,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { IndicesService } from 'src/app/servicios/indices.service';

@Component({
  selector: 'app-add-catinterrupciones',
  templateUrl: './add-catinterrupciones.component.html',
  styleUrls: ['./add-catinterrupciones.component.css'],
})
export class AddCatinterrupcionesComponent implements OnInit {
  
  @Input() catInterrupcion:any=null;
  
  constructor(public indicesServices:IndicesService,public ngbActiveModal: NgbActiveModal,private modalService:NgbModal) {}

  formCatInterrupcion: FormGroup = new FormGroup({
    SCAT_CODIGO: new FormControl(null),
    SCAT_NOMBRE: new FormControl('', [Validators.required]),
    SCAT_ORIGEN: new FormControl('', [Validators.required]),
    SCAT_CAUSA: new FormControl('', [Validators.required]),
    SCAT_LINEA: new FormControl('', []),
    SCAT_OBSERVACION: new FormControl('', []),
    SCAT_ESTADO: new FormControl('', [Validators.required]),
    SCAT_FECHA: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    if(this.catInterrupcion!=null){
      this.setFormCatInterrupcion();
    }
  }

  // getErrorMessage() {
  //   if (this.nombre.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.nombre.hasError('nombre') ? 'Not a valid nombre' : '';
  // }
  async addCatInterrupcion() {
    let catIterrupciones:any=[this.formCatInterrupcion.value];
    
    const resp= await this.indicesServices.addCatInterrupcion(catIterrupciones);    
    resp.subscribe((res)=>{
      console.log(res);
    })
    this.modalService.dismissAll(AddCatinterrupcionesComponent);
  }

  async updateCatInterrupcion(){

    let catIterrupciones:any=[this.formCatInterrupcion.value];
    
    const resp= await this.indicesServices.updateCatInterrupcion(catIterrupciones);    
    resp.subscribe((res)=>{
      console.log(res);
    })
    this.modalService.dismissAll(AddCatinterrupcionesComponent);
  }

  setFormCatInterrupcion(){
    this.formCatInterrupcion.get("SCAT_CODIGO")?.setValue(this.catInterrupcion["SCAT_CODIGO"]);
    this.formCatInterrupcion.get("SCAT_NOMBRE")?.setValue(this.catInterrupcion["SCAT_NOMBRE"]);
    this.formCatInterrupcion.get("SCAT_ORIGEN")?.setValue(this.catInterrupcion["SCAT_ORIGEN"]);
    this.formCatInterrupcion.get("SCAT_CAUSA")?.setValue(this.catInterrupcion["SCAT_CAUSA"]);
    this.formCatInterrupcion.get("SCAT_LINEA")?.setValue(this.catInterrupcion["SCAT_LINEA"]);
    this.formCatInterrupcion.get("SCAT_OBSERVACION")?.setValue(this.catInterrupcion["SCAT_OBSERVACION"]);
    this.formCatInterrupcion.get("SCAT_ESTADO")?.setValue(this.catInterrupcion["SCAT_ESTADO"]);
    this.formCatInterrupcion.get("SCAT_FECHA")?.setValue(this.catInterrupcion["SCAT_FECHA"]);
  }

  onGuardarCatInterrupcion(){
    if(this.catInterrupcion==null){
      this.addCatInterrupcion();
    }else{
      this.updateCatInterrupcion();
    }
  }

  changeEstado(event:any){
    console.log(event);
  }

}
