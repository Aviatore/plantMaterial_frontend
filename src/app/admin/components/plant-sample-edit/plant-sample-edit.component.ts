import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {FormGroup} from "@angular/forms";
import {ISpecies} from "../../interfaces/ISpecies";

@Component({
  selector: 'app-plant-sample-edit',
  templateUrl: './plant-sample-edit.component.html',
  styleUrls: ['./plant-sample-edit.component.css']
})
export class PlantSampleEditComponent implements OnInit, OnDestroy {
  componentDestroyed: Subject<any>;
  form: FormGroup;
  submitted = false;
  species$: Observable<ISpecies[]>;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
