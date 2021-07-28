import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {ISpecies} from "../../interfaces/ISpecies";
import {IPopulation} from "../../interfaces/IPopulation";
import {ITissue} from "../../interfaces/ITissue";
import {IDuplication} from "../../interfaces/IDuplication";
import {ILocation} from "../../interfaces/ILocation";
import {IShelfPosition} from "../../interfaces/IShelfPosition";
import {IContainer} from "../../interfaces/IContainer";
import {ActivatedRoute} from "@angular/router";
import {PlantSampleService} from "../../services/plant-sample.service";
import {PopulationService} from "../../services/population.service";
import {SpeciesService} from "../../services/species.service";
import {TissueService} from "../../services/tissue.service";
import {DuplicationsService} from "../../services/duplications.service";
import {LocationService} from "../../services/location.service";
import {map} from "rxjs/operators";
import {boolEnum} from "../../enums/boolEnum";
import {GuidEmpty} from "../../constants";

@Component({
  selector: 'app-plant-sample-edit',
  templateUrl: './plant-sample-show-edit.component.html',
  styleUrls: ['./plant-sample-show-edit.component.css']
})
export class PlantSampleShowEditComponent implements OnInit, OnDestroy {
  componentDestroyed: Subject<any>;
  form: FormGroup;
  submitted = false;
  filters = {};
  filtersMap = {};
  filterKeys: string[];
  bool: number[];
  boolMap: object;

  populations$: Observable<IPopulation[]>;
  species$: Observable<ISpecies[]>;
  tissues$: Observable<ITissue[]>;
  duplications$: Observable<IDuplication[]>;
  locations$: Observable<ILocation[]>;
  shelfPositions$: Observable<IShelfPosition[]>;
  containerType$: Observable<IContainer[]>;

  @ViewChild('populationTemplate', {read: TemplateRef}) populationTemp: TemplateRef<any>;
  @ViewChild('tissueTemplate', {read: TemplateRef}) tissueTemp: TemplateRef<any>;
  @ViewChild('duplicationTemplate', {read: TemplateRef}) duplicationTemp: TemplateRef<any>;
  @ViewChild('locationTemplate', {read: TemplateRef}) locationTemp: TemplateRef<any>;
  @ViewChild('shelfPositionTemplate', {read: TemplateRef}) shelfPositionTemp: TemplateRef<any>;
  @ViewChild('containerTypeTemplate', {read: TemplateRef}) containerTypeTemp: TemplateRef<any>;

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private plantSampleService: PlantSampleService,
              private populationService: PopulationService,
              private speciesService: SpeciesService,
              private tissueService: TissueService,
              private duplicationService: DuplicationsService,
              private locationService: LocationService) { }

  ngOnInit(): void {
    this.bool = [0, 1];
    this.boolMap = {
      0: 'And',
      1: 'Not'
    }
    this.componentDestroyed = new Subject();
    this.filters = {
      population: this.populationTemp,
      tissue: this.tissueTemp,
      duplication: this.duplicationTemp,
      location: this.locationTemp,
      shelfPosition: this.shelfPositionTemp,
      containerType: this.containerTypeTemp
    }
    this.filtersMap = {
      population: 'Population',
      tissue: 'Tissue',
      duplication: 'Duplication',
      location: 'Location type',
      shelfPosition: 'Shelf position',
      containerType: 'Container type'
    }

    this.filterKeys = Object.keys(this.filters);

    this.populations$ = this.populationService.getAllPopulations().pipe(map(p => p.sort()));
    this.species$ = this.speciesService.getAllSpecies().pipe(map(p => p.sort()));
    this.tissues$ = this.tissueService.getAllTissues().pipe(map(p => p.sort()));
    this.duplications$ = this.duplicationService.getAllDuplications().pipe(map(p => p.sort()));
    this.locations$ = this.locationService.getAllLocations().pipe(map(p => p.sort()));
    this.shelfPositions$ = this.locationService.getAllShelfPositions().pipe(map(p => p.sort()));
    this.containerType$ = this.locationService.getAllContainers().pipe(map(p => p.sort()));

    this.form = this.formBuilder.group({
      searchFilters: this.formBuilder.array([
        this.formBuilder.group({
          bool: [boolEnum.and],
          filter: [''],
          populationId: [GuidEmpty],
          tissueId: [GuidEmpty],
          duplicationId: [GuidEmpty],
          locationId: [GuidEmpty],
          shelfPositionId: [GuidEmpty],
          containerTypeId: [GuidEmpty]
        })
      ]),
      searchResults: this.formBuilder.array([])
    });
  }

  get searchFilters(): FormArray {
    return this.form.get('searchFilters') as FormArray;
  }

  get searchResults(): FormArray {
    return this.form.get('searchResults') as FormArray;
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }

  onFilterSelectionChange(event): void {

  }

  addFilter(): void {
    this.searchFilters.push(this.formBuilder.group({
      bool: [boolEnum.and],
      filter: [''],
      populationId: [GuidEmpty],
      tissueId: [GuidEmpty],
      duplicationId: [GuidEmpty],
      locationId: [GuidEmpty],
      shelfPositionId: [GuidEmpty],
      containerTypeId: [GuidEmpty]
    }))
  }

  removeFilter(index: number): void {
    this.searchFilters.removeAt(index);
  }

  searchPlantSamples(): void {
    this.plantSampleService.getPlantSamples(JSON.stringify(this.searchFilters.getRawValue())).subscribe({
      next: value => {
        console.log(JSON.stringify(value));
      }
    });
  }

  clearSearchResults(): void {
    this.searchResults.clear();
  }
}
