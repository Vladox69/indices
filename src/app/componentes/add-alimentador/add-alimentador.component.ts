import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-alimentador',
  templateUrl: './add-alimentador.component.html',
  styleUrls: ['./add-alimentador.component.css']
})
export class AddAlimentadorComponent implements OnInit {
  constructor(private modalService:NgbModal) { }
  provincia= new FormControl('', [Validators.required]);
  canton= new FormControl('', [Validators.required]);
  nombre= new FormControl('', [Validators.required]);
  linea= new FormControl('', [Validators.required]);
  observacion= new FormControl('', [Validators.required]);
  referencia= new FormControl('', [Validators.required]);
  subadms= new FormControl('', [Validators.required]);
  subestacion= new FormControl('', [Validators.required]);
  kva= new FormControl('', [Validators.required]);
  tipo= new FormControl('', [Validators.required]);
  opcion= new FormControl('', [Validators.required]);

  getErrorMessage() {
    if (this.provincia.hasError('required')) {
      return 'You must enter a value';
    }

    return this.provincia.hasError('provincia') ? 'Not a valid provincia' : '';
  }

  onClose(){
    this.modalService.dismissAll(AddAlimentadorComponent)
  }

  ngOnInit(): void {
  }


}
