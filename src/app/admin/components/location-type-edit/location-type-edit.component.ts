import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocationService} from "../../services/location.service";
import {ActivatedRoute} from "@angular/router";
import {Subject} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GuidEmpty} from "../../constants";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-location-type-edit',
  templateUrl: './location-type-edit.component.html',
  styleUrls: ['./location-type-edit.component.css']
})
export class LocationTypeEditComponent implements OnInit, OnDestroy {
  componentDestroyed: Subject<any>;
  form: FormGroup;
  locationTypeId: string;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private locationService: LocationService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.componentDestroyed = new Subject();

    this.locationTypeId = this.activatedRoute.snapshot.queryParamMap.get('locationTypeId');

    this.form = this.formBuilder.group({
      locationTypeId: [GuidEmpty],
      locationTypeName: ['', [Validators.required]]
    });

    if (this.locationTypeId != null) {
      this.locationService.getLocationType(this.locationTypeId).pipe(takeUntil(this.componentDestroyed)).subscribe({
        next: value => {
          this.form.setValue({
            locationTypeId: value.locationTypeId,
            locationTypeName: value.locationTypeName
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
    console.log(this.form.getRawValue());

    this.locationService.addLocationType(JSON.stringify(this.form.getRawValue())).pipe(takeUntil(this.componentDestroyed)).subscribe({
      next: value => {
        console.log(value.body);
      },
      error: err => console.log(err)
    });
  }
}
