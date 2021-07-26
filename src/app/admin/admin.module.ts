import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { TissueShowComponent } from './components/tissue-show/tissue-show.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import { SpeciesShowComponent } from './components/species-show/species-show.component';
import { SpeciesEditComponent } from './components/species-edit/species-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { TissueEditComponent } from './components/tissue-edit/tissue-edit.component';
import { ContainersShowComponent } from './components/containers-show/containers-show.component';
import { ContainersEditComponent } from './components/containers-edit/containers-edit.component';
import { LocationTypeShowComponent } from './components/location-type-show/location-type-show.component';
import { LocationTypeEditComponent } from './components/location-type-edit/location-type-edit.component';
import { ShelfPositionShowComponent } from './components/shelf-position-show/shelf-position-show.component';
import { ShelfPositionEditComponent } from './components/shelf-position-edit/shelf-position-edit.component';
import { AnalysisTypesEditComponent } from './components/analysis-types-edit/analysis-types-edit.component';
import { AnalysisTypesShowComponent } from './components/analysis-types-show/analysis-types-show.component';
import { LocationShowComponent } from './components/location-show/location-show.component';
import { LocationEditComponent } from './components/location-edit/location-edit.component';
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { PopulationShowComponent } from './components/population-show/population-show.component';


@NgModule({
  declarations: [
    AdminComponent,
    TissueShowComponent,
    SpeciesShowComponent,
    SpeciesEditComponent,
    TissueEditComponent,
    ContainersShowComponent,
    ContainersEditComponent,
    LocationTypeShowComponent,
    LocationTypeEditComponent,
    ShelfPositionShowComponent,
    ShelfPositionEditComponent,
    AnalysisTypesEditComponent,
    AnalysisTypesShowComponent,
    LocationShowComponent,
    LocationEditComponent,
    PopulationShowComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatTooltipModule,
    MatPaginatorModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule
  ],
  exports: [
    AdminComponent
  ]
})
export class AdminModule { }
