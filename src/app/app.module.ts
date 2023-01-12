import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {NgxPaginationModule} from 'ngx-pagination';
import { AlimentadorComponent } from './componentes/alimentador/alimentador.component';
import { NavComponent } from './componentes/nav/nav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { AddAlimentadorComponent } from './componentes/add-alimentador/add-alimentador.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { CausasfallosComponent } from './componentes/causasfallos/causasfallos.component';
import { CatinterrupcionesComponent } from './componentes/catinterrupciones/catinterrupciones.component';
import { AddCausafallosComponent } from './componentes/add-causafallos/add-causafallos.component';
import { AddCatinterrupcionesComponent } from './componentes/add-catinterrupciones/add-catinterrupciones.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule } from '@angular/material/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import { Component, ViewEncapsulation } from '@angular/core';
import { InicioComponent } from './inicio/inicio.component';
import { SubirArchivosComponent } from './componentes/subir-archivos/subir-archivos.component';
import {MatCardModule} from '@angular/material/card';
import { InformeDiarioComponent } from './componentes/informe-diario/informe-diario.component';
import { IncidenciasDescartadasComponent } from './componentes/incidencias-descartadas/incidencias-descartadas.component';
import { AddIncidenciaComponent } from './componentes/add-incidencia/add-incidencia.component';
import { SisdatComponent } from './sisdat/sisdat.component';
import { Cal060Component } from './cal060/cal060.component';

  
@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    AlimentadorComponent,
    NavComponent,
    AddAlimentadorComponent,
    CausasfallosComponent,
    CatinterrupcionesComponent,
    AddCausafallosComponent,
    AddCatinterrupcionesComponent,
    InicioComponent,
    SubirArchivosComponent,
    InformeDiarioComponent,
    IncidenciasDescartadasComponent,
    AddIncidenciaComponent,
    SisdatComponent,
    Cal060Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    NgxPaginationModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    NgbModule,
    MatDatepickerModule,
    MatNativeDateModule,
    Ng2SearchPipeModule,
    FormsModule,
    MatSelectModule,
    MatMenuModule,
    MatCardModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
