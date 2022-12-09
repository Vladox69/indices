import { Component, OnInit } from '@angular/core';
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
  constructor(public indicesServices:IndicesService,public ngbActiveModal: NgbActiveModal,private modalService:NgbModal) {}

  formCatInterrupcion: FormGroup = new FormGroup({
    SCAT_CODIGO: new FormControl(null),
    SCAT_NOMBRE: new FormControl('', [Validators.required]),
    SCAT_ORIGEN: new FormControl('', [Validators.required]),
    SCAT_CAUSA: new FormControl('', [Validators.required]),
    SCAT_LINEA: new FormControl('', [Validators.required]),
    SCAT_OBSERVACION: new FormControl('', [Validators.required]),
    SCAT_FECHA: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {}

  // getErrorMessage() {
  //   if (this.nombre.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.nombre.hasError('nombre') ? 'Not a valid nombre' : '';
  // }
  async onAddCatInterrupcion() {
  
    let catIterrupciones:any=[this.formCatInterrupcion.value];
    let fecha=catIterrupciones[0]["SCAT_FECHA"]
    fecha=fecha.replace(/-/g,"/")
    catIterrupciones[0]["SCAT_FECHA"]=fecha
    
    const resp= await this.indicesServices.addCatInterrupcion(catIterrupciones);    
    resp.subscribe((res)=>{
      console.log(res);
    })
    this.modalService.dismissAll(AddCatinterrupcionesComponent);
  }
}
