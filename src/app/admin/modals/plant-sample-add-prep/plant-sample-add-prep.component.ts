import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {GuidEmpty} from "../../constants";
import {Observable} from "rxjs";
import {IPrep} from "../../interfaces/IPrep";
import {IPrepType} from "../../interfaces/IPrepType";
import {ILocation} from "../../interfaces/ILocation";
import {IShelfPosition} from "../../interfaces/IShelfPosition";
import {IContainer} from "../../interfaces/IContainer";
import {map} from "rxjs/operators";
import {PrepService} from "../../services/prep.service";
import {LocationService} from "../../services/location.service";

@Component({
  selector: 'app-plant-sample-add-prep',
  templateUrl: './plant-sample-add-prep.component.html',
  styleUrls: ['./plant-sample-add-prep.component.css']
})
export class PlantSampleAddPrepComponent implements OnInit {
  form: FormGroup;
  preps: FormArray;
  prepTypes$: Observable<IPrepType[]>;
  locations$: Observable<ILocation[]>;
  shelfPositions$: Observable<IShelfPosition[]>;
  containerTypes$: Observable<IContainer[]>
  saveResultStatus: number;
  @ViewChild('resultMessage', {read: ElementRef}) resultMessage: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private prepService: PrepService,
              private locationService: LocationService,
              @Inject(MAT_DIALOG_DATA) public data: FormArray) { }

  ngOnInit(): void {
    this.saveResultStatus = 200;
    this.prepTypes$ = this.prepService.getPrepTypes().pipe(map(p => p.sort()));
    this.locations$ = this.locationService.getAllLocations().pipe(map(p => p.sort()));
    this.shelfPositions$ = this.locationService.getAllShelfPositions().pipe(map(p => p.sort()));
    this.containerTypes$ = this.locationService.getAllContainers().pipe(map(p => p.sort()));

    this.form = this.formBuilder.group({
      prepId: [GuidEmpty],
      prepName: [''],
      prepTypeId: [''],
      plantSampleId: [''],
      prepLocationId: [''],
      prepDescription: [''],
      volumeUl: [''],
      shelfPositionId: [''],
      containerTypeId: ['']
    });

    this.preps = this.formBuilder.array([]);
  }

  save(): void {
    Object.keys(this.data.controls).forEach(key => {
      const row = this.data.get(key) as FormGroup;

      this.preps.push(this.formBuilder.group({
        prepId: [GuidEmpty],
        prepName: [row.get('sampleName').value],
        prepTypeId: [this.form.get('prepTypeId').value],
        plantSampleId: [row.get('plantSampleId').value],
        prepLocationId: [this.form.get('prepLocationId').value],
        prepDescription: [''],
        volumeUl: [this.form.get('volumeUl').value],
        shelfPositionId: [this.form.get('shelfPositionId').value],
        containerTypeId: [this.form.get('containerTypeId').value]
      }));
    });

    this.prepService.addPrep(JSON.stringify(this.preps.getRawValue())).subscribe({
      next: value => {
        console.log(value);
        this.resultMessage.nativeElement.innerText = value.body.detail;
        this.saveResultStatus = value.body.status;
      }
    });
  }
}
