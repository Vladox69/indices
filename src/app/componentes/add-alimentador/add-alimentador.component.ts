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
    SALIM_CODIGO:new FormControl(null),
    SALIM_PROVINCIA: new FormControl('', [Validators.required]),
    SALIM_CANTON: new FormControl('', [Validators.required]),
    SALIM_NOMBRE: new FormControl('', [Validators.required]),
    SALIM_LINEA: new FormControl('', [Validators.required]),
    SALIM_OBSERVACION: new FormControl('', [Validators.required]),
    SALIM_REFERENCIA: new FormControl('', [Validators.required]),
    SALIM_SUBADMS: new FormControl('', [Validators.required]),
    SALIM_SUBESTACION: new FormControl('', [Validators.required]),
    SALIM_KVA: new FormControl('', [Validators.required]),
    SALIM_TIPO: new FormControl('', [Validators.required]),
    SALIM_FECHA:new FormControl('',[Validators.required])
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
    let alimentador:any=[this.formAlimentador.value];
    let fecha=alimentador[0]["SALIM_FECHA"]
    fecha=fecha.replace(/-/g,"/")
    alimentador[0]["SALIM_FECHA"]=fecha

    const resp= await this.indicesServices.addAlimentador(alimentador);    
    resp.subscribe((res)=>{
      console.log(res);
    })
    this.modalService.dismissAll(AddAlimentadorComponent);
  }


}
