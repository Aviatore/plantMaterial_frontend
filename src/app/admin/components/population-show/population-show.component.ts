import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IContainer} from "../../interfaces/IContainer";
import {MatTableDataSource} from "@angular/material/table";
import {Subject} from "rxjs";
import {MatSort} from "@angular/material/sort";
import {IPopulation} from "../../interfaces/IPopulation";
import {LocationService} from "../../services/location.service";
import {Router} from "@angular/router";
import {PopulationService} from "../../services/population.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-population-show',
  templateUrl: './population-show.component.html',
  styleUrls: ['./population-show.component.css']
})
export class PopulationShowComponent implements OnInit, AfterViewInit, OnDestroy {
  public populations: IPopulation[];
  public dataSource: MatTableDataSource<IPopulation>;
  columnHeaders = ['populationName', 'speciesName', 'action'];
  componentDestroyed: Subject<any>;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private populationService: PopulationService,
              private router: Router) { }

  ngOnInit(): void {
    this.componentDestroyed = new Subject();
  }

  ngAfterViewInit(): void {
    this.populationService.getAllPopulations().pipe(takeUntil(this.componentDestroyed)).subscribe({
      next: result => {
        this.populations = result;
        console.log(result);

        this.dataSource = new MatTableDataSource<IPopulation>(this.populations);
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

  removePopulation(population: IPopulation): void {
    this.populationService.removePopulation(population.populationId).pipe(takeUntil(this.componentDestroyed)).subscribe({
      next: value => {
        console.log(value)
        this.removeRow(population);
      },
      error: err => {
        console.log(err)
      }
    })
  }

  removeRow(row: IPopulation): void {
    const index = this.dataSource.data.findIndex(p => p === row);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }

  editPopulation(population: IPopulation): void {
    this.router.navigate(['population/edit'], {
      queryParams: {
        populationId: population.populationId
      }
    });
  }
}
