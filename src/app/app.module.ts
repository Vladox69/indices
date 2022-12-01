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

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    AlimentadorComponent,
    NavComponent,
    AddAlimentadorComponent,
    CausasfallosComponent,
    CatinterrupcionesComponent
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
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
