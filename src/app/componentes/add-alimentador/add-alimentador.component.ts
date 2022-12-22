import { Component, Input, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Canton } from 'src/app/modelos/canton.interface';
import { Provincia } from 'src/app/modelos/provincia.interface';
import { IndicesService } from 'src/app/servicios/indices.service';

@Component({
  selector: 'app-add-alimentador',
  templateUrl: './add-alimentador.component.html',
  styleUrls: ['./add-alimentador.component.css']
})
export class AddAlimentadorComponent implements OnInit {
  constructor(private modalService:NgbModal,public ngbActiveModal:NgbActiveModal,private indicesServices:IndicesService) { }
  
  @Input() alimentador:any=null;

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
  //Variables
  listaProvincias:Provincia[]=[];
  listaCantones:Canton[]=[];
  listaCantonesFiltro:any;
  provincia:any;

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

    if(this.alimentador!=null){
      this.setFormAlimentador();
    }
    this.indicesServices.listarProvincias().subscribe(res=>{
      this.listaProvincias = res;
      console.log(res);
    });
    this.indicesServices.listarCantones().subscribe(res=>{
      this.listaCantones = res;
    });
  }

  async addAlimentador(){
    
    let alimentador:any=[this.formAlimentador.value];
    console.log(alimentador);
    
    // const resp= await this.indicesServices.addAlimentador(alimentador);    
    // resp.subscribe((res)=>{
    //   console.log(res);
    // })
    // this.modalService.dismissAll(AddAlimentadorComponent);
  }

  editarAlimentador(){

  }

  setFormAlimentador(){
    this.formAlimentador.get("SALIM_CODIGO")?.setValue(this.alimentador["SALIM_CODIGO"]);
    this.formAlimentador.get("SALIM_PROVINCIA")?.setValue(this.alimentador["SALIM_PROVINCIA"]);
    this.formAlimentador.get("SALIM_CANTON")?.setValue(this.alimentador["SALIM_CANTON"]);
    this.formAlimentador.get("SALIM_NOMBRE")?.setValue(this.alimentador["SALIM_NOMBRE"]);
    this.formAlimentador.get("SALIM_LINEA")?.setValue(this.alimentador["SALIM_LINEA"]);
    this.formAlimentador.get("SALIM_OBSERVACION")?.setValue(this.alimentador["SALIM_OBSERVACION"]);
    this.formAlimentador.get("SALIM_REFERENCIA")?.setValue(this.alimentador["SALIM_REFERENCIA"]);
    this.formAlimentador.get("SALIM_SUBADMS")?.setValue(this.alimentador["SALIM_SUBADMS"]);
    this.formAlimentador.get("SALIM_SUBESTACION")?.setValue(this.alimentador["SALIM_SUBESTACION"]);
    this.formAlimentador.get("SALIM_KVA")?.setValue(this.alimentador["SALIM_KVA"]);
    this.formAlimentador.get("SALIM_TIPO")?.setValue(this.alimentador["SALIM_TIPO"]);
    this.formAlimentador.get("SALIM_FECHA")?.setValue(this.alimentador["SALIM_FECHA"]);
  } 

  onGuardarAlimentador(){
    if(this.alimentador==null){
      this.addAlimentador();
    }else{
      this.editarAlimentador();
    }
  }

  changeProvincia(event:any){
    console.log(event);
    this.listaCantonesFiltro=[];
    //busco la provincia con ese nombre para ver el codigo
    let codigoProv='';
    this.listaProvincias.forEach(element => {
      if(element.VALUE==event){
        codigoProv=element.CODE;
        console.log(codigoProv);
      }
    });

    this.listaCantones.forEach(element => {
      let codigo = element.CODE.substring(0,2);
      if(codigo==codigoProv){
        this.listaCantonesFiltro.push(element);
      }
    });
  }
}
