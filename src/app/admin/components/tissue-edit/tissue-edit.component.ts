import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {takeUntil} from "rxjs/operators";
import {TissueService} from "../../services/tissue.service";
import {GuidEmpty} from "../../constants";

@Component({
  selector: 'app-tissue-edit',
  templateUrl: './tissue-edit.component.html',
  styleUrls: ['./tissue-edit.component.css']
})
export class TissueEditComponent implements OnInit, OnDestroy {
  componentDestroyed: Subject<any>;
  form: FormGroup;
  tissueId: string;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private tissueService: TissueService) { }

  ngOnInit(): void {
    this.componentDestroyed = new Subject();

    this.tissueId = this.activatedRoute.snapshot.queryParamMap.get('tissueId');

    this.form = this.formBuilder.group({
      tissueId: [GuidEmpty],
      tissueName: ['', [Validators.required]],
      tissueDescription: ['']
    });

    if (this.tissueId != null) {
      this.tissueService.getTissue(this.tissueId).pipe(takeUntil(this.componentDestroyed)).subscribe({
        next: value => {
          this.form.setValue({
            tissueId: value.tissueId,
            tissueName: value.tissueName,
            tissueDescription: value.tissueDescription
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

    this.tissueService.addTissue(JSON.stringify(this.form.getRawValue())).pipe(takeUntil(this.componentDestroyed)).subscribe({
      next: value => {
        console.log(value.body);
      },
      error: err => console.log(err)
    });
  }
}
