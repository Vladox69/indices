import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlimentadorComponent } from './componentes/alimentador/alimentador.component';
import { CatinterrupcionesComponent } from './componentes/catinterrupciones/catinterrupciones.component';
import { CausasfallosComponent } from './componentes/causasfallos/causasfallos.component';
import { IncidenciasDescartadasComponent } from './componentes/incidencias-descartadas/incidencias-descartadas.component';
import { InformeDiarioComponent } from './componentes/informe-diario/informe-diario.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { SubirArchivosComponent } from './componentes/subir-archivos/subir-archivos.component';
import { InicioComponent } from './inicio/inicio.component';
import { SisdatComponent } from './sisdat/sisdat.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'inicio'},
  { path: 'inicio', component: InicioComponent },
  { path: 'principal', component: PrincipalComponent },
  {path: 'alimentador', component: AlimentadorComponent},
  {path: 'causas', component: CausasfallosComponent},
  {path: 'catalogo', component: CatinterrupcionesComponent},
  {path:'subir-archivos',component:SubirArchivosComponent},
  {path:'sisdat/:id',component:SisdatComponent},
  {path:'informe-diario/:id',component:InformeDiarioComponent},
  {path:'incidencias-descartadas/:id',component:IncidenciasDescartadasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
