import {Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Form, FormArray, FormBuilder, FormGroup} from "@angular/forms";
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
import {map, takeUntil} from "rxjs/operators";
import {boolEnum} from "../../enums/boolEnum";
import {GuidEmpty} from "../../constants";
import {MatDialog} from "@angular/material/dialog";
import {PlantSampleColumnCheckerComponent} from "../../modals/plant-sample-column-checker/plant-sample-column-checker.component";
import {PlantSampleAddPrepComponent} from "../../modals/plant-sample-add-prep/plant-sample-add-prep.component";
import {IPrepLocation} from "../../interfaces/IPrepLocation";

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
  columnFilterMap = {};
  filterKeys: string[];
  bool: number[];
  boolMap: object;
  columnShowFilters: FormGroup;
  editRowCounter: number;
  reSearchPlantSamples: Subject<any>;

  populations$: BehaviorSubject<IPopulation[]>;
  species$: BehaviorSubject<ISpecies[]>;
  tissues$: BehaviorSubject<ITissue[]>;
  duplications$: BehaviorSubject<IDuplication[]>;
  locations$: BehaviorSubject<ILocation[]>;
  shelfPositions$: BehaviorSubject<IShelfPosition[]>;
  containerType$: BehaviorSubject<IContainer[]>;

  @ViewChild('populationTemplate', {read: TemplateRef}) populationTemp: TemplateRef<any>;
  @ViewChild('tissueTemplate', {read: TemplateRef}) tissueTemp: TemplateRef<any>;
  @ViewChild('duplicationTemplate', {read: TemplateRef}) duplicationTemp: TemplateRef<any>;
  @ViewChild('locationTemplate', {read: TemplateRef}) locationTemp: TemplateRef<any>;
  @ViewChild('shelfPositionTemplate', {read: TemplateRef}) shelfPositionTemp: TemplateRef<any>;
  @ViewChild('containerTypeTemplate', {read: TemplateRef}) containerTypeTemp: TemplateRef<any>;

  @ViewChild('rangesToMark', {read: ElementRef}) rangesToMark: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private plantSampleService: PlantSampleService,
              private populationService: PopulationService,
              private speciesService: SpeciesService,
              private tissueService: TissueService,
              private duplicationService: DuplicationsService,
              private locationService: LocationService,
              private dialog: MatDialog) {

    this.locations$ = new BehaviorSubject<ILocation[]>([]);
    this.shelfPositions$ = new BehaviorSubject<IShelfPosition[]>([]);
    this.containerType$ = new BehaviorSubject<IContainer[]>([]);
    this.populations$ = new BehaviorSubject<IPopulation[]>([]);
    this.species$ = new BehaviorSubject<ISpecies[]>([]);
    this.tissues$ = new BehaviorSubject<ITissue[]>([]);
    this.duplications$ = new BehaviorSubject<IDuplication[]>([]);
  }

  ngOnInit(): void {
    this.reSearchPlantSamples = new Subject();
    this.reSearchPlantSamples.subscribe({
      next: value => {
        this.searchResults.clear();
        this.searchPlantSamples()
      }
    });
    this.editRowCounter = 0;
    this.columnShowFilters = this.formBuilder.group({
      showSampleName: [true],
      showCollectionDate: [false],
      showPopulation: [true],
      showTissue: [true],
      showDuplication: [false],
      showPhenotype: [false],
      showSampleWeight: [false],
      showLocation: [true],
      showShelfPosition: [true],
      showContainerType: [true],
      showPreps: [true],
    });
    this.columnFilterMap = {
      showSampleName: 'Sample name',
      showCollectionDate: 'Collection date',
      showPopulation: 'Population name',
      showTissue: 'Tissue',
      showDuplication: 'Duplication',
      showSampleWeight: 'Sample weight',
      showLocation: 'Location',
      showShelfPosition: 'Shelf position',
      showContainerType: 'Container type',
      showPreps: 'Preps',
    }

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

    // this.populations$ = this.populationService.getAllPopulations().pipe(map(p => p.sort()));
    // this.species$ = this.speciesService.getAllSpecies().pipe(map(p => p.sort()));
    // this.tissues$ = this.tissueService.getAllTissues().pipe(map(p => p.sort()));
    // this.duplications$ = this.duplicationService.getAllDuplications().pipe(map(p => p.sort()));
    // this.locations$ = this.locationService.getAllLocations().pipe(map(p => p.sort()));
    // this.shelfPositions$ = this.locationService.getAllShelfPositions().pipe(map(p => p.sort()));
    // this.containerType$ = this.locationService.getAllContainers().pipe(map(p => p.sort()));
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
    });

    this.locationService.getAllContainers().pipe(
      takeUntil(this.componentDestroyed),
      map(p => p.sort())
    ).subscribe({
      next: value => {
        this.containerType$.next(value);
      }
    });

    this.populationService.getAllPopulations().pipe(
      takeUntil(this.componentDestroyed),
      map(p => p.sort())
    ).subscribe({
      next: value => this.populations$.next(value)
    });

    this.speciesService.getAllSpecies().pipe(
      takeUntil(this.componentDestroyed),
      map(p => p.sort())
    ).subscribe({
      next: value => this.species$.next(value)
    });

    this.tissueService.getAllTissues().pipe(
      takeUntil(this.componentDestroyed),
      map(p => p.sort())
    ).subscribe({
      next: value => this.tissues$.next(value)
    });

    this.duplicationService.getAllDuplications().pipe(
      takeUntil(this.componentDestroyed),
      map(p => p.sort())
    ).subscribe({
      next: value => this.duplications$.next(value)
    });

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
    this.clearSearchResults();
    let emptyFilters = [];
    Object.keys(this.searchFilters.controls).forEach(key => {
      const row = this.searchFilters.get(key) as FormGroup;
      if (row.get('filter').value === '') {
        emptyFilters.push(key);
      }
    });
    emptyFilters.reverse();
    emptyFilters.forEach(key => {
      console.log(`Removing empty filter: ${key} ...`);
      this.searchFilters.removeAt(key);
    })

    this.plantSampleService.getPlantSamples(JSON.stringify(this.searchFilters.getRawValue())).pipe(takeUntil(this.componentDestroyed)).subscribe({
      next: value => {
        value.forEach(plantSample => {
          this.searchResults.push(this.formBuilder.group({
            edit: [false],
            plantSampleId: [plantSample.plantSampleId],
            sampleName: [{value: plantSample.sampleName, disabled: true}],
            collectionDate: [{value: this.dateFormatter(new Date(plantSample.collectionDate)), disabled: true}],
            populationId: [{value: plantSample.populationId, disabled: true}],
            plantSampleDescription: [{value: plantSample.plantSampleDescription, disabled: true}],
            tissueId: [{value: plantSample.tissueId, disabled: true}],
            duplicationId: [{value: plantSample.duplicationId, disabled: true}],
            phenotypeId: [{value: plantSample.phenotypeId, disabled: true}],
            sampleWeight: [{value: plantSample.sampleWeight, disabled: true}],
            locationId: [{value: plantSample.locationId, disabled: true}],
            shelfPositionId: [{value: plantSample.shelfPositionId, disabled: true}],
            containerTypeId: [{value: plantSample.containerTypeId, disabled: true}],
            prepsLocation: [[...plantSample.prepsLocation]]
          }));
        });
      }
    });
  }

  clearSearchResults(): void {
    this.searchResults.clear();
  }

  openFilterDialog(): void {
    // console.log(this.columnShowFilters.getRawValue());
    const dialofRef = this.dialog.open(PlantSampleColumnCheckerComponent, {
      width: '250px',
      data: {
        filters: this.columnShowFilters,
        filterMap: this.columnFilterMap
      }
    });

    dialofRef.afterClosed().subscribe(result => {
      // console.log(this.columnShowFilters.getRawValue());
      if (result instanceof FormGroup) {
        this.columnShowFilters = result;
      }
    })
  }

  openAddPrepDialog(): void {
    const dialofRef = this.dialog.open(PlantSampleAddPrepComponent, {
      data: {
        editedRows: this.getSelectedRows(),
        reSearch: this.reSearchPlantSamples
      }
    });
  }

  getSelectedRows(): FormArray {
    let plantSamples = this.formBuilder.array([]);
    Object.keys(this.searchResults.controls).forEach(key => {
      const row = this.searchResults.get(key) as FormGroup;
      if (row.get('edit').value) {
        plantSamples.push(row);
      }
    });

    return plantSamples;
  }

  onEdit(columnName: string, value: any): void {
    Object.keys(this.searchResults.controls).forEach(key => {
      const row = this.searchResults.get(key) as FormGroup;
      if (row.get('edit').value) {
        row.get(columnName).setValue(value);
      }
    });
  }

  onEditChange(index: number): void {
    const data = this.searchResults.at(index) as FormGroup;
    if (data.controls.edit.value) {
      this.editRowCounter++;
      Object.keys(data.controls).forEach(key => {
        data.get(key).enable();
      })
    } else {
      this.editRowCounter--;
      Object.keys(data.controls).forEach(key => {
        if (key !== 'edit') {
          data.get(key).disable();
        }
      })
    }
  }

  save(): void {
    let plantSamplesForUpdate = this.formBuilder.array([]);
    Object.keys(this.searchResults.controls).forEach(key => {
      const row = this.searchResults.get(key) as FormGroup;
      if (row.get('edit').value) {
        console.log(`Adding sample for update: ${row.get('plantSampleId').value} ...`);
        plantSamplesForUpdate.push(this.searchResults.get(key));
      }
    });

    this.plantSampleService.updatePlantSamples(JSON.stringify(plantSamplesForUpdate.getRawValue())).pipe(takeUntil(this.componentDestroyed)).subscribe({
      next: value => {
        console.log(value);
      }
    });
  }

  mark(ranges: string): void {
    
    const indexRanges = this.rangesToMark.nativeElement.value.split(',');
    console.log(indexRanges);
    indexRanges.forEach(value => {
      console.log(value);
      const valueSplitted = value.split('-');
      console.log(valueSplitted);
      if (valueSplitted.length > 1) {
        for (let i = valueSplitted[0]; i <= valueSplitted[1]; i++) {
          const row = this.searchResults.get(i.toString()) as FormGroup;
          row.get('edit').setValue(true);
          this.editRowCounter++;
          Object.keys(row.controls).forEach(key => {
            row.get(key).enable();
          })
        }
      } else {
        const row = this.searchResults.get(value) as FormGroup;
        row.get('edit').setValue(true);
        this.editRowCounter++;
        Object.keys(row.controls).forEach(key => {
          row.get(key).enable();
        })
      }
    });
  }

  unmark(): void {
    Object.keys(this.searchResults.controls).forEach(key => {
      const row = this.searchResults.get(key) as FormGroup;
      if (row.get('edit').value) {
        row.get('edit').setValue(false);
        this.editRowCounter--;
        Object.keys(row.controls).forEach(key => {
          if (key != 'edit') {
            row.get(key).disable();
          }
        })
      }
    });
  }

  prepTooltipMessageFactory(prep: IPrepLocation): string {
    let isolationDate: string;
    if (prep.isolationDate !== null) {
      const date = new Date(prep.isolationDate)
      isolationDate = `${date.getFullYear()}-${this.precedingZeroFormat((date.getMonth() + 1).toString())}-${this.precedingZeroFormat(date.getDate().toString())}`;
    } else {
      isolationDate = 'unknown';
    }

    return `Prep type: ${prep.prepTypeName}
    Isolation date: ${isolationDate}
    Location: ${prep.locationName}
    Location type: ${prep.locationTypeName}
    Shelf position: ${prep.shelfPositionName}
    Container type: ${prep.containerTypeName}`;
  }

  precedingZeroFormat(value: string): string {
    return value.length === 2 ? value : `0${value}`;
  }

  dateFormatter(date: Date): string {
    return `${date.getFullYear()}-${this.precedingZeroFormat((date.getMonth() + 1).toString())}-${this.precedingZeroFormat(date.getDate().toString())}`;
  }
}
