import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {boolEnum} from "../../enums/boolEnum";
import {GuidEmpty} from "../../constants";
import {BehaviorSubject, Subject} from "rxjs";
import {IPopulation} from "../../interfaces/IPopulation";
import {ISpecies} from "../../interfaces/ISpecies";
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
import {MatDialog} from "@angular/material/dialog";
import {map, takeUntil} from "rxjs/operators";
import {PrepService} from "../../services/prep.service";
import {PlantSampleColumnCheckerComponent} from "../../modals/plant-sample-column-checker/plant-sample-column-checker.component";
import {IPrepType} from "../../interfaces/IPrepType";

@Component({
  selector: 'app-preps-show',
  templateUrl: './preps-show.component.html',
  styleUrls: ['./preps-show.component.css']
})
export class PrepsShowComponent implements OnInit, OnDestroy {
  componentDestroyed: Subject<any>;
  form: FormGroup;
  editRowCounter: number;
  columnShowFilters: FormGroup;
  bool: number[];
  boolMap: object;
  filters = [];
  filtersMap = {};

  maxPrepNameLength: number;
  prepNameWidth: string;

  maxVolumeLength: number;
  volumeWidth: string;


  populations$: BehaviorSubject<IPopulation[]>;
  species$: BehaviorSubject<ISpecies[]>;
  tissues$: BehaviorSubject<ITissue[]>;
  duplications$: BehaviorSubject<IDuplication[]>;
  locations$: BehaviorSubject<ILocation[]>;
  shelfPositions$: BehaviorSubject<IShelfPosition[]>;
  containerType$: BehaviorSubject<IContainer[]>;
  prepType$: BehaviorSubject<IPrepType[]>;

  @ViewChild('rangesToMark', {read: ElementRef}) rangesToMark: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private prepService: PrepService,
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
    this.prepType$ = new BehaviorSubject<IPrepType[]>([]);
  }

  ngOnInit(): void {
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

    this.editRowCounter = 0;
    this.columnShowFilters = this.formBuilder.group({
      showPrepName: [true],
      showIsolationDate: [false],
      showDuplication: [false],
      showLocation: [true],
      showShelfPosition: [true],
      showContainerType: [true],
      showPrepType: [true],
      showVolume: [true]
    });
    this.filtersMap = {
      showPrepName: 'Prep name',
      showPrepType: 'Prep type',
      showDuplication: 'Duplication',
      showIsolationDate: 'Isolation date',
      showVolume: 'Show volume',
      showLocation: 'Location',
      showShelfPosition: 'Shelf position',
      showContainerType: 'Container type'
    }

    this.bool = [0, 1];
    this.boolMap = {
      0: 'And',
      1: 'Not'
    }

    this.componentDestroyed = new Subject();
    this.filters = [
      'Population',
      'Tissue',
      'Duplication',
      'Location type',
      'Shelf position',
      'Container type'
    ]

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

    this.prepService.getPrepTypes().pipe(
      takeUntil(this.componentDestroyed),
      map(p => p.sort())
    ).subscribe({
      next: value => this.prepType$.next(value)
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

  inputLengthCalc(stringLength: number): string {
    return `${20 + stringLength * 8}px`;
  }

  searchPreps(): void {
    this.clearSearchResults();
    this.maxPrepNameLength = 0;
    this.maxVolumeLength = 0;
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

    this.prepService.getPrep(JSON.stringify(this.searchFilters.getRawValue())).pipe(takeUntil(this.componentDestroyed)).subscribe({
      next: value => {
        value.forEach(prep => {
          this.maxPrepNameLength = prep.prepName.length > this.maxPrepNameLength ? prep.prepName.length : this.maxPrepNameLength;
          this.prepNameWidth = this.inputLengthCalc(this.maxPrepNameLength);
          this.maxVolumeLength = prep.volumeUl.toString().length > this.maxVolumeLength ? prep.volumeUl.toString().length : this.maxVolumeLength;
          this.volumeWidth = this.inputLengthCalc(this.maxVolumeLength);

          this.searchResults.push(this.formBuilder.group({
            edit: [false],
            prepId: [prep.prepId],
            prepName: [{value: prep.prepName, disabled: true}],
            plantSampleId: [prep.plantSampleId],
            prepTypeId: [{value: prep.prepTypeId, disabled: true}],
            prepLocationId: [{value: prep.prepLocationId, disabled: true}],
            prepDescription: [{value: prep.prepDescription, disabled: true}],
            volumeUl: [{value: prep.volumeUl, disabled: true}],
            shelfPositionId: [{value: prep.shelfPositionId, disabled: true}],
            containerTypeId: [{value: prep.containerTypeId, disabled: true}],
            isolationDate: [this.dateFormatter(new Date(prep.isolationDate))],
            duplicationId: [prep.duplicationId]
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
        filterMap: this.filtersMap
      }
    });

    dialofRef.afterClosed().subscribe(result => {
      // console.log(this.columnShowFilters.getRawValue());
      if (result instanceof FormGroup) {
        this.columnShowFilters = result;
      }
    })
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
    let prepsForUpdate = this.formBuilder.array([]);
    Object.keys(this.searchResults.controls).forEach(key => {
      const row = this.searchResults.get(key) as FormGroup;
      if (row.get('edit').value) {
        prepsForUpdate.push(this.searchResults.get(key));
      }
    });

    this.prepService.updatePrep(JSON.stringify(prepsForUpdate.getRawValue())).pipe(takeUntil(this.componentDestroyed)).subscribe({
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

  precedingZeroFormat(value: string): string {
    return value.length === 2 ? value : `0${value}`;
  }

  dateFormatter(date: Date): string {
    return `${date.getFullYear()}-${this.precedingZeroFormat((date.getMonth() + 1).toString())}-${this.precedingZeroFormat(date.getDate().toString())}`;
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }
}
