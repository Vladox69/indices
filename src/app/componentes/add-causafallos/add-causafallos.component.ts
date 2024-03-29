import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IndicesService } from 'src/app/servicios/indices.service';

@Component({
  selector: 'app-add-causafallos',
  templateUrl: './add-causafallos.component.html',
  styleUrls: ['./add-causafallos.component.css']
})
export class AddCausafallosComponent implements OnInit {

  @Input() causaFallo:any=null;

  constructor(private modalService:NgbModal,public ngbActiveModal:NgbActiveModal,private indicesServices:IndicesService) { }

  formCausas:FormGroup=new FormGroup({
    SCAU_NOMBRE: new FormControl('', [Validators.required]),
    SCAU_REFERENCIA: new FormControl('', [Validators.required]),
    SCAU_OBSERVACION: new FormControl('', []),
    SCAU_FECHA: new FormControl('', [Validators.required]),
    SCAU_ESTADO: new FormControl(''),
    SCAU_CODIGO:new FormControl(null)
  })
  
  ngOnInit(): void {
    if(this.causaFallo!=null){
      this.setFormCausaFallo();
    }
  }
  datePipe = new DatePipe('es');

  onClose(){
    this.modalService.dismissAll(AddCausafallosComponent);
  }

  async addCausaFallo(){
    this.formCausas.get("SCAU_ESTADO")?.setValue("ACTIVO");
    let causaFallo:any=[this.formCausas.value];
    
    causaFallo[0]["SCAU_FECHA"]=this.datePipe.transform(causaFallo[0]["SCAU_FECHA"],"dd/MM/yyyy");
    const resp= await this.indicesServices.addCausaFallo(causaFallo);    
    resp.subscribe((res)=>{
      console.log(res);
    })
    this.modalService.dismissAll(AddCausafallosComponent);
  }

  async editarCausaFallo(){
    let causaFallo:any=[this.formCausas.value];
    causaFallo[0]["SCAU_FECHA"]=this.datePipe.transform(causaFallo[0]["SCAU_FECHA"],"dd/MM/yyyy");
    const resp= await this.indicesServices.updateCausaFallo(causaFallo);    
    resp.subscribe((res)=>{
      console.log(res);
    })
    this.modalService.dismissAll(AddCausafallosComponent);
  }

  setFormCausaFallo(){
    this.formCausas.get("SCAU_NOMBRE")?.setValue(this.causaFallo["SCAU_NOMBRE"]);
    this.formCausas.get("SCAU_REFERENCIA")?.setValue(this.causaFallo["SCAU_REFERENCIA"]);
    this.formCausas.get("SCAU_OBSERVACION")?.setValue(this.causaFallo["SCAU_OBSERVACION"]);
    this.formCausas.get("SCAU_ESTADO")?.setValue(this.causaFallo["SCAU_ESTADO"]);
    this.formCausas.get("SCAU_FECHA")?.setValue(this.causaFallo["SCAU_FECHA"]);
    this.formCausas.get("SCAU_CODIGO")?.setValue(this.causaFallo["SCAU_CODIGO"]);
  }

  onGuardarCausaFallo(){
    if(this.causaFallo==null){
      this.addCausaFallo();
    }else{
      this.editarCausaFallo();
    }
  }

  changeEstado(event:any){
    console.log(event);
  }

}
