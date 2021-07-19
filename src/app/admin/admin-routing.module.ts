import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TissueShowComponent} from './components/tissue-show/tissue-show.component';
import {SpeciesShowComponent} from './components/species-show/species-show.component';
import {SpeciesEditComponent} from './components/species-edit/species-edit.component';
import {TissueEditComponent} from "./components/tissue-edit/tissue-edit.component";
import {ContainersShowComponent} from "./components/containers-show/containers-show.component";
import {ContainersEditComponent} from "./components/containers-edit/containers-edit.component";
import {LocationTypeShowComponent} from "./components/location-type-show/location-type-show.component";
import {LocationTypeEditComponent} from "./components/location-type-edit/location-type-edit.component";
import {ShelfPositionShowComponent} from './components/shelf-position-show/shelf-position-show.component';
import {ShelfPositionEditComponent} from './components/shelf-position-edit/shelf-position-edit.component';

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
  },
  {
    path: 'location-types',
    component: LocationTypeShowComponent
  },
  {
    path: 'location-type/edit',
    component: LocationTypeEditComponent
  },
  {
    path: 'location-type/add',
    component: LocationTypeEditComponent
  },
  {
    path: 'shelf-positions',
    component: ShelfPositionShowComponent
  },
  {
    path: 'shelf-position/edit',
    component: ShelfPositionEditComponent
  },
  {
    path: 'shelf-position/add',
    component: ShelfPositionEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
