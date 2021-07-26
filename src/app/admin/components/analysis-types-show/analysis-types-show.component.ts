import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IContainer} from "../../interfaces/IContainer";
import {MatTableDataSource} from "@angular/material/table";
import {Subject} from "rxjs";
import {MatSort} from "@angular/material/sort";
import {IAnalysisType} from "../../interfaces/IAnalysisType";
import {LocationService} from "../../services/location.service";
import {Router} from "@angular/router";
import {AnalysisService} from "../../services/analysis.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-analysis-types-show',
  templateUrl: './analysis-types-show.component.html',
  styleUrls: ['./analysis-types-show.component.css']
})
export class AnalysisTypesShowComponent implements OnInit, AfterViewInit, OnDestroy {
  public analysisTypes: IAnalysisType[];
  public dataSource: MatTableDataSource<IAnalysisType>;
  columnHeaders = ['analysisTypeName', 'action'];
  componentDestroyed: Subject<any>;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private analysisService: AnalysisService,
              private router: Router) { }

  ngOnInit(): void {
    this.componentDestroyed = new Subject();
  }

  ngAfterViewInit(): void {
    this.analysisService.getAllAnalysisTypes().pipe(takeUntil(this.componentDestroyed)).subscribe({
      next: result => {
        this.analysisTypes = result;
        console.log(result);

        this.dataSource = new MatTableDataSource<IAnalysisType>(this.analysisTypes);
        this.dataSource.sort = this.sort;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }

  applyFilter(value: string): void {
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  removeAnalysisType(analysisType: IAnalysisType): void {
    this.analysisService.removeAnalysisType(analysisType.analysisTypeId).pipe(takeUntil(this.componentDestroyed)).subscribe({
      next: value => {
        console.log(value)
        this.removeRow(analysisType);
      },
      error: err => {
        console.log(err)
      }
    })
  }

  removeRow(row: IAnalysisType): void {
    const index = this.dataSource.data.findIndex(p => p === row);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }

  editAnalysisType(analysisType: IAnalysisType): void {
    this.router.navigate(['analysis-type/edit'], {
      queryParams: {
        analysisTypeId: analysisType.analysisTypeId
      }
    });
  }
}
