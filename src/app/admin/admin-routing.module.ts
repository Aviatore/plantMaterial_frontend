import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TissueShowComponent} from './components/tissue-show/tissue-show.component';
import {SpeciesShowComponent} from './components/species-show/species-show.component';
import {SpeciesEditComponent} from './components/species-edit/species-edit.component';
import {TissueEditComponent} from "./components/tissue-edit/tissue-edit.component";

const routes: Routes = [
  {
    path: 'tissues',
    component: TissueShowComponent
  },
  {
    path: 'tissues/edit',
    component: TissueEditComponent
  },
  {
    path: 'tissues/add',
    component: TissueEditComponent
  },
  {
    path: 'species',
    component: SpeciesShowComponent
  },
  {
    path: 'species/edit',
    component: SpeciesEditComponent
  },
  {
    path: 'species/add',
    component: SpeciesEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
