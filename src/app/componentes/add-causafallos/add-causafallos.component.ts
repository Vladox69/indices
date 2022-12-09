import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IndicesService } from 'src/app/servicios/indices.service';

@Component({
  selector: 'app-add-causafallos',
  templateUrl: './add-causafallos.component.html',
  styleUrls: ['./add-causafallos.component.css']
})
export class AddCausafallosComponent implements OnInit {

  constructor(private modalService:NgbModal,public ngbActiveModal:NgbActiveModal,private indicesServices:IndicesService) { }

  formCausas:FormGroup=new FormGroup({
    SCAU_NOMBRE: new FormControl('', [Validators.required]),
    SCAU_REFERENCIA: new FormControl('', [Validators.required]),
    SCAU_OBSERVACION: new FormControl('', [Validators.required]),
    SCAU_FECHA: new FormControl('', [Validators.required]),
    SCAU_CODIGO:new FormControl(null)
  })
  
  ngOnInit(): void {
  }

  // getErrorMessage() {
  //   if (this.nombre.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.nombre.hasError('nombre') ? 'Not a valid nombre' : '';
  // }

  onClose(){
    this.modalService.dismissAll(AddCausafallosComponent);
  }

  async onAddCausaFallo(){
    let causaFallo:any=[this.formCausas.value];
    let fecha=causaFallo[0]["SCAU_FECHA"]
    fecha=fecha.replace(/-/g,"/")
    causaFallo[0]["SCAU_FECHA"]=fecha
    const resp= await this.indicesServices.addCausaFallo(causaFallo);    
    resp.subscribe((res)=>{
      console.log(res);
    })
    this.modalService.dismissAll(AddCausafallosComponent);
  }

}
