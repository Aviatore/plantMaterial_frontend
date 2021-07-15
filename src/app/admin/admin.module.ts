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


@NgModule({
  declarations: [
    AdminComponent,
    TissueShowComponent,
    SpeciesShowComponent,
    SpeciesEditComponent
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
    MatIconModule
  ],
  exports: [
    AdminComponent
  ]
})
export class AdminModule { }
