import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IndicesService } from 'src/app/servicios/indices.service';

@Component({
  selector: 'app-add-alimentador',
  templateUrl: './add-alimentador.component.html',
  styleUrls: ['./add-alimentador.component.css']
})
export class AddAlimentadorComponent implements OnInit {
  constructor(private modalService:NgbModal,public ngbActiveModal:NgbActiveModal,private indicesServices:IndicesService) { }
  

  formAlimentador:FormGroup=new FormGroup({
    codigo:new FormControl(null),
  provincia: new FormControl('', [Validators.required]),
  canton: new FormControl('', [Validators.required]),
  nombre: new FormControl('', [Validators.required]),
  linea: new FormControl('', [Validators.required]),
  observacion: new FormControl('', [Validators.required]),
  referencia: new FormControl('', [Validators.required]),
  subadms: new FormControl('', [Validators.required]),
  subestacion: new FormControl('', [Validators.required]),
  kva: new FormControl('', [Validators.required]),
  tipo: new FormControl('', [Validators.required]),
  opcion: new FormControl('', [Validators.required]),
  fecha:new FormControl('',[Validators.required])
  }) 

  // getErrorMessage() {
  //   if (this.provincia.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.provincia.hasError('provincia') ? 'Not a valid provincia' : '';
  // }

  onClose(){
    this.modalService.dismissAll(AddAlimentadorComponent);
  }

  ngOnInit(): void {
  }

  async onAddAlimentador(){
    let alimentador:any={
      "SALIM_SUBESTACION": "",
    "SALIM_CANTON": "",
    "SALIM_CODIGO": "",
    "SALIM_PROVINCIA": "",
    "SALIM_REFERENCIA": "",
    "SALIM_TIPO": "",
    "SALIM_KVA": "",
    "SALIM_FECHA": "",
    "SALIM_NOMBRE": "",
    "SALIM_OBSERVACION": "",
    "SALIM_SUBADMS": "",
    "SALIM_LINEA": ""
    }
    alimentador
    // const resp= await this.indicesServices.addAlimentador(this.formAlimentador.value);    
    console.log(this.formAlimentador.value);
    // this.modalService.dismissAll(AddAlimentadorComponent);
  }


}
