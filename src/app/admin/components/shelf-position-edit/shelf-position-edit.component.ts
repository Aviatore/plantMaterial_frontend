import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocationService} from '../../services/location.service';
import {ActivatedRoute} from '@angular/router';
import {GuidEmpty} from '../../constants';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-shelf-position-edit',
  templateUrl: './shelf-position-edit.component.html',
  styleUrls: ['./shelf-position-edit.component.css']
})
export class ShelfPositionEditComponent implements OnInit, OnDestroy {
  componentDestroyed: Subject<any>;
  form: FormGroup;
  shelfPositionId: string;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private locationService: LocationService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.componentDestroyed = new Subject();

    this.shelfPositionId = this.activatedRoute.snapshot.queryParamMap.get('shelfPositionId');

    this.form = this.formBuilder.group({
      shelfPositionId: [GuidEmpty],
      shelfPositionName: [null, [Validators.required]]
    });

    if (this.shelfPositionId != null) {
      this.locationService.getShelfPosition(this.shelfPositionId).pipe(takeUntil(this.componentDestroyed)).subscribe({
        next: value => {
          this.form.setValue({
            shelfPositionId: value.shelfPositionId,
            shelfPositionName: value.shelfPositionName
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

    this.locationService.addShelfPosition(JSON.stringify(this.form.getRawValue())).pipe(takeUntil(this.componentDestroyed)).subscribe({
      next: value => {
        console.log(value.body);
      },
      error: err => console.log(err)
    });
  }
}
