import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-incidencia',
  templateUrl: './add-incidencia.component.html',
  styleUrls: ['./add-incidencia.component.css']
})
export class AddIncidenciaComponent implements OnInit {


  constructor(private modalService:NgbModal,public ngbActiveModal:NgbActiveModal) { }

  formCausas:FormGroup=new FormGroup({
    SCAU_NOMBRE: new FormControl('', [Validators.required]),
    SCAU_REFERENCIA: new FormControl('', [Validators.required]),
    SCAU_OBSERVACION: new FormControl('', [Validators.required]),
    SCAU_FECHA: new FormControl('', [Validators.required]),
    SCAU_CODIGO:new FormControl(null)
  })

  ngOnInit(): void {
  }

}
