import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {LocationService} from "../../services/location.service";
import {GuidEmpty} from "../../constants";
import {takeUntil} from "rxjs/operators";
import {IShelfPosition} from "../../interfaces/IShelfPosition";
import {ILocationType} from "../../interfaces/ILocationType";
import {IContainer} from "../../interfaces/IContainer";

@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrls: ['./location-edit.component.css']
})
export class LocationEditComponent implements OnInit, OnDestroy {
  componentDestroyed: Subject<any>;
  form: FormGroup;
  locationId: string;
  submitted = false;
  shelfPositions$: Observable<IShelfPosition[]>;
  locationTypes$: Observable<ILocationType[]>;
  containers$: Observable<IContainer[]>;
  public ls: LocationService;

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private locationService: LocationService) { }

  ngOnInit(): void {

    this.shelfPositions$ = this.locationService.getAllShelfPositions();
    this.locationTypes$ = this.locationService.getAllLocationTypes();
    this.containers$ = this.locationService.getAllContainers();
    this.ls = this.locationService;
    this.componentDestroyed = new Subject();

    this.locationId = this.activatedRoute.snapshot.queryParamMap.get('locationId');

    this.form = this.formBuilder.group({
      locationId: [GuidEmpty],
      locationName: ['', [Validators.required]],
      locationTypeId: [''],
      locationDescription: ['']
    });

    if (this.locationId != null) {
      this.locationService.getLocation(this.locationId).pipe(takeUntil(this.componentDestroyed)).subscribe({
        next: value => {
          this.form.setValue({
            locationId: value.locationId,
            locationName: value.locationName,
            locationTypeId: value.locationTypeId,
            locationDescription: value.locationDescription
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

    this.locationService.addLocation(JSON.stringify(this.form.getRawValue())).pipe(takeUntil(this.componentDestroyed)).subscribe({
      next: value => {
        console.log(value.body);
      },
      error: err => console.log(err)
    });
  }
}
