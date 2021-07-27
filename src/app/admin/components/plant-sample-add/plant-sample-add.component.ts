import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {PopulationService} from "../../services/population.service";
import {SpeciesService} from "../../services/species.service";
import {PlantSampleService} from "../../services/plant-sample.service";
import {IPlantSample} from "../../interfaces/IPlantSample";
import {GuidEmpty} from "../../constants";
import {IPopulation} from "../../interfaces/IPopulation";
import {map} from "rxjs/operators";
import {ISpecies} from "../../interfaces/ISpecies";
import {SelectionChange} from "@angular/cdk/collections";
import {ITissue} from "../../interfaces/ITissue";
import {TissueService} from "../../services/tissue.service";
import {IDuplication} from "../../interfaces/IDuplication";
import {DuplicationsService} from "../../services/duplications.service";

@Component({
  selector: 'app-plant-sample-add',
  templateUrl: './plant-sample-add.component.html',
  styleUrls: ['./plant-sample-add.component.css']
})
export class PlantSampleAddComponent implements OnInit, OnDestroy {
  componentDestroyed: Subject<any>;
  form: FormGroup;
  submitted = false;
  populations$: Observable<IPopulation[]>;
  species$: Observable<ISpecies[]>;
  tissues$: Observable<ITissue[]>;
  duplications$: Observable<IDuplication[]>;
  ppp = false;

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private plantSampleService: PlantSampleService,
              private populationService: PopulationService,
              private speciesService: SpeciesService,
              private tissueService: TissueService,
              private duplicationService: DuplicationsService) { }

  ngOnInit(): void {
    this.populations$ = new Observable<IPopulation[]>(subscriber => subscriber.next(null));
    this.species$ = this.speciesService.getAllSpecies().pipe(map(p => p.sort()));
    this.tissues$ = this.tissueService.getAllTissues().pipe(map(p => p.sort()));
    this.duplications$ = this.duplicationService.getAllDuplications().pipe(map(p => p.sort()));

    this.form = this.formBuilder.group({
      populationId: [''],
      tissueId: [''],
      duplicationId: [''],
      locationId: [''],
      shelfPositionId: [''],
      containerTypeId: [''],
      sampleNameRanges: [''],
      plantSamples: this.formBuilder.array([])
    });

    this.form.controls.populationId.disable();
  }

  get plantSamples() {
    return this.form.get('plantSamples') as FormArray;
  }

  onSpeciesSelectionChange(event): void {
    if (event.target.value != '') {
      this.populations$ = this.populationService.getPopulationsBySpecies(event.target.value).pipe(map(p => p.sort()));
      this.form.controls.populationId.enable();
    } else {
      this.populations$ = new Observable<IPopulation[]>(subscriber => subscriber.next(null));
      this.form.controls.populationId.disable();
    }
  }

  addPlantSamples(): void {
    const nameRanges = this.form.controls.sampleNameRanges.value.split(',');
    nameRanges.forEach(value => {
      const valueSplitted = value.split('-');
      if (valueSplitted.length > 1) {
        for (let i = valueSplitted[0]; i <= valueSplitted[1]; i++) {
          this.plantSamples.push(this.formBuilder.group({
            sampleName: [i]
          }));
        }
      } else {
        this.plantSamples.push(this.formBuilder.group({
          sampleName: [valueSplitted[0]]
        }));
      }
    });

    return;
    this.plantSamples.push(this.formBuilder.group({
      sampleName: []
    }));
  }

  ngOnDestroy(): void {
  }

}
