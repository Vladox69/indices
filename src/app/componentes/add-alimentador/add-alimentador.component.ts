import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-alimentador',
  templateUrl: './add-alimentador.component.html',
  styleUrls: ['./add-alimentador.component.css']
})
export class AddAlimentadorComponent implements OnInit {
  constructor() { }
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  ngOnInit(): void {
  }


}
