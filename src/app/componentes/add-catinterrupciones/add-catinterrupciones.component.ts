import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-catinterrupciones',
  templateUrl: './add-catinterrupciones.component.html',
  styleUrls: ['./add-catinterrupciones.component.css']
})
export class AddCatinterrupcionesComponent implements OnInit {

  constructor(public ngbActiveModal:NgbActiveModal) { }

  nombre= new FormControl('', [Validators.required]);
  origen= new FormControl('', [Validators.required]);
  causa= new FormControl('', [Validators.required]);
  linea= new FormControl('', [Validators.required]);
  observacion= new FormControl('', [Validators.required]);
  fecha= new FormControl('', [Validators.required]);

  ngOnInit(): void {
  }

  getErrorMessage() {
    if (this.nombre.hasError('required')) {
      return 'You must enter a value';
    }

    return this.nombre.hasError('nombre') ? 'Not a valid nombre' : '';
  }

}
