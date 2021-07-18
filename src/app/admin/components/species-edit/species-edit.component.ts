import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {SpeciesService} from '../../services/species.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-species-edit',
  templateUrl: './species-edit.component.html',
  styleUrls: ['./species-edit.component.css']
})
export class SpeciesEditComponent implements OnInit, OnDestroy {
  speciesId: string;
  form: FormGroup;
  submitted = false;
  speciesAliases: string[] = [];
  componentDestroyed: Subject<any>;
  readonly separatorKeyCodes = [ENTER] as const;

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private speciesService: SpeciesService) { }

  ngOnDestroy(): void {
        this.componentDestroyed.next();
        this.componentDestroyed.complete();
    }

  ngOnInit(): void {
    this.componentDestroyed = new Subject();
    this.speciesId = this.activatedRoute.snapshot.queryParamMap.get('speciesId');

    this.form = this.formBuilder.group({
      speciesName: ['', [Validators.required]],
      speciesDescription: [''],
      speciesAliases: [[]]
    });

    if (this.speciesId != null) {
      this.speciesService.getSpeciesAlias(this.speciesId).pipe(takeUntil(this.componentDestroyed)).subscribe({
        next: value => {
          this.speciesAliases = [...value.speciesAliases];

          this.form.setValue({
            speciesName: value.speciesName,
            speciesDescription: value.speciesDescription,
            speciesAliases: [...value.speciesAliases]
          });
        }
      });
    }
  }

  removeAlias(alias: string): void {
    const index = this.speciesAliases.indexOf(alias);

    if (index >= 0) {
      this.speciesAliases.splice(index, 1);
    }

    this.form.patchValue({
      speciesAliases: [...this.speciesAliases]
    });
  }

  addAlias(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.speciesAliases.push(value);
      this.form.patchValue({
        speciesAliases: [...this.speciesAliases]
      });
    }

    if (event.input) {
      event.input.value = '';
    }
  }

  submit(): void {
    console.log(this.form.getRawValue());

    if (this.speciesId != null) {
      this.speciesService.editSpecies(JSON.stringify(this.form.getRawValue()), this.speciesId).pipe(takeUntil(this.componentDestroyed)).subscribe({
        next: value => {
          console.log(value.body);
        }
      });
    } else {
      this.speciesService.addSpecies(JSON.stringify(this.form.getRawValue())).pipe(takeUntil(this.componentDestroyed)).subscribe({
        next: value => {
          console.log(value.body);
        }
      });
    }
  }
}
