import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TissueShowComponent} from './components/tissue-show/tissue-show.component';
import {SpeciesShowComponent} from './components/species-show/species-show.component';
import {SpeciesEditComponent} from './components/species-edit/species-edit.component';
import {TissueEditComponent} from "./components/tissue-edit/tissue-edit.component";
import {ContainersShowComponent} from "./components/containers-show/containers-show.component";
import {ContainersEditComponent} from "./components/containers-edit/containers-edit.component";

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
  },
  {
    path: 'containers',
    component: ContainersShowComponent
  },
  {
    path: 'containers/add',
    component: ContainersEditComponent
  },
  {
    path: 'containers/edit',
    component: ContainersEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
