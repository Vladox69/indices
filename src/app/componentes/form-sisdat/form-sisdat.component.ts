import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IndicesService } from 'src/app/servicios/indices.service';

@Component({
  selector: 'app-form-sisdat',
  templateUrl: './form-sisdat.component.html',
  styleUrls: ['./form-sisdat.component.css']
})
export class FormSisdatComponent implements OnInit {

  @Input() filaSisdat:any=null;
  formSisdat:FormGroup=new FormGroup({
    SRAR_CODIGO:new FormControl(null),
    SSIS_SECTOR:new FormControl('', []),
    SSIS_FAL_EXT_TRANS:new FormControl('', []),
    SSIS_FMIK_NOPROG:new FormControl('', []),
    SSIS_TAL_PROG:new FormControl('', []),
    SSIS_FAL_NOPROG:new FormControl('', []),
    SSIS_FAL:new FormControl('', []),
    SSIS_TAL_NOPROG:new FormControl('', []),
    SSIS_CODIGO:new FormControl(null),
    SSIS_FMIK_PROG:new FormControl('', []),
    SSIS_NOPROGRAMADAS:new FormControl('', []),
    SSIS_TRANSMISOR:new FormControl('', []),
    SSIS_TTIK_NOPROG:new FormControl('', []),
    SSIS_POTENCIA:new FormControl('', []),
    SSIS_OBSERVACION:new FormControl('', []),
    SSIS_TTIK_EXT_TRANS:new FormControl('', []),
    SSIS_FMIK:new FormControl('', []),
    SSIS_SUBESTACION:new FormControl('', []),
    SSIS_FAL_PROG:new FormControl('', []),
    SSIS_TTIK:new FormControl('', []),
    SSIS_PROGRAMADAS:new FormControl('', []),
    SSIS_TTIK_PROG:new FormControl('', []),
    SSIS_FMIK_EXT_TRANS:new FormControl('', []),
    SSIS_ALIMENTADOR:new FormControl('', []),
    SSIS_TAL_EXT_TRANS:new FormControl('', []),
    SSIS_TAL:new FormControl('', [])
  })

  constructor(private modalService: NgbModal, public ngbActiveModal: NgbActiveModal, private indicesServices: IndicesService) { }

  ngOnInit(): void {

    if(this.filaSisdat!=null){
      this.setFormFilaSisdat();
    }
  }

  onGuardarFilaSisdat(){

  }

  setFormFilaSisdat(){
    this.formSisdat.get("SRAR_CODIGO")?.setValue(this.filaSisdat["SRAR_CODIGO"]);
    this.formSisdat.get("SSIS_SECTOR")?.setValue(this.filaSisdat["SSIS_SECTOR"]);
    this.formSisdat.get("SSIS_FAL_EXT_TRANS")?.setValue(this.filaSisdat["SSIS_FAL_EXT_TRANS"]);
    this.formSisdat.get("SSIS_FMIK_NOPROG")?.setValue(this.filaSisdat["SSIS_FMIK_NOPROG"]);
    this.formSisdat.get("SSIS_TAL_PROG")?.setValue(this.filaSisdat["SSIS_TAL_PROG"]);
    this.formSisdat.get("SSIS_FAL_NOPROG")?.setValue(this.filaSisdat["SSIS_FAL_NOPROG"]);
    this.formSisdat.get("SSIS_FAL")?.setValue(this.filaSisdat["SSIS_FAL"]);
    this.formSisdat.get("SSIS_TAL_NOPROG")?.setValue(this.filaSisdat["SSIS_TAL_NOPROG"]);
    this.formSisdat.get("SSIS_CODIGO")?.setValue(this.filaSisdat["SSIS_CODIGO"]);
    this.formSisdat.get("SSIS_FMIK_PROG")?.setValue(this.filaSisdat["SSIS_FMIK_PROG"]);
    this.formSisdat.get("SSIS_NOPROGRAMADAS")?.setValue(this.filaSisdat["SSIS_NOPROGRAMADAS"]);
    this.formSisdat.get("SSIS_TRANSMISOR")?.setValue(this.filaSisdat["SSIS_TRANSMISOR"]);
    this.formSisdat.get("SSIS_TTIK_NOPROG")?.setValue(this.filaSisdat["SSIS_TTIK_NOPROG"]);
    this.formSisdat.get("SSIS_POTENCIA")?.setValue(this.filaSisdat["SSIS_POTENCIA"]);
    this.formSisdat.get("SSIS_OBSERVACION")?.setValue(this.filaSisdat["SSIS_OBSERVACION"]);
    this.formSisdat.get("SSIS_TTIK_EXT_TRANS")?.setValue(this.filaSisdat["SSIS_TTIK_EXT_TRANS"]);
    this.formSisdat.get("SSIS_FMIK")?.setValue(this.filaSisdat["SSIS_FMIK"]);
    this.formSisdat.get("SSIS_SUBESTACION")?.setValue(this.filaSisdat["SSIS_SUBESTACION"]);
    this.formSisdat.get("SSIS_FAL_PROG")?.setValue(this.filaSisdat["SSIS_FAL_PROG"]);
    this.formSisdat.get("SSIS_TTIK")?.setValue(this.filaSisdat["SSIS_TTIK"]);
    this.formSisdat.get("SSIS_PROGRAMADAS")?.setValue(this.filaSisdat["SSIS_PROGRAMADAS"]);
    this.formSisdat.get("SSIS_TTIK_PROG")?.setValue(this.filaSisdat["SSIS_TTIK_PROG"]);
    this.formSisdat.get("SSIS_FMIK_EXT_TRANS")?.setValue(this.filaSisdat["SSIS_FMIK_EXT_TRANS"]);
    this.formSisdat.get("SSIS_ALIMENTADOR")?.setValue(this.filaSisdat["SSIS_ALIMENTADOR"]);
    this.formSisdat.get("SSIS_TAL_EXT_TRANS")?.setValue(this.filaSisdat["SSIS_TAL_EXT_TRANS"]);
    this.formSisdat.get("SSIS_TAL")?.setValue(this.filaSisdat["SSIS_TAL"]);
  }

}
