import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-causafallos',
  templateUrl: './add-causafallos.component.html',
  styleUrls: ['./add-causafallos.component.css']
})
export class AddCausafallosComponent implements OnInit {

  constructor(public ngbActiveModal:NgbActiveModal) { }
  nombre= new FormControl('', [Validators.required]);
  referencia= new FormControl('', [Validators.required]);
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
