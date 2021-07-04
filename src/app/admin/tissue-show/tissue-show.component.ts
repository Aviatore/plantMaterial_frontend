import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TissueService} from "../services/tissue.service";
import {Observable} from "rxjs";
import {Tissue} from "../interfaces/tissue";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-tissue-show',
  templateUrl: './tissue-show.component.html',
  styleUrls: ['./tissue-show.component.css']
})
export class TissueShowComponent implements OnInit, AfterViewInit {
  public tissues: Tissue[];
  public dataSource: MatTableDataSource<Tissue>;

  constructor(private tissueService: TissueService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.tissueService.getAllTissues().subscribe({
      next: result => {
        this.tissues = result;
      },
      error: error => {
        console.log(error);
      }
    });

    this.dataSource = new MatTableDataSource<Tissue>(this.tissues);
  }

  applyFilter(value: string): void {
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }
}
