import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LocationService} from "../../services/location.service";
import {ActivatedRoute} from "@angular/router";
import {AnalysisService} from "../../services/analysis.service";
import {GuidEmpty} from "../../constants";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-analysis-types',
  templateUrl: './analysis-types-edit.component.html',
  styleUrls: ['./analysis-types-edit.component.css']
})
export class AnalysisTypesEditComponent implements OnInit, OnDestroy {
  componentDestroyed: Subject<any>;
  form: FormGroup;
  analysisTypeId: string;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private analysisService: AnalysisService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.componentDestroyed = new Subject();

    this.analysisTypeId = this.activatedRoute.snapshot.queryParamMap.get('analysisTypeId');

    this.form = this.formBuilder.group({
      analysisTypeId: [GuidEmpty],
      analysisTypeName: ['', [Validators.required]],
      analysisDescription: ['']
    });

    if (this.analysisTypeId != null) {
      this.analysisService.getAnalysisType(this.analysisTypeId).pipe(takeUntil(this.componentDestroyed)).subscribe({
        next: value => {
          this.form.setValue({
            analysisTypeId: value.analysisTypeId,
            analysisTypeName: value.analysisTypeName,
            analysisDescription: value.analysisDescription
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

    this.analysisService.addAnalysisType(JSON.stringify(this.form.getRawValue())).pipe(takeUntil(this.componentDestroyed)).subscribe({
      next: value => {
        console.log(value.body);
      },
      error: err => console.log(err)
    });
  }
}
