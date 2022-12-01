import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlimentadorComponent } from './componentes/alimentador/alimentador.component';
import { CatinterrupcionesComponent } from './componentes/catinterrupciones/catinterrupciones.component';
import { CausasfallosComponent } from './componentes/causasfallos/causasfallos.component';
import { PrincipalComponent } from './componentes/principal/principal.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'principal'},
  { path: 'principal', component: PrincipalComponent },
  {path: 'alimentador', component: AlimentadorComponent},
  {path: 'causas', component: CausasfallosComponent},
  {path: 'catalogo', component: CatinterrupcionesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
