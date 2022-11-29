import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
const { read, write, utils } = XLSX;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public router:Router) { }
  title = 'indices2';
  iraPrincipal(){
    console.log('iraPrincipal');
    this.router.navigate(['principal'])
  }
}
