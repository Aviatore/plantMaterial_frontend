import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {TissueService} from "../../services/tissue.service";
import {LocationService} from "../../services/location.service";
import {GuidEmpty} from "../../constants";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-containers-edit',
  templateUrl: './containers-edit.component.html',
  styleUrls: ['./containers-edit.component.css']
})
export class ContainersEditComponent implements OnInit, OnDestroy {
  componentDestroyed: Subject<any>;
  form: FormGroup;
  containerId: string;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private locationService: LocationService) { }

  ngOnInit(): void {
    this.componentDestroyed = new Subject();

    this.containerId = this.activatedRoute.snapshot.queryParamMap.get('containerId');

    this.form = this.formBuilder.group({
      containerTypeId: [GuidEmpty],
      containerTypeName: ['', [Validators.required]],
      containerDescription: ['']
    });

    if (this.containerId != null) {
      this.locationService.getContainer(this.containerId).pipe(takeUntil(this.componentDestroyed)).subscribe({
        next: value => {
          this.form.setValue({
            containerTypeId: value.containerTypeId,
            containerTypeName: value.containerTypeName,
            containerDescription: value.containerDescription
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

    this.locationService.addContainer(JSON.stringify(this.form.getRawValue())).pipe(takeUntil(this.componentDestroyed)).subscribe({
      next: value => {
        console.log(value.body);
      },
      error: err => console.log(err)
    });
  }
}
