import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {SpeciesService} from '../../services/species.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-species-edit',
  templateUrl: './species-edit.component.html',
  styleUrls: ['./species-edit.component.css']
})
export class SpeciesEditComponent implements OnInit {
  speciesId: string;
  form: FormGroup;
  submitted = false;
  speciesAliases: string[] = [];
  readonly separatorKeyCodes = [ENTER] as const;

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private speciesService: SpeciesService) { }

  ngOnInit(): void {
    this.speciesId = this.activatedRoute.snapshot.queryParamMap.get('speciesId');

    this.form = this.formBuilder.group({
      speciesName: ['', [Validators.required]],
      speciesDescription: [''],
      speciesAliases: [[]]
    });

    if (this.speciesId != null) {
      this.speciesService.getSpeciesAlias(this.speciesId).subscribe({
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
      this.speciesService.editSpecies(JSON.stringify(this.form.getRawValue()), this.speciesId).subscribe({
        next: value => {
          console.log(value.body);
        }
      });
    } else {
      this.speciesService.addSpecies(JSON.stringify(this.form.getRawValue())).subscribe({
        next: value => {
          console.log(value.body);
        }
      });
    }
  }
}
