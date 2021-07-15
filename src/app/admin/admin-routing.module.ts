import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TissueShowComponent} from './components/tissue-show/tissue-show.component';
import {SpeciesShowComponent} from './components/species-show/species-show.component';
import {SpeciesEditComponent} from './components/species-edit/species-edit.component';

const routes: Routes = [
  {
    path: 'tissues',
    component: TissueShowComponent
  },
  {
    path: 'species',
    component: SpeciesShowComponent
  },
  {
    path: 'species/edit',
    component: SpeciesEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
