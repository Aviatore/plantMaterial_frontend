import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {Form, FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {IFilterDialogInputData} from "../../interfaces/IFilterDialogInputData";

@Component({
  selector: 'app-plant-sample-column-checker',
  templateUrl: './plant-sample-column-checker.component.html',
  styleUrls: ['./plant-sample-column-checker.component.css']
})
export class PlantSampleColumnCheckerComponent implements OnInit {
  form: FormGroup;
  filterMap: object;
  filterKeys: string[];

  constructor(private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: IFilterDialogInputData) { }

  ngOnInit(): void {
    this.form = this.data.filters;
    this.filterMap = this.data.filterMap;
    this.filterKeys = Object.keys(this.filterMap);
  }

}
