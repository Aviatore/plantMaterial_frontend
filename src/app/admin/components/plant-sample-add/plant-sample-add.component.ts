import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Form, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {PopulationService} from "../../services/population.service";
import {SpeciesService} from "../../services/species.service";
import {PlantSampleService} from "../../services/plant-sample.service";
import {IPlantSample} from "../../interfaces/IPlantSample";
import {GuidEmpty} from "../../constants";
import {IPopulation} from "../../interfaces/IPopulation";
import {map, takeUntil} from "rxjs/operators";
import {ISpecies} from "../../interfaces/ISpecies";
import {SelectionChange} from "@angular/cdk/collections";
import {ITissue} from "../../interfaces/ITissue";
import {TissueService} from "../../services/tissue.service";
import {IDuplication} from "../../interfaces/IDuplication";
import {DuplicationsService} from "../../services/duplications.service";
import {ILocation} from "../../interfaces/ILocation";
import {LocationService} from "../../services/location.service";
import {IShelfPosition} from "../../interfaces/IShelfPosition";
import {IContainer} from "../../interfaces/IContainer";
import {ILocationType} from "../../interfaces/ILocationType";

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
  locations$: BehaviorSubject<ILocation[]>;
  shelfPositions$: BehaviorSubject<IShelfPosition[]>;
  containerType$: BehaviorSubject<IContainer[]>;
  submitButtonDisable = false;

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private plantSampleService: PlantSampleService,
              private populationService: PopulationService,
              private speciesService: SpeciesService,
              private tissueService: TissueService,
              private duplicationService: DuplicationsService,
              private locationService: LocationService) {

    this.locations$ = new BehaviorSubject<ILocation[]>([]);
    this.shelfPositions$ = new BehaviorSubject<IShelfPosition[]>([]);
    this.containerType$ = new BehaviorSubject<IContainer[]>([]);
  }

  ngOnInit(): void {
    this.componentDestroyed = new Subject();
    this.populations$ = new Observable<IPopulation[]>(subscriber => subscriber.next(null));
    this.species$ = this.speciesService.getAllSpecies().pipe(map(p => p.sort()));
    this.tissues$ = this.tissueService.getAllTissues().pipe(map(p => p.sort()));
    this.duplications$ = this.duplicationService.getAllDuplications().pipe(map(p => p.sort()));
    this.locationService.getAllLocations().pipe(
      takeUntil(this.componentDestroyed),
      map(p => p.sort())
    ).subscribe({
      next: value => this.locations$.next(value)
    });

    this.locationService.getAllShelfPositions().pipe(
      takeUntil(this.componentDestroyed),
      map(p => p.sort())
    ).subscribe({
      next: value => this.shelfPositions$.next(value)
    })

    this.locationService.getAllContainers().pipe(
      takeUntil(this.componentDestroyed),
      map(p => p.sort())
    ).subscribe({
      next: value => {
        console.log(`location ${value}`);
        this.containerType$.next(value);
      }
    })

    this.form = this.formBuilder.group({
      populationId: [''],
      tissueId: [''],
      duplicationId: [''],
      locationId: [''],
      shelfPositionId: [''],
      containerTypeId: [''],
      sampleNameRanges: [''],
      collectionDate: [''],
      sampleWeight: [''],
      plantSamples: this.formBuilder.array([])
    });

    this.form.controls.populationId.disable();
  }

  submit(): void {
    this.submitButtonDisable = true;
    this.submitted = true;
    console.log(this.plantSamples.getRawValue());

    this.plantSampleService.addPlantSample(JSON.stringify(this.plantSamples.getRawValue())).pipe(takeUntil(this.componentDestroyed)).subscribe({
      next: value => {
        console.log(value.body);
        this.plantSamples.clear();
      },
      error: err => console.log(err)
    });
  }

  get plantSamples(): FormArray {
    return this.form.get('plantSamples') as FormArray;
  }

  plantSampleValid(index: number, item: string): boolean {
    return this.plantSamples.controls[index].get(item).invalid;
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
    this.plantSamples.clear();
    const nameRanges = this.form.controls.sampleNameRanges.value.split(',');
    nameRanges.forEach(value => {
      const valueSplitted = value.split('-');
      if (valueSplitted.length > 1) {
        for (let i = valueSplitted[0]; i <= valueSplitted[1]; i++) {
          this.plantSamples.push(this.formBuilder.group({
            plantSampleId: [GuidEmpty],
            sampleName: [i, Validators.required],
            collectionDate: [this.form.controls.collectionDate.value],
            populationId: [this.form.controls.populationId.value],
            plantSampleDescription: [''],
            tissueId: [this.form.controls.tissueId.value],
            duplicationId: [this.form.controls.duplicationId.value],
            sampleWeight: [this.form.controls.sampleWeight.value],
            locationId: [this.form.controls.locationId.value],
            shelfPositionId: [this.form.controls.shelfPositionId.value],
            containerTypeId: [this.form.controls.containerTypeId.value]
          }));
        }
      } else {
        this.plantSamples.push(this.formBuilder.group({
          plantSampleId: [GuidEmpty],
          sampleName: [valueSplitted[0], Validators.required],
          collectionDate: [this.form.controls.collectionDate.value],
          populationId: [this.form.controls.populationId.value],
          plantSampleDescription: [''],
          tissueId: [this.form.controls.tissueId.value],
          duplicationId: [this.form.controls.duplicationId.value],
          sampleWeight: [this.form.controls.sampleWeight.value],
          locationId: [this.form.controls.locationId.value],
          shelfPositionId: [this.form.controls.shelfPositionId.value],
          containerTypeId: [this.form.controls.containerTypeId.value]
        }));
      }
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }

}
