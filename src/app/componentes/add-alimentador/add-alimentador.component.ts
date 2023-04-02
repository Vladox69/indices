import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlimentadorSIGELEC } from 'src/app/modelos/alimentadorSIGELEC';
import { Canton } from 'src/app/modelos/canton.interface';
import { Provincia } from 'src/app/modelos/provincia.interface';
import { SubestacionSIGELEC } from 'src/app/modelos/subestacionSIGELEC';
import { IndicesService } from 'src/app/servicios/indices.service';

@Component({
  selector: 'app-add-alimentador',
  templateUrl: './add-alimentador.component.html',
  styleUrls: ['./add-alimentador.component.css']
})
export class AddAlimentadorComponent implements OnInit {
  constructor(private modalService: NgbModal, public ngbActiveModal: NgbActiveModal, private indicesServices: IndicesService) { }

  @Input() alimentador: any = null;

  formAlimentador: FormGroup = new FormGroup({
    SALIM_CODIGO: new FormControl(null),
    SALIM_PROVINCIA: new FormControl('', [Validators.required]),
    SALIM_CANTON: new FormControl('', [Validators.required]),
    SALIM_NOMBRE: new FormControl('', [Validators.required]),
    SALIM_LINEA: new FormControl('', [Validators.required]),
    SALIM_OBSERVACION: new FormControl('', []),
    SALIM_REFERENCIA: new FormControl('', [Validators.required]),
    SALIM_SUBADMS: new FormControl('', [Validators.required]),
    SALIM_SUBESTACION: new FormControl('', [Validators.required]),
    SALIM_KVA: new FormControl('', []),
    SALIM_TIPO: new FormControl('', [Validators.required]),
    SALIM_ESTADO: new FormControl(''),
    SALIM_FECHA: new FormControl('', [Validators.required]),
    SALIM_SUBADMS_CAMBIO: new FormControl('', []),
    SALIM_NOMBREADMS_CAMBIO: new FormControl('', []),
    SALIM_ALIMENTADORID_SIGELEC:new FormControl('', []),
    SALIM_SUBESTACIONID_SIGELEC:new FormControl('', [])
  })
  //Variables
  listaProvincias: Provincia[] = [];
  listaCantones: Canton[] = [];
  listaCantonesFiltro: any;
  listaAlimentadoresSIGELEC:AlimentadorSIGELEC[]=[];
  listaAlimentadoresSIGELECFiltro:AlimentadorSIGELEC[]=[];
  listaSubestacionesSIGELEC:SubestacionSIGELEC[]=[];
  provincia: any;
  datePipe = new DatePipe('es');

  onClose() {
    this.modalService.dismissAll(AddAlimentadorComponent);
  }

  ngOnInit(): void {
    this.indicesServices.listarProvincias().subscribe(res => {
      this.listaProvincias = res;
    });

    this.indicesServices.listarCantones().subscribe(res => {
      this.listaCantones = res;
    });
    
    this.indicesServices.listarSubestacionesSIGELEC().subscribe(res=>{
      this.listaSubestacionesSIGELEC=res;
    });

    this.indicesServices.listarAlimenadoresSIGELEC().subscribe(res=>{
      this.listaAlimentadoresSIGELEC=res;
      this.listaAlimentadoresSIGELECFiltro=res;
    })

    if (this.alimentador != null) {
      this.setFormAlimentador();
    }
  }

  async addAlimentador() {
    let alimentador: any = [this.formAlimentador.value];
    const resp = await this.indicesServices.addAlimentador(alimentador);
    alimentador[0]["SALIM_FECHA"]=this.datePipe.transform(alimentador[0]["SALIM_FECHA"],"dd/MM/yyyy");    
    resp.subscribe((res) => {
      console.log(res);
    })
    this.modalService.dismissAll(AddAlimentadorComponent);
  }

  async editarAlimentador() {
    let alimentador: any = [this.formAlimentador.value];
    const resp = await this.indicesServices.updateAlimentador(alimentador);
    alimentador[0]["SALIM_FECHA"]=this.datePipe.transform(alimentador[0]["SALIM_FECHA"],"dd/MM/yyyy");
    resp.subscribe((res) => {
      console.log(res);
    })
    this.modalService.dismissAll(AddAlimentadorComponent);
  }

  setFormAlimentador() {
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
    this.formAlimentador.get("SALIM_ESTADO")?.setValue(this.alimentador["SALIM_ESTADO"]);
    this.formAlimentador.get("SALIM_FECHA")?.setValue(this.alimentador["SALIM_FECHA"]);
    this.formAlimentador.get("SALIM_SUBADMS_CAMBIO")?.setValue(this.alimentador["SALIM_SUBADMS_CAMBIO"]);
    this.formAlimentador.get("SALIM_NOMBREADMS_CAMBIO")?.setValue(this.alimentador["SALIM_NOMBREADMS_CAMBIO"]);
    this.formAlimentador.get("SALIM_ALIMENTADORID_SIGELEC")?.setValue(this.alimentador["SALIM_ALIMENTADORID_SIGELEC"]);
    this.formAlimentador.get("SALIM_SUBESTACIONID_SIGELEC")?.setValue(this.alimentador["SALIM_SUBESTACIONID_SIGELEC"]);
  }

  onGuardarAlimentador() {
    if (this.alimentador == null) {
      this.addAlimentador();
    } else {
      this.editarAlimentador();
    }
  }

  changeProvincia(event: any) {
    console.log(event);
    this.listaCantonesFiltro = [];
    //busco la provincia con ese nombre para ver el codigo
    let codigoProv = '';
    this.listaProvincias.forEach(element => {
      if (element.VALUE == event) {
        codigoProv = element.CODE;
        console.log(codigoProv);
      }
    });

    this.listaCantones.forEach(element => {
      let codigo = element.CODE.substring(0, 2);
      if (codigo == codigoProv) {
        this.listaCantonesFiltro.push(element);
      }
    });
  }

  changeSubestacion(event:any){
    this.listaAlimentadoresSIGELECFiltro=[];
    this.listaAlimentadoresSIGELEC.forEach(alim=>{
      if(alim.IDSUBESTACION==event){
        this.listaAlimentadoresSIGELECFiltro.push(alim);
      }
    });
  }

  changeEstado(event: any) {
    console.log(event);
  }
}
