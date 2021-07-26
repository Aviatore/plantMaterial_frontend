import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IShelfPosition} from "../../interfaces/IShelfPosition";
import {ILocationType} from "../../interfaces/ILocationType";
import {IContainer} from "../../interfaces/IContainer";
import {LocationService} from "../../services/location.service";
import {ActivatedRoute} from "@angular/router";
import {PopulationService} from "../../services/population.service";
import {GuidEmpty} from "../../constants";
import {takeUntil} from "rxjs/operators";
import {ISpecies} from "../../interfaces/ISpecies";
import {SpeciesService} from "../../services/species.service";

@Component({
  selector: 'app-population-edit',
  templateUrl: './population-edit.component.html',
  styleUrls: ['./population-edit.component.css']
})
export class PopulationEditComponent implements OnInit, OnDestroy {
  componentDestroyed: Subject<any>;
  form: FormGroup;
  populationId: string;
  submitted = false;
  species$: Observable<ISpecies[]>;

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private populationService: PopulationService,
              private speciesService: SpeciesService) { }

  ngOnInit(): void {
    this.species$ = this.speciesService.getAllSpecies();
    this.componentDestroyed = new Subject();

    this.populationId = this.activatedRoute.snapshot.queryParamMap.get('populationId');

    this.form = this.formBuilder.group({
      populationId: [GuidEmpty],
      populationName: ['', [Validators.required]],
      speciesId: [''],
      populationDescription: ['']
    });

    if (this.populationId != null) {
      this.populationService.getPopulation(this.populationId).pipe(takeUntil(this.componentDestroyed)).subscribe({
        next: value => {
          this.form.setValue({
            populationId: value.populationId,
            populationName: value.populationName,
            speciesId: value.speciesId,
            populationDescription: value.populationDescription
          });
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }

  submit(): void {
    this.submitted = true;
    console.log(this.form.getRawValue());

    this.populationService.addPopulation(JSON.stringify(this.form.getRawValue())).pipe(takeUntil(this.componentDestroyed)).subscribe({
      next: value => {
        console.log(value.body);
      },
      error: err => console.log(err)
    });
  }
}
